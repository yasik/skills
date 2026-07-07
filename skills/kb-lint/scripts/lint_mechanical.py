#!/usr/bin/env python3
"""Deterministic KB health checks — the mechanical half of lint.

Checks:
  E broken-link       [[wikilink]] in a page body that resolves to nothing
  E invalid-page      frontmatter missing/invalid per the page schema
  E source-modified   tracked file under sources/ has uncommitted
                      modifications (append-only violation; needs git)
  W unreferenced-source  file in sources/ cited by no page — un-ingested
                      intake work
  W orphan-page       page with zero inbound wikilinks from other pages
  W unlogged-changes  pages updated on a date with no LOG.md entry that day
  W oversized-page    page body > --max-lines (default 300) — split candidate

Output: human-readable summary to stdout (or --format json), and with
--report, a markdown report skeleton written to <report-dir>/<date>-mechanical.md
(default: <kb>/.lint/, override via --report-dir or "report_dir" in .kb.json)
for the lint pass to extend with judgment findings.

Exit code: 1 if any errors, 0 otherwise (warnings never fail the run).

Typical usage example:

  python3 lint_mechanical.py --kb ~/vault --report --agent yasik
"""

import argparse
import json
import subprocess
import sys
from dataclasses import asdict, dataclass, field
from datetime import date, timedelta
from enum import StrEnum
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from kb_common import (
    DATE_RE,
    KB,
    Frontmatter,
    KBError,
    LinkIndex,
    build_link_index,
    extract_wikilinks,
    find_kb,
    iter_kb_pages,
    iter_sources,
    link_resolves,
    parse_log_dates,
    read_page,
    today_iso,
    validate_page_data,
)


class Severity(StrEnum):
    """Finding severity: errors fail the run, warnings are advisory."""

    ERROR = "error"
    WARNING = "warning"


@dataclass(frozen=True)
class Finding:
    """One lint finding, addressed to a specific file."""

    check: str
    """Check identifier (e.g. `broken-link`), stable for filtering."""

    severity: Severity

    path: str
    """Workspace-relative path of the offending file."""

    detail: str
    """Human-readable description with the fix direction."""


@dataclass
class PageMeta:
    """Per-page data collected once and shared across checks."""

    frontmatter: Frontmatter = field(default_factory=dict)
    links: list[str] = field(default_factory=list)


def check_pages(
    kb: KB, link_index: LinkIndex, max_lines: int,
) -> tuple[dict[str, PageMeta], list[Finding]]:
    """Run per-page checks: invalid-page, broken-link, oversized-page.

    Returns:
      A (meta, findings) pair; `meta` maps workspace-relative page paths to
      the parsed data the cross-page checks reuse.
    """
    meta: dict[str, PageMeta] = {}
    findings: list[Finding] = []

    for page in iter_kb_pages(kb):
        rel = kb.rel(page)

        # validate_page_data warnings are ingest-time nudges ('updated is not
        # today'), not lint findings — only its errors count here.
        errors, _warnings = validate_page_data(page, kb, link_index=link_index)
        for error in errors:
            findings.append(Finding("invalid-page", Severity.ERROR, rel, error))

        frontmatter, body = read_page(page)
        meta[rel] = PageMeta(frontmatter=frontmatter or {}, links=extract_wikilinks(body))

        for target in meta[rel].links:
            if not link_resolves(target, link_index):
                findings.append(Finding("broken-link", Severity.ERROR, rel,
                                        f"[[{target}]] resolves to nothing"))

        n_lines = body.count("\n") + 1
        if n_lines > max_lines:
            findings.append(Finding("oversized-page", Severity.WARNING, rel,
                                    f"{n_lines} lines (> {max_lines}) — consider splitting"))

    return meta, findings


def check_sources(kb: KB, meta: dict[str, PageMeta]) -> list[Finding]:
    """Run source checks: unreferenced-source and source-modified."""
    findings: list[Finding] = []

    cited: set[str] = set()
    for page_meta in meta.values():
        sources_field = page_meta.frontmatter.get("sources")
        if isinstance(sources_field, list):
            for entry in sources_field:
                cited.update(t.lower() for t in extract_wikilinks(entry))
        cited.update(t.lower() for t in page_meta.links)

    for source in iter_sources(kb):
        keys = {source.stem.lower(),
                str(source.relative_to(kb.root).with_suffix("")).replace("\\", "/").lower(),
                str(source.relative_to(kb.workspace).with_suffix("")).replace("\\", "/").lower()}
        if not (keys & cited):
            findings.append(Finding("unreferenced-source", Severity.WARNING, kb.rel(source),
                                    "cited by no page — un-ingested intake work"))

    findings.extend(_check_source_immutability(kb))
    return findings


def _check_source_immutability(kb: KB) -> list[Finding]:
    """Flag modified tracked files under sources/ via git.

    Best-effort by contract: when the KB is not under git (or git is not
    installed) the append-only invariant simply has no enforcement backend,
    so the check is skipped rather than failed.
    """
    sources_dir = kb.root / "sources"
    if not sources_dir.is_dir():
        return []

    try:
        output = subprocess.run(
            ["git", "-C", str(sources_dir), "status", "--porcelain", "--", "."],
            capture_output=True, text=True, check=True, timeout=30).stdout
    except (subprocess.CalledProcessError, subprocess.TimeoutExpired, FileNotFoundError):
        return []

    findings: list[Finding] = []
    for line in output.splitlines():
        status, path = line[:2], line[3:].strip()
        if "M" in status:
            findings.append(Finding("source-modified", Severity.ERROR, path,
                                    "sources are append-only; this file has been "
                                    "modified — restore it from git"))
    return findings


def check_orphans(meta: dict[str, PageMeta]) -> list[Finding]:
    """Flag pages with zero inbound wikilinks from other pages."""
    inbound = {rel: 0 for rel in meta}
    stems = {Path(rel).stem.lower(): rel for rel in meta}

    for rel, page_meta in meta.items():
        for target in page_meta.links:
            t = target.strip().lower()
            if t.endswith(".md"):
                t = t[:-3]
            hit = stems.get(t.split("/")[-1])
            if hit and hit != rel:
                inbound[hit] += 1

    return [Finding("orphan-page", Severity.WARNING, rel,
                    "no inbound links from other pages — link it from a "
                    "related entity/concept/project page")
            for rel, count in inbound.items() if count == 0]


def check_log_consistency(kb: KB, meta: dict[str, PageMeta], window_days: int) -> list[Finding]:
    """Flag recently-updated pages whose update date has no LOG.md entry."""
    log_dates = parse_log_dates(kb)
    cutoff = (date.today() - timedelta(days=window_days)).isoformat()

    missing: dict[str, list[str]] = {}
    for rel, page_meta in meta.items():
        updated = page_meta.frontmatter.get("updated")
        if (isinstance(updated, str) and DATE_RE.match(updated)
                and updated >= cutoff and updated not in log_dates):
            missing.setdefault(updated, []).append(rel)

    return [Finding("unlogged-changes", Severity.WARNING, "LOG.md",
                    f"pages updated {day} but no LOG entry that day: " + ", ".join(pages))
            for day, pages in sorted(missing.items())]


REPORT_TEMPLATE = """# KB Lint — {date}

run by: {agent} · mechanical: {n_err} error(s), {n_warn} warning(s)

## Mechanical findings

{mechanical}

## Judgment findings

<!-- lint pass: append findings from the LLM passes here —
     contradictions, staleness, near-duplicates, confidence downgrades -->

## Resolution

<!-- lint pass: what was fixed directly, and the open items for the KB
     owner (or, in org installations, the handoffs and their recipients) -->
"""


def render_mechanical(findings: list[Finding]) -> str:
    """Render findings grouped by check, errors first, for report/stdout."""
    if not findings:
        return "None — KB is mechanically clean."

    by_check: dict[str, list[Finding]] = {}
    for finding in findings:
        by_check.setdefault(finding.check, []).append(finding)

    sections: list[str] = []
    for check in sorted(by_check, key=lambda c: (by_check[c][0].severity != Severity.ERROR, c)):
        severity = by_check[check][0].severity.upper()
        sections.append(f"### {check} ({severity})")
        for finding in by_check[check]:
            sections.append(f"- `{finding.path}` — {finding.detail}")
        sections.append("")

    return "\n".join(sections).rstrip()


def write_report(kb: KB, findings: list[Finding], agent: str,
                 n_err: int, n_warn: int, report_dir: Path) -> Path:
    """Write the report skeleton and return its path."""
    report_dir.mkdir(parents=True, exist_ok=True)
    report_path = report_dir / f"{today_iso()}-mechanical.md"
    report_path.write_text(REPORT_TEMPLATE.format(
        date=today_iso(), agent=agent, n_err=n_err, n_warn=n_warn,
        mechanical=render_mechanical(findings)), encoding="utf-8")
    return report_path


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--kb", default=None, help="KB root or workspace path")
    parser.add_argument("--format", choices=["text", "json"], default="text")
    parser.add_argument("--report", action="store_true",
                        help="write <report-dir>/<date>-mechanical.md report skeleton")
    parser.add_argument("--report-dir", default=None,
                        help="override report directory (default: <kb>/.lint or "
                             ".kb.json report_dir)")
    parser.add_argument("--max-lines", type=int, default=300)
    parser.add_argument("--log-window-days", type=int, default=30)
    parser.add_argument("--agent", default="librarian",
                        help="author identity for the report header")
    args = parser.parse_args()

    # CLI boundary: discovery/config failures become exit messages here.
    try:
        kb = find_kb(args.kb)
    except KBError as exc:
        sys.exit(f"error: {exc}")

    link_index = build_link_index(kb)
    meta, findings = check_pages(kb, link_index, args.max_lines)
    findings += check_sources(kb, meta)
    findings += check_orphans(meta)
    findings += check_log_consistency(kb, meta, args.log_window_days)

    n_err = sum(1 for f in findings if f.severity == Severity.ERROR)
    n_warn = len(findings) - n_err

    if args.format == "json":
        print(json.dumps({"errors": n_err, "warnings": n_warn,
                          "findings": [asdict(f) for f in findings]}, indent=2))
    else:
        print(f"KB lint (mechanical): {n_err} error(s), {n_warn} warning(s) "
              f"across {len(meta)} page(s)\n")
        print(render_mechanical(findings))

    if args.report:
        report_dir = Path(args.report_dir).resolve() if args.report_dir else kb.report_dir
        report_path = write_report(kb, findings, args.agent, n_err, n_warn, report_dir)
        print(f"\nreport skeleton written: {kb.rel(report_path)}")

    sys.exit(1 if n_err else 0)


if __name__ == "__main__":
    main()

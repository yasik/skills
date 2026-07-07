#!/usr/bin/env python3
"""Shared helpers for the KB skills (kb-ingest / kb-lint).

This module owns KB discovery, frontmatter parsing, wikilink resolution, and
page validation for a markdown knowledge base (the LLM-wiki pattern). It is
dependency-free by design — the frontmatter parser covers exactly the YAML
subset the page schema uses (flat `key: value` pairs, inline `[a, b]` lists,
`- item` block lists) — so the scripts run on any Python 3.12+ install.

KB discovery is marker-based, never bound to a fixed path. A **KB root** is
any directory containing `SCHEMA.md` or `LOG.md`. The **workspace** is the
directory containing the KB (vault root, repo root, or the KB itself for a
standalone personal KB). An optional `.kb.json` at the workspace root
configures the layout:

    {
      "root": "knowledge",       // KB dir relative to this file (default "kb")
      "report_dir": ".lint",     // lint reports, relative to KB root
      "org": { ... }             // presence enables the org extension
    }

Resolution order: explicit `--kb` path > `$KB_ROOT` > walking up from cwd
looking for a `.kb.json`, a KB root, or a `kb/` child (the default layout).

Helpers raise typed `KBError` subclasses; CLI scripts and hooks translate
them at their own boundaries.

Typical usage example:

  kb = find_kb(args.kb)
  errors, warnings = validate_page_data(page_path, kb)
"""

import json
import os
import re
from datetime import date
from pathlib import Path
from typing import cast

type Frontmatter = dict[str, str | list[str]]
"""Parsed page frontmatter — a genuinely dynamic map, read at trust boundaries."""

type LinkIndex = set[str]
"""Normalized link keys ([[target]] forms) that resolve to existing files."""

PAGE_TYPES: frozenset[str] = frozenset(
    {"entity", "concept", "project", "decision", "report"}
)
CONFIDENCE_LEVELS: frozenset[str] = frozenset({"high", "medium", "low"})
REQUIRED_FIELDS: tuple[str, ...] = (
    "type",
    "created",
    "updated",
    "author",
    "confidence",
    "sources",
    "tags",
)
NON_PAGE_KB_FILES: frozenset[str] = frozenset({"INDEX.md", "LOG.md", "SCHEMA.md"})
"""KB files that are not pages and are never validated as pages."""

CONFIG_FILENAME = ".kb.json"
DEFAULT_KB_DIRNAME = "kb"
KB_ROOT_ENV_VAR = "KB_ROOT"

WIKILINK_RE = re.compile(r"\[\[([^\]\|#]+)(?:#[^\]\|]*)?(?:\|[^\]]*)?\]\]")
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")


class KBError(Exception):
    """Base error for KB discovery and configuration failures."""


class KBNotFoundError(KBError):
    """No KB could be located from the given path, environment, or cwd."""


class KBConfigError(KBError):
    """A `.kb.json` exists but is malformed or points at a missing directory."""


class KB:
    """A resolved knowledge base.

    Encapsulates the KB root (where SCHEMA.md/LOG.md/sources/ live), the
    workspace that contains it (link resolution scope), and the parsed
    `.kb.json` config. Instances are cheap value objects; nothing is cached
    from disk beyond the config dict.
    """

    def __init__(self, root: Path, workspace: Path, config: dict[str, object]) -> None:
        self.root = Path(root).resolve()
        self.workspace = Path(workspace).resolve()
        self.config = config

    @property
    def report_dir(self) -> Path:
        """Directory for lint reports (default `<root>/.lint`)."""
        configured = self.config.get("report_dir", ".lint")
        return self.root / str(configured)

    @property
    def org(self) -> dict[str, object] | None:
        """Org-extension config dict, or None when not an org installation."""
        org = self.config.get("org")
        if not isinstance(org, dict):
            return None
        return cast(dict[str, object], org)

    def rel(self, path: Path | str) -> str:
        """Render `path` relative to the workspace for stable display."""
        p = Path(path).resolve()
        try:
            return str(p.relative_to(self.workspace))
        except ValueError:
            return str(p)


def _load_config(directory: Path) -> dict[str, object]:
    """Parse `<directory>/.kb.json`.

    Raises:
      KBConfigError: If the file exists but is not valid JSON. A malformed
        config must surface loudly — silently ignoring it would make every
        script fall back to the wrong KB.
    """
    config_path = directory / CONFIG_FILENAME
    try:
        raw = config_path.read_text(encoding="utf-8")
    except FileNotFoundError:
        return {}

    try:
        parsed = json.loads(raw)
    except json.JSONDecodeError as exc:
        raise KBConfigError(f"{config_path} is not valid JSON: {exc}") from exc
    if not isinstance(parsed, dict):
        raise KBConfigError(f"{config_path} must contain a JSON object")
    # Trust boundary: raw JSON is parsed exactly once, here.
    return cast(dict[str, object], parsed)


def _is_kb_root(directory: Path) -> bool:
    return (directory / "SCHEMA.md").is_file() or (directory / "LOG.md").is_file()


def resolve_kb(directory: Path | str) -> KB | None:
    """Interpret `directory` as a workspace or KB root.

    Args:
      directory: Candidate path — a workspace with a `.kb.json` or a `kb/`
        child, or a KB root itself (contains SCHEMA.md/LOG.md).

    Returns:
      The resolved KB, or None when the directory is neither.

    Raises:
      KBConfigError: If a `.kb.json` is present but malformed or points at a
        missing directory.
    """
    p = Path(directory).expanduser().resolve()
    if not p.is_dir():
        return None

    if (p / CONFIG_FILENAME).is_file():
        config = _load_config(p)
        root = (p / str(config.get("root", DEFAULT_KB_DIRNAME))).resolve()
        if not root.is_dir():
            raise KBConfigError(
                f"{p / CONFIG_FILENAME} points at '{config.get('root', DEFAULT_KB_DIRNAME)}' "
                "but that directory does not exist"
            )
        return KB(root, p, config)

    if _is_kb_root(p):
        parent = p.parent
        if (parent / CONFIG_FILENAME).is_file():
            return KB(p, parent, _load_config(parent))
        workspace = parent if p.name == DEFAULT_KB_DIRNAME else p
        return KB(p, workspace, {})

    default_child = p / DEFAULT_KB_DIRNAME
    if default_child.is_dir():
        return KB(default_child, p, {})

    return None


def find_kb(explicit: str | None = None) -> KB:
    """Locate the KB: explicit path > $KB_ROOT > walking up from cwd.

    Args:
      explicit: Path from a `--kb` flag, or None to fall through to the
        environment and cwd search.

    Returns:
      The resolved KB.

    Raises:
      KBNotFoundError: If no KB can be located.
      KBConfigError: If a `.kb.json` on the search path is malformed.
    """
    if explicit:
        kb = resolve_kb(explicit)
        if kb is None:
            raise KBNotFoundError(
                f"{explicit} is not a KB root (no SCHEMA.md/LOG.md), has no "
                f"{CONFIG_FILENAME}, and contains no {DEFAULT_KB_DIRNAME}/ directory"
            )
        return kb

    env_value = os.environ.get(KB_ROOT_ENV_VAR)
    if env_value:
        return find_kb(env_value)

    cwd = Path.cwd().resolve()
    for candidate in (cwd, *cwd.parents):
        kb = resolve_kb(candidate)
        if kb is not None:
            return kb

    raise KBNotFoundError(
        f"could not locate a KB — pass --kb <path>, set {KB_ROOT_ENV_VAR}, or run inside "
        f"a workspace with a {CONFIG_FILENAME}, a SCHEMA.md/LOG.md, or a kb/ directory"
    )


def kb_for_file(file_path: Path | str) -> KB | None:
    """Find the KB containing `file_path`, or None. Used by hooks.

    Walks the file's ancestors; the nearest resolvable KB whose root contains
    the file wins. A KB found on the path whose root does NOT contain the
    file (e.g. the file lives elsewhere in the workspace) is skipped.
    """
    try:
        p = Path(file_path).resolve()
    except OSError:
        return None

    for parent in p.parents:
        kb = resolve_kb(parent)
        if kb is None:
            continue
        try:
            p.relative_to(kb.root)
        except ValueError:
            continue
        return kb

    return None


def split_frontmatter(text: str) -> tuple[str | None, str]:
    """Split a page into (frontmatter_raw or None, body)."""
    if not text.startswith("---"):
        return None, text

    lines = text.split("\n")
    for i, line in enumerate(lines[1:], start=1):
        if line.strip() == "---":
            return "\n".join(lines[1:i]), "\n".join(lines[i + 1 :])

    return None, text


def _unquote(value: str) -> str:
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
        return value[1:-1]
    return value


def _split_inline_list(inner: str) -> list[str]:
    """Split `a, "b, c", [[d]]` on top-level commas (quotes respected)."""
    items: list[str] = []
    buf = ""
    quote: str | None = None

    for ch in inner:
        if quote:
            buf += ch
            if ch == quote:
                quote = None
        elif ch in "\"'":
            quote = ch
            buf += ch
        elif ch == ",":
            items.append(buf)
            buf = ""
        else:
            buf += ch

    if buf.strip():
        items.append(buf)
    return [_unquote(item) for item in items if item.strip()]


def parse_frontmatter(raw: str) -> Frontmatter:
    """Parse the minimal YAML subset into a frontmatter map.

    Supports flat `key: value` pairs, inline `[a, b]` lists, and `- item`
    block lists — the full page schema, nothing more.
    """
    data: Frontmatter = {}
    current_key: str | None = None

    for line in raw.split("\n"):
        if not line.strip():
            continue

        key_match = re.match(r"^([A-Za-z_][\w-]*):\s*(.*)$", line)
        if key_match:
            current_key, value = (
                str(key_match.group(1)),
                str(key_match.group(2)).strip(),
            )
            value = re.sub(r"\s+#\s.*$", "", value)  # trailing ' # comment'
            if value == "":
                data[current_key] = []  # block list may follow
            elif value.startswith("[") and value.endswith("]"):
                inner = value[1:-1].strip()
                data[current_key] = _split_inline_list(inner) if inner else []
            else:
                data[current_key] = _unquote(value)
            continue

        current_value = data.get(current_key) if current_key else None
        if re.match(r"^\s*-\s+", line) and isinstance(current_value, list):
            current_value.append(_unquote(re.sub(r"^\s*-\s+", "", line)))

    return data


def read_page(path: Path | str) -> tuple[Frontmatter | None, str]:
    """Read a markdown file into (frontmatter or None, body)."""
    text = Path(path).read_text(encoding="utf-8")
    raw, body = split_frontmatter(text)
    return (parse_frontmatter(raw) if raw is not None else None), body


def _has_hidden_part(rel: Path) -> bool:
    return any(part.startswith(".") for part in rel.parts)


def iter_kb_pages(kb: KB) -> list[Path]:
    """All wiki pages in the KB — excludes sources/, dot-dirs, INDEX/LOG/SCHEMA."""
    pages: list[Path] = []

    for p in sorted(kb.root.rglob("*.md")):
        rel = p.relative_to(kb.root)
        if _has_hidden_part(rel):
            continue
        if rel.parts and rel.parts[0] == "sources":
            continue
        if p.name in NON_PAGE_KB_FILES:
            continue
        pages.append(p)

    return pages


def iter_sources(kb: KB) -> list[Path]:
    """All raw-material files under the KB's sources/ directory."""
    sources_dir = kb.root / "sources"
    if not sources_dir.is_dir():
        return []
    return [
        p
        for p in sorted(sources_dir.rglob("*.md"))
        if not _has_hidden_part(p.relative_to(sources_dir))
    ]


def extract_wikilinks(text: str) -> list[str]:
    """Extract [[wikilink]] targets, dropping heading anchors and aliases."""
    return [m.group(1).strip() for m in WIKILINK_RE.finditer(text)]


def build_link_index(kb: KB) -> LinkIndex:
    """Build the set of link keys every existing .md file answers to.

    Obsidian resolves [[target]] by basename or by relative path, with or
    without the .md extension. Keys are registered relative to the workspace
    AND relative to the KB root, lowercased, so both [[sources/x]] and
    workspace-scoped links resolve.
    """
    keys: LinkIndex = set()

    for p in kb.workspace.rglob("*.md"):
        rel = p.relative_to(kb.workspace)
        if _has_hidden_part(rel):
            continue
        keys.add(p.stem.lower())
        keys.add(str(rel.with_suffix("")).replace(os.sep, "/").lower())
        try:
            kb_rel = p.relative_to(kb.root)
        except ValueError:
            continue
        keys.add(str(kb_rel.with_suffix("")).replace(os.sep, "/").lower())

    return keys


def link_resolves(target: str, link_index: LinkIndex) -> bool:
    """Check whether a [[target]] resolves against a prebuilt link index."""
    t = target.strip().lower()
    if t.endswith(".md"):
        t = t[:-3]
    return t in link_index


def _validate_sources_field(
    sources: str | list[str] | None,
    kb: KB,
    link_index: LinkIndex | None,
    errors: list[str],
    warnings: list[str],
) -> None:
    """Apply the provenance rule to the `sources:` frontmatter field."""
    if sources is None:
        return
    if not isinstance(sources, list):
        errors.append("sources must be a list")
        return
    if not sources:
        errors.append(
            "sources is empty — every page declares provenance: external "
            "claims point into sources/, internal artifacts point at "
            "their origin (another page, a dated note, the work that "
            "produced them)"
        )
        return

    if link_index is None:
        link_index = build_link_index(kb)

    for entry in sources:
        targets = extract_wikilinks(entry)
        if targets:
            for target in targets:
                if not link_resolves(target, link_index):
                    errors.append(
                        f"sources entry [[{target}]] does not resolve to a file"
                    )
        elif re.match(r"^https?://", entry):
            warnings.append(
                f"sources entry is a bare URL ({entry}) — allowed for "
                "incidental facts, but fetched-and-filed sources are "
                "lint-verifiable; consider filing into sources/"
            )
        else:
            errors.append(
                f"sources entry '{entry}' is neither a [[wikilink]] nor a URL"
            )


def validate_page_data(
    path: Path | str,
    kb: KB,
    link_index: LinkIndex | None = None,
    today: str | None = None,
) -> tuple[list[str], list[str]]:
    """Validate one page against the KB page schema.

    Checks path legality (inside the KB root, not sources/ or the non-page
    files), frontmatter completeness, enum and date fields, the provenance
    rule, and a non-empty body.

    Args:
      path: Page file to validate.
      kb: The KB the page belongs to.
      link_index: Prebuilt link index; built on demand when omitted.
      today: ISO date override for tests; defaults to the current date.

    Returns:
      A (errors, warnings) pair of human-readable messages. Errors mean the
      page violates the protocol; warnings are advisory.
    """
    errors: list[str] = []
    warnings: list[str] = []
    page_path = Path(path).resolve()
    today = today or date.today().isoformat()

    try:
        rel = page_path.relative_to(kb.root)
    except ValueError:
        return [
            f"not a KB page — this validator only applies to files under the KB root "
            f"({kb.root})"
        ], []

    if rel.parts and rel.parts[0] == "sources":
        return [
            "path is under sources/ — sources are append-only raw material, "
            "never validated or edited as pages"
        ], []
    if page_path.name == "INDEX.md":
        return ["INDEX.md is script-generated — never written by hand"], []
    if page_path.name in ("LOG.md", "SCHEMA.md"):
        return [
            f"{page_path.name} is not a page (LOG.md is append-only via kb_log.py; "
            "SCHEMA.md is the owner's convention doc)"
        ], []
    if not page_path.exists():
        return ["file does not exist"], []

    frontmatter, body = read_page(page_path)
    if frontmatter is None:
        return ["missing frontmatter block (--- ... ---)"], []

    for field in REQUIRED_FIELDS:
        if field not in frontmatter:
            errors.append(f"missing required frontmatter field: {field}")

    page_type = frontmatter.get("type")
    if isinstance(page_type, str) and page_type not in PAGE_TYPES:
        errors.append(f"type '{page_type}' not one of {sorted(PAGE_TYPES)}")

    confidence = frontmatter.get("confidence")
    if isinstance(confidence, str) and confidence not in CONFIDENCE_LEVELS:
        errors.append(
            f"confidence '{confidence}' not one of {sorted(CONFIDENCE_LEVELS)}"
        )

    for field in ("created", "updated"):
        value = frontmatter.get(field)
        if isinstance(value, str) and not DATE_RE.match(value):
            errors.append(f"{field} is not an ISO date (YYYY-MM-DD): '{value}'")

    created, updated = frontmatter.get("created"), frontmatter.get("updated")
    if (
        isinstance(created, str)
        and isinstance(updated, str)
        and DATE_RE.match(created)
        and DATE_RE.match(updated)
        and updated < created
    ):
        errors.append("updated date is before created date")
    if isinstance(updated, str) and DATE_RE.match(updated) and updated != today:
        warnings.append(
            f"updated ({updated}) is not today ({today}) — "
            "bump it if you just modified this page"
        )

    _validate_sources_field(
        frontmatter.get("sources"), kb, link_index, errors, warnings
    )

    if isinstance(frontmatter.get("tags"), str):
        errors.append("tags must be a list (use [] if none)")

    if not body.strip():
        errors.append("page body is empty")
    elif not re.search(r"^#\s+\S", body, re.M):
        warnings.append("no H1 heading in body")

    return errors, warnings


def parse_log_dates(kb: KB) -> set[str]:
    """Dates (ISO strings) that have at least one LOG.md entry."""
    log_path = kb.root / "LOG.md"
    if not log_path.exists():
        return set()
    return set(
        re.findall(
            r"^##\s*\[(\d{4}-\d{2}-\d{2})\]", log_path.read_text(encoding="utf-8"), re.M
        )
    )


def today_iso() -> str:
    """The current date as an ISO string (single source for log/report stamps)."""
    return date.today().isoformat()

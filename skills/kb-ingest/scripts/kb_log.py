#!/usr/bin/env python3
"""Append a canonical entry to the KB's LOG.md.

The log format is parsed by lint and by humans skimming history, so entries
are always written through this script — never by hand. One line per
operation:

    ## [2026-07-07] ingest | Raft consensus distilled from whitepaper (yasik)
      pages: concepts/raft-consensus.md, sources/raft-paper.md

Typical usage example:

  python3 kb_log.py --action ingest --title "..." --agent yasik \\
      --pages concepts/x.md sources/y.md

--agent is the author identity: your name for a personal KB, the agent id in
an org installation. Prints the appended entry on success.
"""

import argparse
import sys
from enum import StrEnum
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from kb_common import KBError, find_kb, today_iso

LOG_HEADER = """# KB Log

Append-only journal of every KB operation. Entries are written by
`kb_log.py` (kb-ingest / kb-lint skills) — never by hand.
"""


class LogAction(StrEnum):
    """Operation kinds a LOG.md entry can record."""

    INGEST = "ingest"
    EDIT = "edit"
    LINT = "lint"
    QUERY = "query"


def format_entry(action: str, title: str, agent: str, pages: list[str]) -> str:
    """Render one canonical log entry (the exact format lint parses)."""
    entry = f"## [{today_iso()}] {action} | {title} ({agent})"
    if pages:
        entry += "\n  pages: " + ", ".join(pages)
    return entry


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--action", required=True, choices=[a.value for a in LogAction])
    parser.add_argument("--title", required=True,
                        help="short human-readable summary of the operation")
    parser.add_argument("--agent", required=True,
                        help="author identity (your name, or the agent id in org installations)")
    parser.add_argument("--pages", nargs="*", default=[],
                        help="paths touched (KB-relative preferred)")
    parser.add_argument("--kb", default=None, help="KB root or workspace path")
    args = parser.parse_args()

    # CLI boundary: discovery/config failures become exit messages here.
    try:
        kb = find_kb(args.kb)
    except KBError as exc:
        sys.exit(f"error: {exc}")

    log_path = kb.root / "LOG.md"
    entry = format_entry(args.action, args.title, args.agent, args.pages)

    if not log_path.exists():
        log_path.write_text(LOG_HEADER + "\n" + entry + "\n", encoding="utf-8")
    else:
        existing = log_path.read_text(encoding="utf-8")
        separator = "" if existing.endswith("\n") else "\n"
        log_path.write_text(existing + separator + entry + "\n", encoding="utf-8")

    print(f"appended to {kb.rel(log_path)}:")
    print(entry)


if __name__ == "__main__":
    main()

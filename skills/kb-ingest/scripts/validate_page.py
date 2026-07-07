#!/usr/bin/env python3
"""Validate KB pages after writing them — the mechanical half of ingest.

Checks (per page):
  - path is a legal page location (inside the KB root, not sources/, not
    INDEX.md / LOG.md / SCHEMA.md)
  - frontmatter present with all required fields
    (type, created, updated, author, confidence, sources, tags)
  - type / confidence values are in their enums; dates are ISO
  - provenance rule: sources is non-empty; [[wikilink]] entries resolve
    to real files; bare URLs allowed but warned
  - body is non-empty

Exit code 0 = all pages valid (warnings allowed unless --strict).
Exit code 1 = at least one error; the messages say exactly what to fix.

Typical usage example:

  python3 validate_page.py --kb ~/vault concepts/raft-consensus.md

KB discovery when --kb is omitted: $KB_ROOT, then walking up from cwd for a
.kb.json, a SCHEMA.md/LOG.md, or a kb/ directory (see kb_common.py).
"""

import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from kb_common import KBError, build_link_index, find_kb, validate_page_data


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pages", nargs="+", help="page paths (absolute or relative to cwd)")
    parser.add_argument("--kb", default=None, help="KB root or workspace path")
    parser.add_argument("--strict", action="store_true", help="treat warnings as errors")
    args = parser.parse_args()

    # CLI boundary: discovery/config failures become exit messages here.
    try:
        kb = find_kb(args.kb)
    except KBError as exc:
        sys.exit(f"error: {exc}")

    link_index = build_link_index(kb)
    failed = False

    for page in args.pages:
        page_path = Path(page).expanduser().resolve()
        errors, warnings = validate_page_data(page_path, kb, link_index=link_index)

        if errors:
            failed = True
            print(f"FAIL {kb.rel(page_path)}")
            for error in errors:
                print(f"  error: {error}")
        else:
            print(f"OK   {kb.rel(page_path)}")

        for warning in warnings:
            print(f"  warning: {warning}")
            if args.strict:
                failed = True

    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()

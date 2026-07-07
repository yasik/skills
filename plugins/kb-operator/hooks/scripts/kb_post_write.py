#!/usr/bin/env python3
"""PostToolUse validator for KB page writes — immediate feedback loop.

When a Write/Edit lands on a KB *page* (inside a detected KB root, not
sources/, not INDEX/LOG/SCHEMA), this runs the kb-ingest validator on it:

  - validation errors  -> decision "block" with the exact errors, so the
    model fixes the page immediately instead of leaving it for lint
  - valid page         -> a one-line additionalContext reminder of the two
    protocol steps that are easiest to forget (cross-reference sweep + log)

KB detection is marker/config-based (SCHEMA.md/LOG.md markers or .kb.json),
so the KB directory can be named anything. Reuses the canonical validator
from the bundled kb-ingest skill — one implementation, three enforcement
surfaces (script, hook, lint).

Fails open: any unexpected error exits 0 silently.
"""

import json
import sys
from pathlib import Path
from typing import cast

# The canonical validator lives in the bundled kb-ingest skill:
# <plugin>/hooks/scripts/kb_post_write.py -> <plugin>/skills/kb-ingest/scripts.
# If the skill directory is missing (broken symlink, partial install), the
# hook has no opinion and exits 0 — fail open, never break the session.
sys.path.insert(
    0,
    str(
        (
            Path(__file__).resolve().parent.parent.parent
            / "skills"
            / "kb-ingest"
            / "scripts"
        ).resolve()
    ),
)

# isort: off
try:
    from kb_common import KB, kb_for_file, validate_page_data
except Exception:  # hook boundary: fail open on a broken install
    sys.exit(0)
# isort: on

VALID_PAGE_REMINDER = (
    "KB page write validated OK. kb-ingest reminders: sweep cross-references "
    "on related pages, then log the operation via kb_log.py — one entry per "
    "ingest, listing every touched file."
)


def is_kb_page(path: str, kb: KB) -> bool:
    """Check whether `path` is a wiki page (not a source or a non-page file)."""
    rel = Path(path).resolve().relative_to(kb.root)

    if rel.suffix != ".md" or any(part.startswith(".") for part in rel.parts):
        return False
    if rel.parts and rel.parts[0] == "sources":
        return False
    return rel.name not in ("INDEX.md", "LOG.md", "SCHEMA.md")


def main() -> None:
    # Hook boundary: any unexpected failure exits 0 with no output so a
    # validator bug can never block unrelated tool calls.
    try:
        # Trust boundary: the hook payload is raw JSON, read exactly once here.
        payload: object = json.load(sys.stdin)
        if not isinstance(payload, dict):
            sys.exit(0)
        raw_tool_input = cast(dict[str, object], payload).get("tool_input")
        if not isinstance(raw_tool_input, dict):
            sys.exit(0)
        file_path = cast(dict[str, object], raw_tool_input).get("file_path")
        if not isinstance(file_path, str) or not Path(file_path).exists():
            sys.exit(0)

        kb = kb_for_file(file_path)
        if kb is None or not is_kb_page(file_path, kb):
            sys.exit(0)

        errors, _warnings = validate_page_data(file_path, kb)
        if errors:
            print(
                json.dumps(
                    {
                        "decision": "block",
                        "reason": (
                            "KB page failed validation (kb-ingest protocol) — fix before "
                            "moving on:\n- " + "\n- ".join(errors)
                        ),
                    }
                )
            )
        else:
            print(
                json.dumps(
                    {
                        "hookSpecificOutput": {
                            "hookEventName": "PostToolUse",
                            "additionalContext": VALID_PAGE_REMINDER,
                        }
                    }
                )
            )
    except Exception:  # noqa: S110 — fail open by contract (see module docstring)
        pass

    sys.exit(0)


if __name__ == "__main__":
    main()

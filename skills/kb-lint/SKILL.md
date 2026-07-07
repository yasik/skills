---
name: kb-lint
description: Health check for a markdown knowledge base (Obsidian-compatible, the LLM-wiki pattern) — personal or shared. Use whenever asked to lint, audit, check, review, or clean up a KB, on any scheduled hygiene/maintenance run, or when KB quality is in doubt (stale pages, contradictions, broken links, unprocessed sources, index drift). Drift is the KB's primary failure mode; if in doubt whether a lint pass is warranted, it is.
---

# kb-lint — KB health check

A knowledge base rots by default: indexes drift from pages, claims go stale,
duplicates accumulate, sources pile up un-ingested. Lint is the counter-force
and it is not optional — every production implementation of the LLM-wiki
pattern reports drift as *the* failure mode. Lint runs in two phases:
deterministic checks (a script — free, exhaustive) and judgment passes (you —
expensive, so spent only where scripts can't reach).

## Before you start

Locate the KB root the same way kb-ingest does: a path you were given >
`$KB_ROOT` > `.kb.json` at the workspace root > a directory containing
`SCHEMA.md`/`LOG.md` > the default `kb/`. The script's `--kb` flag implements
this resolution. Then check for the **org extension**: if `.kb.json` declares
an `"org"` key or the workspace has `_charter/ORG.md`, read
[references/org-extension.md](references/org-extension.md) — it changes how
findings are routed in Phase 3. Otherwise the core protocol below applies
as written.

## Phase 1 — mechanical checks (run the script first)

```bash
python3 scripts/lint_mechanical.py --kb <kb-root> --report --agent <your-name-or-agent-id>
```

This checks: broken wikilinks, invalid/missing frontmatter (including the
provenance rule), modified files under `sources/` (append-only violation,
via git), unreferenced sources (un-ingested intake), orphan pages, page
updates with no LOG entry, oversized pages. With `--report` it writes a
report skeleton to `<kb>/.lint/<date>-mechanical.md` (or the `report_dir`
configured in `.kb.json`) with empty **Judgment findings** and **Resolution**
sections for you to fill in. Use `--format json` to process findings
programmatically.

## Phase 2 — judgment passes (what scripts cannot catch)

Read `INDEX.md` (or list pages) to plan the passes; read full pages only
where a pass flags something. Four passes, in order of value:

1. **Contradictions.** Cluster pages that speak about the same entity/topic
   (index descriptions and shared tags are good signals). Compare their
   claims. Two pages asserting incompatible facts is the highest-severity
   finding lint can produce — a KB that contradicts itself is worse than no
   KB, because it answers confidently either way.
2. **Staleness.** Pages whose `sources:` have newer material filed in
   `sources/` that they don't yet reflect; pages on volatile topics with
   old `updated` dates; claims with dates in them that have since passed.
   Flag, don't silently rewrite — the fix is a re-ingest against the newer
   source.
3. **Near-duplicates.** Pages whose titles/descriptions suggest the same
   concept split across two homes (the dedup gate at ingest time misses
   some). Propose a merge direction: which page survives, which becomes a
   redirect stub or is deleted after its unique content moves.
4. **Confidence downgrades.** Pages marked `confidence: high` whose sources
   are thin (single bare URL, no filed source) or contradicted elsewhere.
   Downgrading confidence is a cheap, honest fix you can apply directly.

## Phase 3 — triage and resolution

Every finding ends in exactly one of two places (core protocol):

- **Fixed directly** — mechanical, judgment-free repairs: a broken link whose
  target was renamed, a missing frontmatter field derivable from content, a
  confidence downgrade, an orphan page linked from the obvious related page.
  Every fix you apply is itself a KB write: follow the kb-ingest protocol
  (bump `updated`/`author` on touched pages, validate, log with
  `--action lint`).
- **Recorded as open items** — anything requiring knowledge the linter
  doesn't have (which side of a contradiction is true, whether a merge loses
  nuance, whether a stale claim still holds): write it into the report's
  **Resolution** section as a concrete, actionable item for the KB owner.
  Un-ingested sources are open items too — each is a pending ingest.

*Org installations route instead of recording* — judgment calls go to page
authors' inboxes, intake to the owning agent. See
[references/org-extension.md](references/org-extension.md); the report still
records every handoff.

Complete the report (all three sections), then log the pass:

```bash
python3 scripts/kb_log.py --action lint --agent <your-name-or-agent-id> \
    --title "lint pass: <N> errors, <M> warnings, <K> open items"
```

(`kb_log.py` ships with the kb-ingest skill; a copy of the shared helpers is
bundled here — the log line matters more than which copy writes it.)

## What lint never does

- Rewrite page *content* wholesale — lint repairs structure and surfaces
  judgment; substantive rewrites are re-ingests
- Touch anything under `sources/` (append-only, even for lint) beyond
  restoring a tampered file to its committed state
- Hand-edit `INDEX.md` (script-generated) or write LOG.md by hand
- Silently "fix" a contradiction by picking a side — surface it; the owner
  or a re-ingest against sources decides

## Done looks like

Script run clean or findings triaged → judgment passes done over the full
page set → report with all three sections filled → open items concrete enough
to act on (or handoffs delivered, in org mode) → one LOG entry. A lint pass
that only runs the script is half a lint pass.

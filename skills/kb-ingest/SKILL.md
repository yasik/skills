---
name: kb-ingest
description: The write protocol for a markdown knowledge base (Obsidian-compatible, the LLM-wiki pattern) — personal or shared. Use for EVERY write into the KB — distilling a new or scraped source, promoting a finished artifact/report/lesson into the KB, filing a durable learning or insight, or correcting/updating an existing page, even a one-line fix. If you are about to create or edit any file inside a knowledge base (a directory with SCHEMA.md/LOG.md, a .kb.json config, or a kb/ folder), use this skill first; there is no free-form edit path to the KB.
---

# kb-ingest — the KB write protocol

The knowledge base compounds in value only if every write follows the same
discipline: condensed pages, declared provenance, cross-references swept, one
log line per operation. A single undisciplined write is cheap; a thousand of
them make the KB untrustworthy at query time. This skill is that discipline —
the same whether the KB belongs to one person or an organization of agents.
Permissions are open — any author may create or edit any page. The *manner*
is not: every write, down to a one-line correction, is an ingest.

## The two layers (get this right and the rest follows)

- **`sources/` — append-only evidence.** Raw external material: scraped
  pages, whitepapers, transcripts. You may *add* files here (when new raw
  material is involved in your work); you never edit or delete existing ones.
- **Everything else in the KB — living synthesis.** Pages you write and
  maintain: `entities/`, `concepts/`, `projects/`, `decisions/`, `reports/`.

Your own outputs — reports, analyses, lessons — are **never** filed into
`sources/`, no matter how polished or reference-like they feel. Synthesis
recycled as evidence is how hallucinations launder themselves into ground
truth. A finished report becomes a *page* citing the raw material it was
built from.

## Before you write

1. **Locate the KB root** — in order: a path you were given; `$KB_ROOT`; a
   `.kb.json` at the workspace root (`{"root": "<dir>"}` — the KB directory
   can be named anything); a directory containing `SCHEMA.md`/`LOG.md`; the
   default `kb/` under the workspace. The bundled scripts implement exactly
   this resolution (`--kb` flag), so when in doubt run one and see what it
   finds.
2. **Read `SCHEMA.md`** at the KB root if it exists — it is the single source
   of truth for taxonomy and conventions and overrides anything here that
   conflicts. If the KB has no SCHEMA.md yet, bootstrap it from
   [references/schema-template.md](references/schema-template.md).
3. **Check for the org extension** — if `.kb.json` declares an `"org"` key,
   or the workspace has a charter with an `ORG.md`, this KB belongs to an
   agent organization: read
   [references/org-extension.md](references/org-extension.md) before
   ingesting (it adds ownership routing and org-specific provenance origins).
   Otherwise ignore it — nothing below depends on it.

## The ingest checklist

Work through these steps in order. Steps 2–5 are judgment — yours. Steps 6–7
are mechanics — the scripts'.

### 1. Classify the trigger

New raw source to distill · finished artifact to promote · durable learning
to file · correction/update to an existing page. All four are ingests; they
differ only in whether step 2 applies.

### 2. File raw material (if any)

If new external material is involved — a page you fetched, a document you
were given — save it to `sources/<kebab-slug>.md` first, verbatim or
minimally cleaned. This is what your page will cite; a citation into your
context window is unverifiable the moment the session ends. For web research:
anything your page *substantively relies on* gets fetched and filed;
incidental facts may carry bare URL citations at lower `confidence` (accept
the link-rot tradeoff consciously).

### 3. Dedup gate — search before writing

Search the KB for existing pages on the topic (`kb_search` / qmd if
available, otherwise `INDEX.md` + grep). This decides **new page vs. edit**:

- Create a new page only for a distinct, linkable concept you expect other
  pages to reference.
- Otherwise update the existing page. An improved existing page beats a
  near-duplicate every time — duplicates split future updates between two
  homes and rot both.
- Point-in-time outputs (a competitive scan, this week's analysis) are
  `reports/`; knowledge that should improve over time (a topic explainer, a
  lesson) belongs in `concepts/` — update the living page rather than filing
  a fifth dated snapshot.

### 4. Write the page — condense, don't mirror

A page's job is to *condense* facts scattered across sources into the
shortest faithful synthesis, with `[[wikilinks]]` to related pages. Mirroring
content that is already greppable in a source adds negative value. Every page
carries this frontmatter:

```yaml
---
type: entity | concept | project | decision | report
created: 2026-07-06
updated: 2026-07-06            # bump on every edit
author: <your-name-or-agent-id>  # last substantive reviser
confidence: high | medium | low
sources: ["[[sources/raft-paper]]"]   # provenance — see rule below
tags: []
---
```

**Provenance rule** (the `sources:` field): every page declares where its
content came from. Claims about the external world point into `sources/`;
internal artifacts (decisions, reports, insights from your own work) point at
their internal origin — another page, a dated note, the project or
conversation that produced them. An empty `sources:` fails validation.

When promoting an artifact, cite what the artifact was *built from* — the
filed sources, the project page — never the draft itself. Drafts and working
files get pruned; a KB page whose provenance points at scratch space goes
dangling the day that space is cleaned up.

### 5. Sweep related pages

A good ingest touches several pages, not one: add cross-references from
related entity/concept pages, bump project status if this work belongs to a
project, link the new page where future readers will come from. This sweep is
what makes the wiki a *web* instead of a pile — and it is exactly the
bookkeeping that erodes first without a checklist. Every page you touch in
the sweep is part of this same ingest: bump its `updated` and `author`.

### 6. Validate

```bash
python3 scripts/validate_page.py --kb <kb-root> <every page you wrote or edited>
```

Fix anything it reports and re-run until clean. It checks path legality,
frontmatter completeness, enums, dates, and that provenance links resolve.

### 7. Log — one entry per operation

```bash
python3 scripts/kb_log.py --kb <kb-root> --action ingest \
    --title "<what happened, one line>" --agent <your-name-or-agent-id> \
    --pages <every file you created or edited, including sources>
```

Use `--action edit` for small corrections, `ingest` for everything else.
Never write LOG.md by hand — lint checks the canonical format.

## What you never do

- Edit or delete anything under `sources/` (append-only; git catches this)
- Write `INDEX.md` — it is regenerated by script from page frontmatter
- File your own synthesis into `sources/`
- Skip the log line or the validation, however small the edit

## Done looks like

Sources filed (if any) → no duplicate created → page(s) condensed with valid
frontmatter → related pages swept → `validate_page.py` clean → one log entry
listing every touched file. If you were interrupted mid-ingest, the log line
is the last step precisely so an unlogged half-ingest is detectable by lint.

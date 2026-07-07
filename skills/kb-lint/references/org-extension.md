# Org extension — KB conventions for agent organizations

The core KB protocol (ingest / lint / query) is deliberately org-free: it
manages knowledge, not an organization, and works identically for a personal
KB. This extension adds the conventions that only make sense when the KB is
shared by an organization of agents. Read it only when the installation
declares it.

## Detection

An installation is an org installation when either:

- `.kb.json` at the workspace root has an `"org"` key:

  ```json
  {
    "root": "kb",
    "org": {
      "charter": "_charter",   // where ORG.md lives, relative to workspace
      "agents": "agents"       // agent workspaces root, relative to workspace
    }
  }
  ```
  (both keys optional; the values above are the defaults)

- or the workspace has `_charter/ORG.md` — treat the defaults as declared.

## What changes

**Identity.** `author:` in page frontmatter and `--agent` in the scripts are
agent ids from `ORG.md`, not personal names. The `author:` field is a routing
address: it says whose inbox receives judgment calls about the page.

**Provenance origins.** In addition to the core internal origins (other
pages, dated notes), org installations may cite agent-workspace files: an
agent's daily log (`agents/<id>/log/YYYY-MM-DD.md`) or a handoff note. Cite
durable workspace files only — never drafts in `artifacts/` (prunable), and
prefer a project page or decision record when one exists, since workspace
files are invisible to other agents' searches.

**Ownership routing (ingest & intake).** `ORG.md` may assign topics to
agents. Before ingesting material clearly in another agent's domain, hand it
off instead: write a short note into `agents/<owner>/inbox/` — what the
material is, where it's filed, why it's theirs — and stop. A wrong-domain
ingest produces confidently-wrong pages; the handoff costs one file.

**Lint triage routing.** In the core protocol, judgment findings become open
items in the lint report for the KB owner. In an org installation, route them
instead: each judgment call goes to the responsible page's `author:` via
`agents/<author>/inbox/<date>-kb-lint.md` (one note per recipient, linking
the report and the specific pages); unreferenced sources route to the intake
owner per `ORG.md`. If an author agent no longer exists, fall back to the
librarian's own queue or `ORG.md`. The lint report's **Resolution** section
records every handoff and its recipient.

**Report location.** Org vaults often keep operational records outside the
KB — set `"report_dir"` in `.kb.json` (e.g. `"../ops/lint"`, relative to the
KB root) so lint reports land where the org expects them.

## What does not change

Everything else. The ingest checklist, the two layers, the provenance rule,
validation, logging, the mechanical lint checks, and the never-do list are
identical in personal and org installations. If you find yourself wanting
org-specific exceptions to those, the answer is no — that is exactly the
drift the protocol exists to prevent.

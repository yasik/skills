# kb-operator

Operate a markdown knowledge base (Obsidian-compatible, the
[LLM-wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f))
with your coding agent: disciplined writes, scheduled health checks, and
tool-level enforcement of the KB's invariants. Works with Claude Code and
OpenAI Codex.

Out of the box this is a **personal knowledge base** operator: you (and your
agent) ingest sources, grow interlinked pages, and keep the KB healthy.
Domain-specific behaviors — like running the KB inside an autonomous agent
organization — are opt-in [extensions](#extensions), not part of the core.

## What's inside

| Component | | |
|---|---|---|
| **Skills** | `kb-ingest` | The write protocol — every KB write (new source, promoted artifact, learning, one-line fix) follows one checklist: classify → file raw material → dedup → condense → sweep → validate → log. Bundles `validate_page.py` + `kb_log.py`. |
| | `kb-lint` | Health check — deterministic script (7 checks) + LLM judgment passes (contradictions, staleness, duplicates) + triage into direct fixes and open items. Bundles `lint_mechanical.py`. |
| **Agents** | `kb-operator` | The KB interface: answers questions from the KB with citations, performs writes via kb-ingest. Delegate any KB read/write to it. |
| | `kb-librarian` | Hygiene: runs the full lint protocol, fixes mechanical issues, records judgment calls as actionable open items. |
| | `kb-intake` | Drains the un-ingested sources queue: distills raw material you drop into `sources/` into pages. |
| **Hooks** | `kb_guard.py` (PreToolUse) | **Denies** hand-edits to the KB's `INDEX.md` (script-generated), `LOG.md` (append-only via script), `SCHEMA.md` modifications (owner-controlled), and edits to existing `sources/` files (append-only evidence; filing new sources stays allowed). |
| | `kb_post_write.py` (PostToolUse) | Validates every KB page write immediately — errors come back as blocking feedback; valid writes get a one-line reminder (sweep + log). |

The hooks are the enforcement tier of the protocol: skill + validation
scripts + lint remain the convention layer, hooks make the invariants hard.
Bash-level writes are deliberately not intercepted — lint is the backstop.

## Quick start (personal KB)

**Fastest path — the interactive installer.** Scaffolds the KB, initializes
git, installs the plugin into detected CLIs, and wires up qmd search, with
sensible defaults at every step:

```bash
npx create-kb-operator            # or point it at a dir / Obsidian vault
```

(Until the package is published to npm: `node plugins/kb-operator/installer/bin/create-kb-operator.mjs`
from a clone of this repo.)

**Manual paths** below, if you prefer to see every move.

**Option A — your own base folder** (any directory name works):

```bash
mkdir -p ~/notes/knowledge/sources
cp skills/kb-ingest/references/schema-template.md ~/notes/knowledge/SCHEMA.md
printf '{"root": "knowledge"}\n' > ~/notes/.kb.json   # optional if the dir is named kb/
```

**Option B — inside an Obsidian vault** (the KB is a folder in the vault;
the rest of the vault — daily notes, attachments — stays outside the
protocol, and `[[wikilinks]]` between the KB and the rest of the vault
resolve both ways):

```bash
VAULT=~/Obsidian/MyVault
mkdir -p "$VAULT/kb/sources"
cp skills/kb-ingest/references/schema-template.md "$VAULT/kb/SCHEMA.md"
# no .kb.json needed — kb/ is the default; add one only to rename the folder
```

`.obsidian/` and other dot-directories are ignored by validation, lint, and
link indexing. To treat the *entire* vault as the KB instead, place
`SCHEMA.md` at the vault root — a KB root is wherever that file lives. Do
that only if you want every note held to the page schema: in whole-vault
mode, daily notes and scratch files count as pages and lint will flag them.
The folder-in-vault layout is the right default.

Then install the plugin (see Install below) and, in a session:

```text
- drop raw material into <kb>/sources/
- "ingest the new sources"        -> kb-intake / kb-ingest take over
- "what do we know about X?"      -> kb-operator answers with citations
- "run a KB health check"         -> kb-librarian runs kb-lint
```

## KB discovery and configuration

Nothing is bound to a fixed path. A **KB root** is any directory containing
`SCHEMA.md` or `LOG.md`; scripts and hooks resolve it in this order:

1. explicit `--kb <path>`
2. `$KB_ROOT`
3. walking up from cwd for a `.kb.json`, a KB root, or a `kb/` child
   (the default layout)

Optional `.kb.json` at the workspace root:

```json
{
  "root": "knowledge",        // KB dir relative to this file (default "kb")
  "report_dir": ".lint"       // lint reports, relative to the KB root
}
```

`INDEX.md` regeneration is intentionally out of scope: the protocol assumes a
deterministic script of yours (or an Obsidian plugin) recompiles it from page
frontmatter — the guard hook only ensures nobody hand-edits it.

## Install — Claude Code

From the marketplace in this repo:

```bash
claude plugin marketplace add yasik/skills
claude plugin install kb-operator@yasik-skills
```

Or for local development / trying it out:

```bash
claude --plugin-dir path/to/skills/plugins/kb-operator
```

Skills appear as `/kb-operator:kb-ingest` and `/kb-operator:kb-lint`; agents
as `kb-operator:kb-operator`, `kb-operator:kb-librarian`,
`kb-operator:kb-intake` (delegated automatically or @-mentioned).

## Install — OpenAI Codex

The manifest at `.codex-plugin/plugin.json` bundles the skills and the
PreToolUse guard hook:

```bash
codex plugin marketplace add yasik/skills   # or: add ./ from a local clone
```

Codex plugins cannot bundle agents yet — copy the TOML definitions:

```bash
cp codex/agents/*.toml ~/.codex/agents/      # personal
# or <repo>/.codex/agents/ for project scope
```

Codex caveats: the guard hook parses Codex
`apply_patch` payloads best-effort (`*** Update File:` / `*** Add File:`
markers); the PostToolUse validator is Claude-only for now; project hooks
require `.codex/` trust.

## Search — wiring up qmd

The protocol's dedup gate and query routing assume the KB is searchable.
Everything works without a search backend — agents fall back to `INDEX.md` +
grep — but real retrieval quality comes from
[qmd](https://github.com/tobi/qmd): local-first hybrid search (BM25 +
vectors + reranking, fully on-device) whose MCP server gives agents
`query` / `get` / `multi_get` / `status` tools.

**Automatic** — `npx create-kb-operator` (the Quick start installer) does
all of the below interactively.

**Manual** — five commands:

```bash
npm install -g @tobilu/qmd                  # or: bun install -g @tobilu/qmd

qmd collection add <kb-root> --name mykb    # index the KB
qmd context add qmd://mykb "Knowledge base: entities, concepts, projects, decisions, reports, and raw sources"
qmd update                                  # build the BM25 index (fast, no models)
qmd embed                                   # optional: semantic search — downloads ~2GB of local models

claude mcp add --scope user qmd -- qmd mcp  # expose the tools to Claude Code
```

Codex — add to `~/.codex/config.toml`:

```toml
[mcp_servers.qmd]
command = "qmd"
args = ["mcp"]
```

How the pieces get used: `qmd search` (BM25-only, instant) covers the
ingest dedup gate and quick lookups; `qmd query` (hybrid + rerank) is for
judgment-heavy retrieval; `get`/`multi_get` do bounded line-range reads.
The context line matters — qmd feeds it to the reranker. Keep the index
fresh alongside the hygiene jobs below: `qmd update && qmd embed`.

## Orchestration — running the KB on a schedule

The KB stays healthy because hygiene is *scheduled*, not remembered. A
sensible default cadence:

| Job | Agent | Cadence |
|---|---|---|
| Drain new sources into pages | `kb-intake` | daily, or after you drop material |
| Full health check + report | `kb-librarian` | weekly |
| Reindex search | `qmd update && qmd embed` | with each of the above |
| Recompile `INDEX.md` | your script | with each of the above |

**Claude Code — native scheduling.** Use `/schedule` in a session to create a
recurring routine (a cloud agent on a cron schedule), e.g. *"every Monday at
8am, run a full KB lint pass on ~/notes as the kb-librarian agent and leave
the report in the KB"*.

**Claude Code — system cron (local, headless).** `claude -p` runs a prompt
non-interactively with your installed plugins; give it edit permissions and
point it at the workspace:

```cron
# daily intake at 07:30
30 7 * * * cd ~/notes && claude -p "Use the kb-operator:kb-intake agent to drain un-ingested sources from the KB" --permission-mode acceptEdits

# weekly librarian pass, Monday 08:00
0 8 * * 1 cd ~/notes && claude -p "Use the kb-operator:kb-librarian agent to run a full KB lint pass" --permission-mode acceptEdits
```

**Codex — system cron.** `codex exec` is the headless equivalent; reference
the skill explicitly and grant workspace writes:

```cron
0 8 * * 1 cd ~/notes && codex exec --full-auto "Run the kb-lint skill end to end on this workspace's KB as author 'librarian'"
```

Two notes that matter in practice: the enforcement hooks are active in these
scheduled sessions too (the plugin travels with the CLI), and every scheduled
run still ends with a `LOG.md` entry — so `LOG.md` doubles as your audit
trail of what automation did while you weren't looking.

## Extensions

The core above is domain-agnostic knowledge management. Extensions layer
domain-specific conventions on top — declared in `.kb.json`, loaded by the
skills only when present, invisible otherwise. One ships today.

### Org extension — KBs inside agent organizations

For a KB shared by an autonomous agent organization (an org chart of agents
with roles, workspaces, and handoffs). Enable it by declaring `"org"` in
`.kb.json`:

```json
{
  "root": "kb",
  "org": {
    "charter": "_charter",    // where ORG.md (roles/ownership) lives
    "agents": "agents"        // agent workspaces (inboxes) root
  }
}
```

What it changes — defined in `references/org-extension.md` inside each skill:

- `author:` and `--agent` become **agent ids**; the author field doubles as
  a routing address
- `kb-intake` checks **topical ownership** in `ORG.md` and hands off
  out-of-domain sources to the owner's inbox instead of ingesting them
- `kb-librarian` **routes** judgment findings to page authors' inboxes
  rather than recording open items for a single owner
- provenance may cite agent-workspace files (daily logs, handoff notes)

The ingest discipline itself is identical in both modes — the extension
changes routing, never the protocol.

## Requirements

Python 3.12+ on PATH as `python3` (per this repo's
[code style](../../docs/code-style/python/README.md); the scripts use only
the standard library — no packages to install). Source immutability checks
need the KB under git (skipped gracefully otherwise). One bootstrap edge: a
brand-new KB with a custom directory name has no markers until `SCHEMA.md`
exists, so hook protection starts after the schema is bootstrapped (or
immediately, with a `.kb.json`).

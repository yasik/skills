# create-kb-operator

Interactive, step-by-step installer for a
[kb-operator](../README.md) knowledge base. One command, sensible defaults,
every step skippable and safe to re-run:

```bash
npx create-kb-operator            # interactive, current directory
npx create-kb-operator ~/notes    # target a workspace (new dir or Obsidian vault)
npx create-kb-operator --yes      # accept all defaults, no prompts
```

## What it sets up

1. **Knowledge base** — `SCHEMA.md` (from the bundled template), `sources/`,
   and a `.kb.json` when the KB folder isn't named `kb/` or org mode is on.
   Detects Obsidian vaults and scaffolds the KB as a folder inside them.
2. **Git baseline** — offers `git init` + initial commit; the `sources/`
   append-only lint check compares against committed state.
3. **Agent plugins** — detects `claude` / `codex` on PATH and installs the
   kb-operator plugin from the `yasik/skills` marketplace.
4. **Search (qmd)** — installs [qmd](https://github.com/tobi/qmd) if wanted,
   creates a collection over the KB, adds reranker context, builds the BM25
   index, optionally enables semantic search (~2GB of local models, opt-in),
   and registers qmd as an MCP server so agents get `query`/`get` tools.

Nothing is overwritten on re-run: existing `SCHEMA.md`, `.kb.json`, git
repos, and qmd collections are detected and left alone. External command
failures degrade to printed manual instructions — the setup never aborts
half-way.

## Options

| Flag | Effect |
|---|---|
| `--yes` / `-y` | accept all defaults, no prompts (personal mode, no embeddings) |
| `--kb-dir <name>` | KB folder name inside the workspace (default `kb`) |
| `--org` | enable the org extension in `.kb.json` |
| `--skip-git` / `--skip-plugins` / `--skip-qmd` | skip a step entirely |

Zero runtime dependencies — node built-ins only, so `npx` starts instantly.
Requires Node 18+.

The schema template has a single source of truth (the kb-ingest skill's
`references/schema-template.md`): repo runs read it through the plugin's
`skills/` symlink, and `npm pack` copies it into `assets/` via the `prepack`
script — nothing is duplicated in git.

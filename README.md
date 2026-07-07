# Skills

A small, growing collection of skills I've productized for coding agents
(Claude Code and anything else that reads agent skills).

## What's inside

| Skill | What it does | Docs |
|---|---|---|
| **terminal-report** | Polished terminal output for CLIs and analysis tools — ANSI colors, aligned tables, sparklines, diverging bars, tagged progress logs. Triggers when you build a command-line tool or want output that looks "like a dashboard." | [docs/terminal-report.md](docs/terminal-report.md) |
| **teach** | Turns a topic or a pile of links into one complete, self-paced lesson — chaptered, with the hardest concept slowed down and worked through, diagrams only where they help, and real citations to go deeper. Triggers on "teach me X", "explain this `<link>`", "help me understand …" — when the goal is understanding, not a TL;DR. | [docs/teach.md](docs/teach.md) |
| **mermaid-render** | Renders a Mermaid diagram (flowchart, state, or sequence) as a beautiful, optionally **animated** SVG/PNG in a calm editorial style — role-coded nodes, data-flow animation, and every pixel driven by one config file. Triggers on "render / beautify / draw this diagram", "make this Mermaid nice", or turning a process or architecture into a polished diagram. | [docs/mermaid-render.md](docs/mermaid-render.md) |
| **kb-ingest** | The write protocol for a markdown knowledge base — personal or shared (the [LLM-wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)) — every KB write follows one checklist: classify → file raw material → dedup → condense → sweep cross-references → validate → log. Ships dependency-free validation and logging scripts; KB location configurable via `.kb.json`. | [plugins/kb-operator](plugins/kb-operator/README.md) |
| **kb-lint** | Health check for the same KB — a deterministic script (broken links, provenance, tampered sources, orphans, un-ingested intake) plus LLM judgment passes (contradictions, staleness, duplicates), with triage. | [plugins/kb-operator](plugins/kb-operator/README.md) |

## Plugins

| Plugin | What it does |
|---|---|
| **[kb-operator](plugins/kb-operator/README.md)** | Packages `kb-ingest` + `kb-lint` with three agents (operator, librarian, intake) and hooks that enforce KB invariants at the tool-call level — generated `INDEX.md`, append-only `LOG.md` and `sources/`. Personal-KB-first core with an opt-in org extension for agent organizations (ownership routing, inbox handoffs). Works with Claude Code (`claude plugin marketplace add yasik/skills`) and OpenAI Codex. One-command setup: **`npx create-kb-operator`** ([installer](plugins/kb-operator/installer/README.md)) — scaffolds the KB, installs the plugin, and wires up [qmd](https://github.com/tobi/qmd) search. |

See it in action: [docs/examples/finterm-13f.md](docs/examples/finterm-13f.md) — a
stock-performance CLI built with `terminal-report`; and the
[mermaid-render gallery](docs/examples/mermaid-render.md) — flowchart, state, and
sequence renders with their Mermaid source.

## Install

Easiest is the [`skills` CLI](https://github.com/vercel-labs/skills) (`npx
skills`) — point it at this repo and the skill you want:

```bash
# install terminal-report for Claude Code, globally (~/.claude/skills)
npx skills add yasik/skills --skill terminal-report -a claude-code -g
```

- `-a, --agent` — target agent(s): `claude-code`, `cursor`, `cline`, `codex`, … (omit to choose interactively)
- `-g, --global` — install to `~/<agent>/skills` instead of the current project
- `--copy` — copy the files instead of symlinking (default is a symlink, so you stay in sync)
- `--list` — see what's available without installing

The CLI symlinks the skill into your agent's skills directory by default — so
you still get the live-updating symlink setup, just managed for you.

**Fallback — clone and copy:** if you'd rather not use the CLI:

```bash
git clone https://github.com/yasik/skills
cp -R skills/terminal-report ~/.claude/skills/                         # Claude Code, global
# …or symlink to stay in sync:
ln -s "$PWD/skills/terminal-report" ~/.claude/skills/terminal-report
```

## Layout

```
skills/<name>/SKILL.md   # each skill, in the flat layout the CLI discovers
plugins/<name>/          # Claude Code / Codex plugins (skills symlinked from skills/)
docs/                    # how-tos and examples
```

(Plugin-specific tooling lives with its plugin — e.g. the KB installer is at
`plugins/kb-operator/installer/`.)

## Development

Code consistency across Python, TypeScript/JS, and markdown is enforced by
the Makefile harness (conventions in [docs/code-style](docs/code-style/README.md)):

```bash
make init        # uv sync (python dev tools) + bun install (installer)
make format      # isort + black (python), biome (js)
make lint        # isort/black --check, ruff, pyright, biome, yamllint, markdownlint
make typecheck   # mypy + pyright in parallel (both strict)
```

Requires [uv](https://docs.astral.sh/uv/) and [bun](https://bun.sh);
`markdownlint` is optional (`npm i -g markdownlint-cli`). Run `make lint`
before committing — the skill scripts are dependency-free at runtime, but
they are held to strict typing and the full lint suite in development.

## License

MIT — see [LICENSE](LICENSE).

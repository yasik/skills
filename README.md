# Skills

A small, growing collection of skills I've productized for coding agents
(Claude Code and anything else that reads agent skills).

## What's inside

| Skill | What it does | Docs |
|---|---|---|
| **terminal-report** | Polished terminal output for CLIs and analysis tools — ANSI colors, aligned tables, sparklines, diverging bars, tagged progress logs. Triggers when you build a command-line tool or want output that looks "like a dashboard." | [docs/terminal-report.md](docs/terminal-report.md) |
| **teach** | Turns a topic or a pile of links into one complete, self-paced lesson — chaptered, with the hardest concept slowed down and worked through, diagrams only where they help, and real citations to go deeper. Triggers on "teach me X", "explain this `<link>`", "help me understand …" — when the goal is understanding, not a TL;DR. | [docs/teach.md](docs/teach.md) |
| **mermaid-render** | Renders a Mermaid diagram (flowchart, state, or sequence) as a beautiful, optionally **animated** SVG/PNG in a calm editorial style — role-coded nodes, data-flow animation, and every pixel driven by one config file. Triggers on "render / beautify / draw this diagram", "make this Mermaid nice", or turning a process or architecture into a polished diagram. | [docs/mermaid-render.md](docs/mermaid-render.md) |
| **dev-docs** | Writes and reviews developer documentation to a complete, packaged technical-writing style guide (adapted from Google's) — second person, active voice, sentence-case headings, real procedures, code font and bold done right, the complete word list — with the whole guide packaged as local references and an index that maps every official page and section. Triggers on "write dev docs / a README / a quickstart / reference comments" or "review this against the style guide." | [docs/dev-docs.md](docs/dev-docs.md) |

Looking for the knowledge-base tooling (kb-ingest / kb-lint / kb-operator)?
It grew into its own project: **[kmd — Knowledge MarkDown](https://github.com/yasik/kmd)**
(`npx create-kmd`).

See it in action: [docs/examples/finterm-13f.md](docs/examples/finterm-13f.md) — a
stock-performance CLI built with `terminal-report`; and the
[mermaid-render gallery](docs/examples/mermaid-render.md) — flowchart, state, and
sequence renders with their Mermaid source.

## Engineering plugin

[Engineering](plugins/engineering/README.md) packages Andrii's full development
cycle into 12 focused workflow skills, with two documentation dependencies:
design, implementation, debugging, optimization, coding style, meaningful unit
tests, simplification, code review, docs sync, PR creation, PR monitoring, and
releases. An eval suite checks skill triggering and the quality bar.

It includes Codex and Claude plugin manifests, Pi package metadata, and standard
skill folders for Hermes, OpenCode, and other Agent Skills-compatible harnesses.
The [plugin guide](plugins/engineering/README.md) has local installation commands;
the [PR template](plugins/engineering/skills/create-pr/references/pr-template.md)
is editable independently of the skill.

## Install

Easiest is the [`skills` CLI](https://github.com/vercel-labs/skills) (`npx
skills`) — point it at this repo and the skill you want:

```bash
# install terminal-report for Claude Code, globally (~/.claude/skills)
npx skills add yasik/skills --skill terminal-report -a claude-code -g
# …or the docs-writing skill
npx skills add yasik/skills --skill dev-docs -a claude-code -g
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
plugins/engineering/     # self-contained development workflow plugin
.claude-plugin/           # local marketplace catalog
docs/                    # how-tos and examples
```

## Development

Code consistency is enforced by the Makefile harness (conventions in
[docs/code-style](docs/code-style/README.md)):

```bash
make init        # uv sync (dev tools)
make lint        # yamllint + markdownlint (python/ts targets activate when code lands)
```

Requires [uv](https://docs.astral.sh/uv/); `markdownlint` is optional
(`npm i -g markdownlint-cli`). The harness carries the full Python/TS
toolchain config (ruff, black, isort, mypy, pyright, biome) ready for any
future scripts — set `PY_DIRS` in the Makefile to activate it.

## License

MIT — see [LICENSE](LICENSE).

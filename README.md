# Skills

A small, growing collection of skills I've productized for coding agents
(Claude Code and anything else that reads agent skills).

## What's inside

| Skill | What it does | Docs |
|---|---|---|
| **terminal-report** | Polished terminal output for CLIs and analysis tools — ANSI colors, aligned tables, sparklines, diverging bars, tagged progress logs. Triggers when you build a command-line tool or want output that looks "like a dashboard." | [docs/terminal-report.md](docs/terminal-report.md) |
| **teach** | Turns a topic or a pile of links into one complete, self-paced lesson — chaptered, with the hardest concept slowed down and worked through, diagrams only where they help, and real citations to go deeper. Triggers on "teach me X", "explain this `<link>`", "help me understand …" — when the goal is understanding, not a TL;DR. | [docs/teach.md](docs/teach.md) |

See it in action: [docs/examples/finterm-13f.md](docs/examples/finterm-13f.md) — a
stock-performance CLI built with `terminal-report`.

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
docs/                    # how-tos and examples
```

## License

MIT — see [LICENSE](LICENSE).

# Skills

A small, growing collection of skills I've productized for coding agents
(Claude Code and anything else that reads agent skills). Right now there's
exactly one — more will land here as they prove themselves.

A *skill* is a folder with a `SKILL.md` (instructions + a description that tells
the agent when to reach for it) and any scripts or references it bundles. The
agent loads the description always, and the rest only when a task calls for it.

## What's inside

| Skill | What it does | Docs |
|---|---|---|
| **terminal-report** | Polished terminal output for CLIs and analysis tools — ANSI colors, aligned tables, sparklines, diverging bars, tagged progress logs. Triggers when you build a command-line tool or want output that looks "like a dashboard." | [docs/terminal-report.md](docs/terminal-report.md) |

See it in action: [docs/examples/finterm-13f.md](docs/examples/finterm-13f.md) — a
stock-performance CLI built with `terminal-report`.

## Install

Clone the repo, then point your agent config at a skill. I use the
`~/.agents/skills` (source) + `~/.claude/skills` (symlink) layout, and this repo
mirrors it — so "installing" is just symlinking a skill into your config:

```bash
git clone <this-repo> ~/code/skills
cd ~/code/skills

# symlink the skill into your global agent config
ln -s "$PWD/.agents/skills/terminal-report" ~/.agents/skills/terminal-report
ln -s ../../.agents/skills/terminal-report ~/.claude/skills/terminal-report
```

Claude Code reads `~/.claude/skills`; other agents read `~/.agents/skills`.
Symlinking (rather than copying) keeps you in sync with the repo. If you already
have a `terminal-report` folder in `~/.agents/skills` from earlier work, remove
it first so this repo is the single source of truth.

Prefer not to symlink? `cp -R .agents/skills/terminal-report ~/.agents/skills/`
works too — you just won't get updates automatically.

## Layout

```
.agents/skills/<name>/      # the skill (source of truth)
.claude/skills/<name>  ->   ../../.agents/skills/<name>   # symlink Claude Code reads
docs/                       # how-tos and examples
```

## License

MIT — see [LICENSE](LICENSE).

# terminal-report

Polished, structured terminal output for any CLI or analysis tool — the kind of
"dashboard in a terminal" you see in screenshots. It's not a TUI framework and
not magic: a pretty terminal report is just **a program's stdout**, built from
three things — ANSI escape codes for color, a monospace grid for alignment, and
Unicode block characters (`█ ▏▎▍▌▋▊▉`, `│`, `─`) for bars and rules. This skill
bundles a ready-made renderer plus the design principles to use it well.

## When it triggers

The skill is meant to fire whenever you're building something that prints to a
terminal and you want it to look good — e.g.:

- "build me a little CLI that summarizes X"
- "my script's output is a wall of text, make it readable"
- "show the results as a table with a bar next to each row"
- "print the results nicely" / "make it look like a dashboard"

It deliberately stays out of the way for adjacent-but-different work: web/React
dashboards, matplotlib/PNG charts, terminal *theme* config, stripping ANSI from
logs, or full interactive TUIs (those want `textual`/`bubbletea`).

## Using it

There's nothing to install or wire up by hand. Ask your agent to build a
terminal tool — or just to print some results nicely — and when the skill
triggers it **copies the renderer** (`termstyle.py` or `termstyle.ts`, whichever
matches your language) into your project and builds on its primitives. That
vendoring is deliberate: the resulting tool stays self-contained and
dependency-free, with no `pip install` and no runtime reliance on the skill
being present. You don't touch the renderer yourself unless you want to.

It ships in two ports that print the **same** demo report, so you can preview the
aesthetic before building anything:

```bash
python .agents/skills/terminal-report/scripts/termstyle.py     # Python 3.x
node   .agents/skills/terminal-report/scripts/termstyle.ts      # Node 23+ / Bun
```

Color auto-disables when stdout isn't a terminal (piped, redirected, or
`NO_COLOR` set), so it never leaves escape codes in a `.csv` or CI log.

## The vocabulary

| Element | Helper | Use for |
|---|---|---|
| Channel tag | `tag("run", msg, color=cyan)` | progress lines: `[run]  fitting model …` |
| Section header | `header("Title", "subtitle")` | bold title + muted subtitle + rule |
| Aligned table | `table([Col("x"), Col("name","l")], rows)` | the core data grid |
| Magnitude bar | `hbar(v, vmax, width, color)` | progress, %, single positive value |
| Diverging bar | `diverging(v, vmax, half)` | deltas / returns / effects centered on zero |
| Trend | `sparkline(values)` | a compact inline series |
| Semantic color | `muted/red/green/amber/cyan/bold/dim` | encode meaning |
| Continuum color | `scale(v, lo, hi)` → styling fn | green→amber→red by where `v` falls |

The composition trick: `table()` and `pad()` measure visible width with ANSI
codes stripped, so you color a cell *before* putting it in a table and the
columns still line up.

## Design principles (what separates a dashboard from colored noise)

- **Color carries meaning, not decoration.** If you can't say what a color
  encodes, make it `muted`.
- **Dim the scaffolding.** Labels, units, rules, and secondary columns stay
  muted so the eye lands on the data.
- **Right-align numbers, left-align text.** Decimal points line up; columns stay
  scannable.
- **Chunk into sections** with a header + rule and a blank line above.
- **Degrade gracefully** — honor `NO_COLOR` / non-TTY; clamp widths to
  `term_width()`.

## Going deeper

- `.agents/skills/terminal-report/SKILL.md` — the full skill (principles +
  workflow + the API in detail).
- `.agents/skills/terminal-report/references/ansi.md` — ANSI/SGR cheat sheet,
  the 256-color palette, the diverging-bar math, terminal-safety rules, and how
  to port the primitives to Go / Rust / raw JS.
- `.agents/skills/terminal-report/evals/RESULTS.md` — how the skill's triggering
  was measured (and the gotcha that the standard harness hits for an
  already-installed skill).

See [examples/finterm-13f.md](examples/finterm-13f.md) for a full tool built on
top of it.

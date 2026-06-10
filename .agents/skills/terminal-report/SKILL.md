---
name: terminal-report
description: >
  Produce beautiful, structured terminal output for a CLI or analysis tool —
  ANSI colors, aligned data tables, inline bar charts, diverging/centered bars,
  tagged progress logs, sparklines, and section headers. Use this skill whenever
  you are building a command-line tool, analysis script, report generator, data
  dashboard, or status/progress display that prints to a terminal, OR whenever
  the user wants output to look "polished", "colored", "styled", "like a
  dashboard", or shows a screenshot of a pretty terminal and asks how to make
  one. Applies even when the user just says "print the results nicely" or "make
  a little CLI for this" without naming colors or charts explicitly.
---

# Terminal Report

A "pretty terminal dashboard" is not a special agent feature or chat formatting —
it is just **the stdout of a program you write**. Three ingredients produce the
whole look:

1. **ANSI escape codes** for color and weight.
2. **A monospace grid** — fixed-width columns aligned with padding.
3. **Unicode block characters** (`█ ▏▎▍▌▋▊▉`, `│`, `─`) for bars, axes, and rules.

This skill gives you a ready-made renderer plus the design principles to use it
well. Don't reinvent ANSI handling per script — start from the bundled module.

## Start here: the bundled renderer

Two zero-dependency, stdlib-only ports implement every primitive below — pick
the one matching the target tool's language. **Run either to see the target
aesthetic** (both print the same demo report):

```bash
python scripts/termstyle.py          # Python (3.x)
node scripts/termstyle.ts            # TypeScript — Node 23+ (or: bun scripts/termstyle.ts)
```

Then either **copy the file into the project** (e.g. `src/<pkg>/termstyle.py`,
or `src/termstyle.ts`) or import it directly. Copying is usually right for a
self-contained CLI: it keeps the tool dependency-free and lets you trim unused
helpers. Adapt it freely — it's a starting point, not a library to preserve.
The two ports share the same API (snake_case in Python, camelCase in TS:
`term_width`→`termWidth`, `visible_len`→`visibleLen`).

If the target tool is **neither Python nor JS/TS**, read `references/ansi.md` —
the same primitives are a few lines in any language, and it lists the idiomatic
library per ecosystem (lipgloss, crossterm, etc.).

## Design principles

These are what separate a real dashboard from colored noise. Apply them whether
you use the bundled module or write raw codes.

- **Color carries meaning, not decoration.** A number's color should tell the
  reader *what it means* — high vs low, good vs bad, which log channel. If you
  can't say what a color encodes, make it `muted` instead. Reserve saturated
  red/green for the data that matters; everything else is grayscale scaffolding.
- **Dim the scaffolding.** Labels, units, headers, rules, secondary columns, and
  axes should be `muted`/`faint` so the eye lands on the data. High data-ink
  ratio: most of the bright pixels should be the numbers and bars, not chrome.
- **Right-align numbers, left-align text.** Right alignment lines up decimal
  points and magnitudes so columns are scannable; widths come from the data, not
  guesses.
- **Chunk into sections.** A bold header + muted subtitle + a faint rule, with a
  blank line above, turns a wall of output into scannable blocks.
- **Degrade gracefully.** The same program runs in a pipe, a CI log, and a
  redirected file. Color must vanish cleanly there (see below) — never leave raw
  `\033[` bytes in a `.csv` or a log aggregator.

## The vocabulary (termstyle API)

| Element | Helper | Use for |
|---|---|---|
| Channel tag | `tag("run", msg, color=cyan)` | progress lines: `[run]  fitting model …` |
| Section header | `header("Title", "subtitle")` | bold title + muted subtitle + rule |
| Horizontal rule | `rule()` | a faint full-width divider |
| Aligned table | `table([Col("x"), Col("name","l")], rows)` | the core data grid |
| Magnitude bar | `hbar(v, vmax, width, color)` | progress, %, single positive value (sub-cell smooth) |
| Diverging bar | `diverging(v, vmax, half)` | deltas/z-scores/effects centered on zero |
| Trend | `sparkline(values)` | a compact inline series |
| Semantic color | `muted/faint/red/green/amber/cyan/bold/dim` | categorical meaning |
| Continuum color | `scale(v, lo, hi)` → styling fn | green→amber→red by where `v` falls |

Key composition trick: **`table()` and `pad()` measure visible width with ANSI
codes stripped**, so you color cells *before* putting them in the table and
alignment still works:

```python
from termstyle import table, Col, scale, muted, bold, diverging

rows = []
for name, n, effect in people:
    color = scale(effect, lo=-3, hi=6)          # pick color by value
    rows.append([
        bold(name),
        muted(str(n)),
        color(f"{effect:+.2f}"),                 # colored cell, still aligns
        diverging(effect, vmax=6, half=10),      # inline chart in a column
    ])

print(table([Col("attendee", "l"), Col("n"), Col("effect"), Col("")], rows))
```

## A typical report's shape

Most analysis CLIs follow the same arc — mirror it:

1. **Ingest log** — one `tag(...)` line per input loaded or step started, so the
   user sees progress and can spot where a slow/failed step is.
   `[load] file.csv → 9,677 rows`, `[run] fitting model …`
2. **Section per result** — `header(...)`, then a blank line, then a `table(...)`.
   Put the most important, sorted column first.
3. **Inline charts inside tables** — a `diverging`/`hbar` column makes magnitudes
   visible without a separate plot.
4. **Footer** — a final `tag("done", …, color=green)` noting artifacts written
   (`wrote scores.csv`). Side effects belong in the output, not a mystery.

## Graceful degradation (don't skip this)

`termstyle` already does the right thing: color is **off** when stdout is not a
TTY, or when `NO_COLOR` is set, and forced **on** with `FORCE_COLOR=1`. When you
write raw codes yourself, replicate this gate:

```python
import os, sys
USE_COLOR = bool(os.environ.get("FORCE_COLOR")) or (
    sys.stdout.isatty() and os.environ.get("NO_COLOR") is None
)
```

Why it matters: piping into `grep`/`less`, capturing in CI, or redirecting to a
file must yield clean text. Honor [NO_COLOR](https://no-color.org) — it's a small
convention users rely on. For width, read `term_width()` and clamp bar widths to
it rather than hard-coding 80.

## When NOT to hand-roll: reach for a TUI library

The bundled approach is perfect for **fire-and-forget reports** — print, done.
Switch tools when the job is different:

- **Live-updating displays** (progress bars that redraw, a refreshing table):
  use `rich` (`rich.live`, `rich.progress`) — it handles cursor movement and
  redraws you don't want to manage by hand.
- **Full interactive apps** (panes, key handling, scrolling, mouse): use
  `textual` (Python) or `bubbletea`/`lipgloss` (Go). These are application
  frameworks, not print helpers.
- **Heavy Markdown/syntax rendering in the terminal:** `rich` again.

For static, columnar, "run it and read the result" output — the case in most
analysis scripts — the bundled module is lighter and gives you exact control
over the grid. Don't pull in a framework you won't use.

## References

- `references/ansi.md` — ANSI/SGR cheat sheet, the 256-color palette, Unicode
  block characters, the diverging-bar math, terminal-safety rules, and how to
  port these primitives to JavaScript, Go, and Rust.

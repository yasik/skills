# ANSI, Unicode & Porting Reference

Everything `termstyle.py` does, expressed as raw primitives — so you can debug
it, extend it, or rebuild it in another language. Read the section you need.

## Contents

- [SGR escape codes](#sgr-escape-codes) — color and text weight
- [The 256-color palette](#the-256-color-palette) — choosing tasteful colors
- [Unicode building blocks](#unicode-building-blocks) — bars, rules, axes
- [Bar math](#bar-math) — sub-cell bars and diverging/centered bars
- [Terminal safety](#terminal-safety) — TTY detection, NO_COLOR, width
- [Porting to other languages](#porting-to-other-languages) — JS, Go, Rust

---

## SGR escape codes

Styling is done with **SGR** (Select Graphic Rendition) sequences. The shape is:

```
ESC [ <params> m          where ESC is the byte 0x1B, written "\033" or "\x1b"
```

A sequence sets state; `\033[0m` resets all of it. Always reset after styled
text or the color bleeds into everything that follows.

| Effect | Code | Example |
|---|---|---|
| Reset all | `0` | `\033[0m` |
| Bold | `1` | `\033[1mTitle\033[0m` |
| Dim / faint | `2` | `\033[2mfootnote\033[0m` |
| Italic | `3` | (not universal) |
| Underline | `4` | |
| Foreground, 16-color | `30–37`, `90–97` | `\033[31m` red, `\033[91m` bright red |
| Background, 16-color | `40–47`, `100–107` | `\033[41m` red bg |
| Foreground, 256-color | `38;5;N` | `\033[38;5;167mN=167\033[0m` |
| Background, 256-color | `48;5;N` | |
| Foreground, truecolor | `38;2;R;G;B` | `\033[38;2;255;128;0m` |

Combine with `;`: `\033[1;38;5;167m` is bold + color 167. Prefer **256-color**
(`38;5;N`) for portability — truecolor (24-bit) is widely but not universally
supported, and the 256 palette is plenty for data viz.

## The 256-color palette

The 256-color cube has muted, desaturated entries that read well on dark
backgrounds — exactly what you want for data (saturated primaries look like a
toy). The palette `termstyle` uses, and why:

| Role | Code | Note |
|---|---|---|
| muted (secondary text) | `245` | mid-gray; labels, units, non-key columns |
| faint (rules/axes) | `240` | dark gray; structure you should barely notice |
| red (high / bad) | `167` | soft red for text; `203` brighter, for bar fills |
| green (low / good) | `108` | soft green for text; `114` brighter, for bar fills |
| amber (medium) | `179` | caution / mid-range |
| cyan (info channel) | `80` | the `[run]` log channel |
| blue (alt channel) | `110` | a second log/info channel |

Text vs fill: bar **fills** use slightly brighter variants (`203`/`114`) so the
chart sits visually above the muted text around it, while inline **numbers** use
the calmer `167`/`108`. Keep the set this small — more colors means less meaning
per color.

To explore the cube: `for i in $(seq 0 255); do printf "\033[38;5;${i}m%3d " $i; done; echo`

## Unicode building blocks

All monospace, all single-column width (the eighth-blocks included):

| Glyphs | Name | Use |
|---|---|---|
| `█ ▉ ▊ ▋ ▌ ▍ ▎ ▏` | left eighth blocks | horizontal bars with sub-cell precision |
| `▁ ▂ ▃ ▄ ▅ ▆ ▇ █` | lower eighth blocks | sparklines / vertical micro-bars |
| `─ │ ┼ ├ ┤ ┬ ┴` | box-drawing light | rules, axes, simple frames |
| `═ ║ ╔ ╗ ╚ ╝` | box-drawing double | heavier frames (use sparingly) |
| `· • ◦ ▪ ▸ ▾` | dots/markers | bullets, list markers, expand/collapse |

The eighth-block sets are the trick behind smooth bars: a bar of width *w* can
represent *8w* distinct levels, not just *w*.

## Bar math

### Sub-cell horizontal bar (fills left→right)

```
cells   = clamp(value / vmax, 0, 1) * width      # fractional number of cells
full    = floor(cells)                            # solid cells
rem     = cells - full                            # leftover fraction in [0,1)
bar     = "█" * full
if full < width and rem > 0:
    bar += " ▏▎▍▌▋▊▉█"[round(rem * 8)]            # one partial cell
bar = bar.ljust(width)                            # pad so later columns align
```

Pad to `width` with spaces *before* applying color, so the visible width is
constant regardless of value — that keeps any column after the bar aligned.

### Diverging / centered bar (grows out from a zero axis)

Used for signed quantities (deltas, z-scores, model effects). Two half-width
fields around a center axis glyph (`│`):

```
n = round(clamp(abs(value)/vmax, 0, 1) * half)    # whole cells, crisp both sides
if value >= 0:                                     # grows right
    left  = " " * half
    right = "█"*n + " "*(half - n)
else:                                              # grows left, hugging axis
    left  = " "*(half - n) + "█"*n
    right = " " * half
out = left + axis + right
```

Whole cells (not eighths) keep both sides symmetric and sharp; the axis glyph is
`faint` so the data reads above it. Color the left side green, the right red (or
flip, depending on which direction is "good").

## Terminal safety

A program's output goes to terminals, pipes, files, and CI logs. Styling that's
great in a terminal is garbage in a `.csv`. Gate every escape code:

```python
import os, sys
USE_COLOR = bool(os.environ.get("FORCE_COLOR")) or (
    sys.stdout.isatty() and os.environ.get("NO_COLOR") is None
)
```

- **`isatty()` false** → output is redirected/piped; emit plain text.
- **`NO_COLOR` set** (any value) → user opted out globally; honor it.
  See https://no-color.org.
- **`FORCE_COLOR` set** → user wants color even through a pipe (e.g. into
  `less -R`); override the TTY check.
- **Width**: `shutil.get_terminal_size((80, 24)).columns`. Clamp bar/rule widths
  to it; never assume 80. In a pipe this returns the fallback, which is fine.

When color is off, the styling functions must return the **plain string**, not
an empty string — you still want the text, just without the codes.

## Porting to other languages

The primitives are tiny everywhere. Use the idiomatic library when you want
the gate + palette handled for you; drop to raw codes when you want zero deps.

**JavaScript / TypeScript**
- Bundled: `scripts/termstyle.ts` (this skill) — a zero-dependency port of the
  Python module, runs directly under Node 23+ / Bun / Deno. Copy it in.
- Raw: `` `\x1b[38;5;167m${s}\x1b[0m` ``; gate on `process.stdout.isTTY` and
  `process.env.NO_COLOR`.
- Library: [`chalk`](https://github.com/chalk/chalk) (auto-detects color support
  and `NO_COLOR`), [`cli-table3`](https://github.com/cli-table/cli-table3) for
  grids, [`ink`](https://github.com/vadimdemedes/ink) for live React-style TUIs.

**Go**
- Raw: `fmt.Sprintf("\x1b[38;5;167m%s\x1b[0m", s)`.
- Library: [`lipgloss`](https://github.com/charmbracelet/lipgloss) for styled
  layout/tables, [`bubbletea`](https://github.com/charmbracelet/bubbletea) for
  full TUIs. These respect `NO_COLOR` and degrade by terminal capability.

**Rust**
- Library: [`owo-colors`](https://github.com/owo-colors/owo-colors) or
  [`crossterm`](https://github.com/crossterm-rs/crossterm) for styling,
  [`comfy-table`](https://github.com/Nukesor/comfy-table) for tables,
  [`ratatui`](https://github.com/ratatui-org/ratatui) for TUIs.

**Python**
- Raw: the bundled `termstyle.py`.
- Library: [`rich`](https://github.com/Textualize/rich) for live displays,
  Markdown, and progress; [`textual`](https://github.com/Textualize/textual) for
  interactive apps. See SKILL.md "When NOT to hand-roll" for which to pick.

The principles in SKILL.md (color = meaning, dim the scaffolding, right-align
numbers, degrade gracefully) are language-agnostic — only the syntax changes.

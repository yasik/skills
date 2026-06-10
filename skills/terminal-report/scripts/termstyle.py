#!/usr/bin/env python3
"""
termstyle — a tiny, zero-dependency toolkit for styled terminal output.

Everything you see in a "pretty CLI dashboard" is just a program's stdout:
ANSI escape codes for color, a monospace grid for alignment, and Unicode
block characters for bars. This module gives you those primitives with a
small, composable API so you don't reinvent them in every script.

Design choices worth knowing:
  - Color is OFF automatically when output is not a TTY, or when NO_COLOR is
    set (https://no-color.org). Set FORCE_COLOR=1 to override (e.g. piping
    into `less -R`). This keeps logs and CSVs clean.
  - Colors are semantic, not decorative: a number's color should tell you
    what it means (high/low, good/bad), not just look nice.
  - Width math ignores ANSI codes, so you can pass already-colored strings
    into `table()`/`pad()` and alignment still works.

Run `python termstyle.py` to see a demo report that exercises every helper.
Copy this file into your project (or import it) and build from these pieces.
"""

from __future__ import annotations

import os
import re
import shutil
import sys
from dataclasses import dataclass
from typing import Callable, Sequence

# --------------------------------------------------------------------------- #
# Color support detection
# --------------------------------------------------------------------------- #

def _color_enabled() -> bool:
    if os.environ.get("FORCE_COLOR"):
        return True
    if os.environ.get("NO_COLOR") is not None:
        return False
    return sys.stdout.isatty()


_ENABLED = _color_enabled()
_RESET = "\033[0m"
_ANSI_RE = re.compile(r"\033\[[0-9;]*m")


def set_enabled(value: bool) -> None:
    """Force color on/off at runtime (useful in tests or after redirecting)."""
    global _ENABLED
    _ENABLED = value


def _sgr(text: object, *codes: str) -> str:
    """Wrap text in SGR (Select Graphic Rendition) codes, if color is enabled."""
    if not _ENABLED or not codes:
        return str(text)
    return "".join(f"\033[{c}m" for c in codes) + str(text) + _RESET


# --------------------------------------------------------------------------- #
# Semantic palette (xterm-256 colors — tuned for dark terminals)
# --------------------------------------------------------------------------- #
# Keep the set small and meaningful. The job of color here is to encode
# meaning: muted = scaffolding you can ignore, red/green = direction of a
# value, cyan/amber = log channels. Reach for `scale()` when a number lives
# on a continuum rather than in a category.

def muted(s: object) -> str:  return _sgr(s, "38;5;245")   # secondary text, units, labels
def faint(s: object) -> str:  return _sgr(s, "38;5;240")   # rules, axes — barely there
def red(s: object) -> str:    return _sgr(s, "38;5;167")   # high / bad / over
def green(s: object) -> str:  return _sgr(s, "38;5;108")   # low / good / under
def amber(s: object) -> str:  return _sgr(s, "38;5;179")   # medium / caution
def cyan(s: object) -> str:   return _sgr(s, "38;5;80")    # info / "run" channel
def blue(s: object) -> str:   return _sgr(s, "38;5;110")   # alt channel
def bold(s: object) -> str:   return _sgr(s, "1")          # headers, key labels
def dim(s: object) -> str:    return _sgr(s, "2")          # de-emphasize

# Brighter fills for bars, so the chart reads above the muted text around it.
def red_fill(s: object) -> str:   return _sgr(s, "38;5;203")
def green_fill(s: object) -> str: return _sgr(s, "38;5;114")


def scale(value: float, lo: float, hi: float) -> Callable[[object], str]:
    """Pick a color for a value on a [lo, hi] continuum: green→amber→red.

    Returns a styling function so it composes:  scale(v, 0, 10)(f"{v:+.1f}").
    Use a reversed range (hi < lo) when low values are the "bad" ones.
    """
    if hi == lo:
        return muted
    t = (value - lo) / (hi - lo)
    t = max(0.0, min(1.0, t))
    if t < 0.33:
        return green
    if t < 0.66:
        return amber
    return red


# --------------------------------------------------------------------------- #
# Width-aware helpers (ANSI codes don't count toward visible width)
# --------------------------------------------------------------------------- #

def visible_len(s: object) -> int:
    """Length of a string as rendered, ignoring ANSI escape codes."""
    return len(_ANSI_RE.sub("", str(s)))


def term_width(default: int = 80) -> int:
    return shutil.get_terminal_size((default, 24)).columns


def pad(s: object, width: int, align: str = "l") -> str:
    """Pad a (possibly colored) string to `width` visible columns."""
    gap = max(0, width - visible_len(s))
    if align == "r":
        return " " * gap + str(s)
    if align == "c":
        left = gap // 2
        return " " * left + str(s) + " " * (gap - left)
    return str(s) + " " * gap


def truncate(s: object, width: int, ellipsis: str = "…") -> str:
    """Truncate to `width` visible columns (only safe on un-colored text)."""
    text = str(s)
    if visible_len(text) <= width:
        return text
    return text[: max(0, width - len(ellipsis))] + ellipsis


# --------------------------------------------------------------------------- #
# Structural elements: tagged log lines, headers, rules
# --------------------------------------------------------------------------- #

def tag(label: str, msg: object = "", color: Callable = cyan, field: int = 9) -> str:
    """A bracketed channel tag followed by a message: `[run]   fitting model`.

    `field` is the column the message starts in, so a stream of tags with
    different labels stays left-aligned and scannable.
    """
    bracketed = f"[{label}]"
    gap = max(1, field - len(bracketed))
    line = color(bracketed) + " " * gap
    return line + str(msg) if msg != "" else line


def header(title: str, subtitle: str = "", width: int | None = None) -> str:
    """A bold section title, optional muted subtitle, and an underline rule.

    The blank line above gives sections room to breathe — dense reports are
    easier to read when sections are visually chunked.
    """
    width = width or term_width()
    line = bold(title.upper())
    if subtitle:
        line += "   " + muted(subtitle)
    return f"\n{line}\n{rule(width)}"


def rule(width: int | None = None, char: str = "─") -> str:
    return faint(char * (width or term_width()))


# --------------------------------------------------------------------------- #
# Bars
# --------------------------------------------------------------------------- #

_EIGHTHS = " ▏▎▍▌▋▊▉█"  # sub-cell resolution: 0/8 .. 8/8 of a cell filled


def hbar(value: float, vmax: float, width: int = 20, color: Callable | None = None) -> str:
    """A left-to-right horizontal bar with sub-cell (1/8) precision.

    Padded with spaces to `width` so columns after it stay aligned. Great for
    progress, percentages, or any single non-negative magnitude.
    """
    if vmax <= 0:
        cells = 0.0
    else:
        cells = max(0.0, min(1.0, value / vmax)) * width
    full = int(cells)
    bar = "█" * full
    rem = cells - full
    if full < width and rem > 0:
        bar += _EIGHTHS[round(rem * 8)]
    bar = bar.ljust(width)
    return color(bar) if color else bar


def diverging(
    value: float,
    vmax: float,
    half: int = 12,
    neg: Callable = green_fill,
    pos: Callable = red_fill,
    axis: str = "│",
) -> str:
    """A bar that grows right for positive values and left for negative ones,
    anchored on a center axis. Ideal for deltas, z-scores, effects — anything
    centered on zero. Uses whole cells so both sides stay crisp.
    """
    n = 0 if vmax <= 0 else round(min(1.0, abs(value) / vmax) * half)
    if value >= 0:
        left = " " * half
        right = pos("█" * n) + " " * (half - n)
    else:
        left = " " * (half - n) + neg("█" * n)
        right = " " * half
    return f"{left}{faint(axis)}{right}"


_SPARKS = "▁▂▃▄▅▆▇█"


def sparkline(values: Sequence[float]) -> str:
    """A compact inline trend chart, one character per value."""
    nums = [v for v in values if v is not None]
    if not nums:
        return ""
    lo, hi = min(nums), max(nums)
    span = hi - lo or 1.0
    out = []
    for v in values:
        if v is None:
            out.append(" ")
        else:
            idx = round((v - lo) / span * (len(_SPARKS) - 1))
            out.append(_SPARKS[idx])
    return "".join(out)


# --------------------------------------------------------------------------- #
# Tables
# --------------------------------------------------------------------------- #

@dataclass
class Col:
    """A column spec for `table()`. `align` is 'l', 'r', or 'c'."""
    header: str
    align: str = "r"


def table(
    columns: Sequence[Col | str],
    rows: Sequence[Sequence[object]],
    gap: int = 2,
    header_style: Callable = muted,
) -> str:
    """Render an aligned table. Cells may already be colored — width math
    ignores ANSI codes, so alignment stays correct. Pass plain strings for
    columns to default to right-aligned; use Col(..., align=...) for control.

    Numbers read best right-aligned (decimal points line up); labels left.
    """
    cols = [c if isinstance(c, Col) else Col(c) for c in columns]
    n = len(cols)
    widths = [visible_len(c.header) for c in cols]
    for row in rows:
        for i in range(n):
            widths[i] = max(widths[i], visible_len(row[i]))
    sep = " " * gap

    out = [sep.join(pad(header_style(cols[i].header), widths[i], cols[i].align) for i in range(n))]
    for row in rows:
        out.append(sep.join(pad(row[i], widths[i], cols[i].align) for i in range(n)))
    return "\n".join(out)


# --------------------------------------------------------------------------- #
# Demo — run `python termstyle.py` to see the whole toolkit in action.
# --------------------------------------------------------------------------- #

def _demo() -> None:
    print()
    print(tag("load", "heart_rate.csv  →  9,677 samples", color=cyan))
    print(tag("cal", "calendar_events.json  →  18 meetings, 8 attendees", color=amber))
    print(tag("run", "scoring each meeting vs 90-min local baseline ...", color=cyan))
    print(tag("run", "fitting attendee model (ridge) ...", color=cyan))

    print(header("Meeting stress", "mean HR over surrounding baseline"))
    print()
    meetings = [
        ("standup", 11.3, 1.54, 0.57, "manager, ios_eng, eng_1, pm_growth"),
        ("roadmap review", 11.0, 1.65, 0.52, "manager, pm_growth, team_1, team_2"),
        ("sprint planning", 10.8, 1.47, 0.56, "manager, pm_growth, team_1"),
        ("1:1 pm_growth", 9.2, 1.53, 0.51, "manager, pm_growth, team_1"),
        ("design sync", 2.0, 0.15, 0.27, "ios_eng, senior_dev, eng_1"),
        ("eng retro", -0.9, -0.13, 0.03, "manager, senior_dev, eng_1"),
        ("1:1 senior_dev", -3.9, -0.58, 0.03, "senior_dev, manager"),
    ]
    rows = []
    for name, dbpm, z, elev, who in meetings:
        c = scale(dbpm, -4, 11)
        rows.append([
            c(f"{dbpm:+.1f}"),
            c(f"{z:.2f}"),
            muted(f"{round(elev * 100)}%"),
            name,
            muted(who),
        ])
    print(table(
        [Col("dbpm"), Col("z"), Col("elev"), Col("meeting", "l"), Col("attendees", "l")],
        rows,
    ))

    print(header("Per-person", "ranked by ridge marginal effect (bpm)"))
    print()
    people = [
        ("pm_growth", 9, 9.15, 5.47, "high", "prime suspect"),
        ("team_1", 3, 7.54, 2.16, "med", "mild stressor"),
        ("eng_1", 10, -1.99, 1.30, "high", "slightly raises HR"),
        ("manager", 14, 1.97, 0.30, "high", "neutral"),
        ("eng_2", 7, -3.16, -1.08, "high", "calming"),
        ("senior_dev", 9, -7.52, -3.20, "high", "calming"),
    ]
    vmax = max(abs(r[3]) for r in people)
    rows = []
    for name, n, naive, ridge, rel, note in people:
        rc = scale(ridge, -3.2, 5.5)
        rows.append([
            bold(name),
            muted(str(n)),
            f"{naive:+.2f}",
            rc(f"{ridge:+.2f}"),
            muted(rel),
            diverging(ridge, vmax, half=10),
            muted(note),
        ])
    print(table(
        [Col("attendee", "l"), Col("n"), Col("naive"), Col("ridge"),
         Col("rel", "l"), Col("calming   0   stress", "c"), Col("", "l")],
        rows,
    ))

    print()
    print(tag("done", muted("wrote meeting_scores.csv, person_scores.csv"), color=green))
    print()


if __name__ == "__main__":
    _demo()

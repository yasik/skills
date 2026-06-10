/**
 * termstyle — a tiny, zero-dependency toolkit for styled terminal output.
 *
 * The TypeScript companion to termstyle.py. Same idea, same API: a pretty CLI
 * dashboard is just a program's stdout — ANSI codes for color, a monospace grid
 * for alignment, and Unicode block characters for bars.
 *
 * Zero dependencies (Node/Bun stdlib only). Written in erasable TypeScript, so
 * it runs directly under Node 23+ (`node termstyle.ts`), Bun (`bun termstyle.ts`),
 * Deno, or transpiled by any bundler/tsc. Copy it into your project or import it.
 *
 * Behavior worth knowing:
 *   - Color is OFF when stdout is not a TTY, or when NO_COLOR is set
 *     (https://no-color.org). FORCE_COLOR=1 overrides. Keeps logs and CSVs clean.
 *   - Color is semantic, not decorative: a value's color should say what it means.
 *   - Width math ignores ANSI codes, so you can color cells before putting them
 *     in `table()`/`pad()` and alignment still works.
 *
 * Run it (`node termstyle.ts`) to see a demo report that exercises every helper.
 */

// --------------------------------------------------------------------------- //
// Color support detection
// --------------------------------------------------------------------------- //

function colorEnabled(): boolean {
  if (process.env.FORCE_COLOR) return true;
  if (process.env.NO_COLOR !== undefined) return false;
  return Boolean(process.stdout && process.stdout.isTTY);
}

let ENABLED = colorEnabled();
const RESET = "\x1b[0m";
const ANSI_RE = /\x1b\[[0-9;]*m/g;

/** Force color on/off at runtime (useful in tests or after redirecting). */
export function setEnabled(value: boolean): void {
  ENABLED = value;
}

/** Wrap text in SGR (Select Graphic Rendition) codes, if color is enabled. */
function sgr(text: unknown, ...codes: string[]): string {
  const s = String(text);
  if (!ENABLED || codes.length === 0) return s;
  return codes.map((c) => `\x1b[${c}m`).join("") + s + RESET;
}

// --------------------------------------------------------------------------- //
// Semantic palette (xterm-256 colors — tuned for dark terminals)
// --------------------------------------------------------------------------- //
// Keep the set small and meaningful. Color encodes meaning here: muted =
// scaffolding you can ignore, red/green = direction of a value, cyan/amber =
// log channels. Use `scale()` when a number lives on a continuum.

export const muted = (s: unknown) => sgr(s, "38;5;245"); // secondary text, units, labels
export const faint = (s: unknown) => sgr(s, "38;5;240"); // rules, axes — barely there
export const red = (s: unknown) => sgr(s, "38;5;167"); //   high / bad / over
export const green = (s: unknown) => sgr(s, "38;5;108"); // low / good / under
export const amber = (s: unknown) => sgr(s, "38;5;179"); // medium / caution
export const cyan = (s: unknown) => sgr(s, "38;5;80"); //   info / "run" channel
export const blue = (s: unknown) => sgr(s, "38;5;110"); //  alt channel
export const bold = (s: unknown) => sgr(s, "1"); //          headers, key labels
export const dim = (s: unknown) => sgr(s, "2"); //           de-emphasize

// Brighter fills for bars, so the chart reads above the muted text around it.
export const redFill = (s: unknown) => sgr(s, "38;5;203");
export const greenFill = (s: unknown) => sgr(s, "38;5;114");

export type Styler = (s: unknown) => string;

/**
 * Pick a color for a value on a [lo, hi] continuum: green→amber→red.
 * Returns a styling function so it composes: scale(v, 0, 10)(v.toFixed(1)).
 * Use a reversed range (hi < lo) when low values are the "bad" ones.
 */
export function scale(value: number, lo: number, hi: number): Styler {
  if (hi === lo) return muted;
  let t = (value - lo) / (hi - lo);
  t = Math.max(0, Math.min(1, t));
  if (t < 0.33) return green;
  if (t < 0.66) return amber;
  return red;
}

// --------------------------------------------------------------------------- //
// Width-aware helpers (ANSI codes don't count toward visible width)
// --------------------------------------------------------------------------- //

/** Length of a string as rendered, ignoring ANSI escape codes. */
export function visibleLen(s: unknown): number {
  return String(s).replace(ANSI_RE, "").length;
}

export function termWidth(fallback = 80): number {
  return (process.stdout && process.stdout.columns) || fallback;
}

/** Pad a (possibly colored) string to `width` visible columns. */
export function pad(s: unknown, width: number, align: "l" | "r" | "c" = "l"): string {
  const str = String(s);
  const gap = Math.max(0, width - visibleLen(str));
  if (align === "r") return " ".repeat(gap) + str;
  if (align === "c") {
    const left = Math.floor(gap / 2);
    return " ".repeat(left) + str + " ".repeat(gap - left);
  }
  return str + " ".repeat(gap);
}

/** Truncate to `width` visible columns (only safe on un-colored text). */
export function truncate(s: unknown, width: number, ellipsis = "…"): string {
  const str = String(s);
  if (visibleLen(str) <= width) return str;
  return str.slice(0, Math.max(0, width - ellipsis.length)) + ellipsis;
}

// --------------------------------------------------------------------------- //
// Structural elements: tagged log lines, headers, rules
// --------------------------------------------------------------------------- //

/**
 * A bracketed channel tag followed by a message: `[run]   fitting model`.
 * `field` is the column the message starts in, so a stream of tags with
 * different labels stays left-aligned and scannable.
 */
export function tag(label: string, msg: unknown = "", color: Styler = cyan, field = 9): string {
  const bracketed = `[${label}]`;
  const gap = Math.max(1, field - bracketed.length);
  const line = color(bracketed) + " ".repeat(gap);
  return msg !== "" ? line + String(msg) : line;
}

export function rule(width?: number, char = "─"): string {
  return faint(char.repeat(width ?? termWidth()));
}

/**
 * A bold section title, optional muted subtitle, and an underline rule.
 * The leading blank line gives sections room to breathe.
 */
export function header(title: string, subtitle = "", width?: number): string {
  let line = bold(title.toUpperCase());
  if (subtitle) line += "   " + muted(subtitle);
  return `\n${line}\n${rule(width ?? termWidth())}`;
}

// --------------------------------------------------------------------------- //
// Bars
// --------------------------------------------------------------------------- //

const EIGHTHS = " ▏▎▍▌▋▊▉█"; // sub-cell resolution: 0/8 .. 8/8 of a cell filled

/**
 * A left-to-right horizontal bar with sub-cell (1/8) precision, padded with
 * spaces to `width` so later columns stay aligned. Good for progress, %, or any
 * single non-negative magnitude.
 */
export function hbar(value: number, vmax: number, width = 20, color?: Styler): string {
  const cells = vmax <= 0 ? 0 : Math.max(0, Math.min(1, value / vmax)) * width;
  const full = Math.floor(cells);
  let bar = "█".repeat(full);
  const rem = cells - full;
  if (full < width && rem > 0) bar += EIGHTHS[Math.round(rem * 8)];
  bar = bar + " ".repeat(Math.max(0, width - visibleLen(bar)));
  return color ? color(bar) : bar;
}

/**
 * A bar that grows right for positive values and left for negative ones,
 * anchored on a center axis. Ideal for deltas, z-scores, effects — anything
 * centered on zero. Uses whole cells so both sides stay crisp.
 */
export function diverging(
  value: number,
  vmax: number,
  half = 12,
  neg: Styler = greenFill,
  pos: Styler = redFill,
  axis = "│",
): string {
  const n = vmax <= 0 ? 0 : Math.round(Math.min(1, Math.abs(value) / vmax) * half);
  if (value >= 0) {
    const right = pos("█".repeat(n)) + " ".repeat(half - n);
    return `${" ".repeat(half)}${faint(axis)}${right}`;
  }
  const left = " ".repeat(half - n) + neg("█".repeat(n));
  return `${left}${faint(axis)}${" ".repeat(half)}`;
}

const SPARKS = "▁▂▃▄▅▆▇█";

/** A compact inline trend chart, one character per value. */
export function sparkline(values: Array<number | null>): string {
  const nums = values.filter((v): v is number => v !== null);
  if (nums.length === 0) return "";
  const lo = Math.min(...nums);
  const hi = Math.max(...nums);
  const span = hi - lo || 1;
  return values
    .map((v) => (v === null ? " " : SPARKS[Math.round(((v - lo) / span) * (SPARKS.length - 1))]))
    .join("");
}

// --------------------------------------------------------------------------- //
// Tables
// --------------------------------------------------------------------------- //

/** A column spec for `table()`. `align` is 'l', 'r', or 'c'. */
export interface Col {
  header: string;
  align?: "l" | "r" | "c";
}

/**
 * Render an aligned table. Cells may already be colored — width math ignores
 * ANSI codes, so alignment stays correct. Pass plain strings for columns to
 * default to right-aligned. Numbers read best right-aligned; labels left.
 */
export function table(
  columns: Array<Col | string>,
  rows: Array<Array<string | number>>,
  opts: { gap?: number; headerStyle?: Styler } = {},
): string {
  const gap = opts.gap ?? 2;
  const headerStyle = opts.headerStyle ?? muted;
  const cols: Col[] = columns.map((c) => (typeof c === "string" ? { header: c, align: "r" } : { align: "r", ...c }));
  const n = cols.length;
  const widths = cols.map((c) => visibleLen(c.header));
  for (const row of rows) {
    for (let i = 0; i < n; i++) widths[i] = Math.max(widths[i], visibleLen(row[i]));
  }
  const sep = " ".repeat(gap);
  const out: string[] = [
    cols.map((c, i) => pad(headerStyle(c.header), widths[i], c.align)).join(sep),
  ];
  for (const row of rows) {
    out.push(cols.map((c, i) => pad(row[i], widths[i], c.align)).join(sep));
  }
  return out.join("\n");
}

// --------------------------------------------------------------------------- //
// Demo — run `node termstyle.ts` (or `bun termstyle.ts`) to see it all.
// --------------------------------------------------------------------------- //

function demo(): void {
  console.log();
  console.log(tag("load", "heart_rate.csv  →  9,677 samples", cyan));
  console.log(tag("cal", "calendar_events.json  →  18 meetings, 8 attendees", amber));
  console.log(tag("run", "scoring each meeting vs 90-min local baseline ...", cyan));
  console.log(tag("run", "fitting attendee model (ridge) ...", cyan));

  console.log(header("Meeting stress", "mean HR over surrounding baseline"));
  console.log();
  const meetings: Array<[string, number, number, number, string]> = [
    ["standup", 11.3, 1.54, 0.57, "manager, ios_eng, eng_1, pm_growth"],
    ["roadmap review", 11.0, 1.65, 0.52, "manager, pm_growth, team_1, team_2"],
    ["sprint planning", 10.8, 1.47, 0.56, "manager, pm_growth, team_1"],
    ["1:1 pm_growth", 9.2, 1.53, 0.51, "manager, pm_growth, team_1"],
    ["design sync", 2.0, 0.15, 0.27, "ios_eng, senior_dev, eng_1"],
    ["eng retro", -0.9, -0.13, 0.03, "manager, senior_dev, eng_1"],
    ["1:1 senior_dev", -3.9, -0.58, 0.03, "senior_dev, manager"],
  ];
  const mRows = meetings.map(([name, dbpm, z, elev, who]) => {
    const c = scale(dbpm, -4, 11);
    return [
      c((dbpm >= 0 ? "+" : "") + dbpm.toFixed(1)),
      c(z.toFixed(2)),
      muted(`${Math.round(elev * 100)}%`),
      name,
      muted(who),
    ];
  });
  console.log(
    table(
      [{ header: "dbpm" }, { header: "z" }, { header: "elev" }, { header: "meeting", align: "l" }, { header: "attendees", align: "l" }],
      mRows,
    ),
  );

  console.log(header("Per-person", "ranked by ridge marginal effect (bpm)"));
  console.log();
  const people: Array<[string, number, number, number, string, string]> = [
    ["pm_growth", 9, 9.15, 5.47, "high", "prime suspect"],
    ["team_1", 3, 7.54, 2.16, "med", "mild stressor"],
    ["eng_1", 10, -1.99, 1.3, "high", "slightly raises HR"],
    ["manager", 14, 1.97, 0.3, "high", "neutral"],
    ["eng_2", 7, -3.16, -1.08, "high", "calming"],
    ["senior_dev", 9, -7.52, -3.2, "high", "calming"],
  ];
  const vmax = Math.max(...people.map((p) => Math.abs(p[3])));
  const pRows = people.map(([name, nn, naive, ridge, rel, note]) => {
    const rc = scale(ridge, -3.2, 5.5);
    const fmt = (x: number) => (x >= 0 ? "+" : "") + x.toFixed(2);
    return [
      bold(name),
      muted(String(nn)),
      fmt(naive),
      rc(fmt(ridge)),
      muted(rel),
      diverging(ridge, vmax, 10),
      muted(note),
    ];
  });
  console.log(
    table(
      [
        { header: "attendee", align: "l" },
        { header: "n" },
        { header: "naive" },
        { header: "ridge" },
        { header: "rel", align: "l" },
        { header: "calming   0   stress", align: "c" },
        { header: "", align: "l" },
      ],
      pRows,
    ),
  );

  console.log();
  console.log(tag("done", muted("wrote meeting_scores.csv, person_scores.csv"), green));
  console.log();
}

// Run the demo only when executed directly (Node 24+ / Bun set import.meta.main).
if ((import.meta as unknown as { main?: boolean }).main) {
  demo();
}

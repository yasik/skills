---
name: mermaid-render
description: >
  Render a Mermaid diagram as a beautiful, optionally animated SVG (and PNG) in a
  calm editorial style, instead of stock Mermaid output. Supports flowchart,
  stateDiagram, and sequenceDiagram. Use whenever the user wants to render, draw,
  beautify, restyle, or "make nice" a Mermaid / flowchart / sequence / state
  diagram, add animated data-flow to a diagram, or turn a described process or
  architecture into a polished diagram for a doc, README, or slide. All styling —
  colors, fonts, shapes, borders, animation — is configurable in one theme file.
---

# Mermaid Render — Mermaid → styled, animated diagrams

Render Mermaid diagrams as polished SVGs (and high-resolution PNGs) in a calm,
editorial house style — instead of stock Mermaid output. Connections can carry a
subtle animated "data packet" that shows flow direction.

Use **mermaid-render** whenever you'd otherwise reach for stock Mermaid and want
the editorial look, role-coded nodes, optional flow animation, and full control
over styling via one config file.

## Supported diagram types

- **flowchart** — `graph`/`flowchart TD|LR|BT|RL`; node shapes, edge labels,
  `subgraph` clusters, `:::class` styling, `&` fan-out.
- **stateDiagram** — `stateDiagram` / `stateDiagram-v2`; `[*]` start/end markers,
  labelled transitions, `state "x" as id`, composite states.
- **sequenceDiagram** — participants/actors, messages (sync/async/reply),
  activations, notes, and `loop`/`alt`/`opt`/`par`/`critical` fragments.

Type is auto-detected from the source. See `references/syntax-support.md` for the
exact supported subset and limitations.

## Styling is role-coded, and fully configurable

All styling lives in **`config.ts`** (the `theme` object): colors, fonts, node
shapes, borders, the `variants` map, edges/arrows/labels, layout spacing, the
sequence/state/cluster styling, and the animation knobs. Nothing is hard-coded in
the renderers. To reskin: edit `config.ts`, or copy it and pass `--config path`.

Nodes pick a style by **class name**. Assign one in Mermaid with `:::name` (or
`class A,B name`). The shipped theme defines these classes:

| class | look | use for |
|-------|------|---------|
| `default` | thin ink outline | ordinary nodes |
| `entry` | soft grey outline | external inputs |
| `hub` | solid ink, light text | orchestrators / buses |
| `accent` | solid rust, light text | outputs / results |
| `human` | rust outline | human-in-the-loop |
| `temp` | dashed outline | temporary / ephemeral |

Unknown class names fall back to `default`. Add your own classes in `config.ts`.

## Animation

On by default: each edge/message carries a slow accent packet, plus a static
port dot. It is **progressive enhancement** — the diagram reads fully when
static, honours `prefers-reduced-motion`, and the PNG fallback hides the moving
packets. Disable entirely with `--no-anim`, or set `animation.enabled: false` in
the config.

## Workflow

### Step 1 — get the Mermaid source

Use a `.mmd`/`.md` file, or pass it inline with `--code`. If the user gives a
description rather than Mermaid, write the Mermaid first (add `:::class`
annotations to style key nodes — see the table above).

### Step 2 — render the SVG

```bash
bun run scripts/render.ts --input diagram.mmd --output diagram
# or inline:
bun run scripts/render.ts --code "graph TD; A-->B" --output diagram
# static (no motion):
bun run scripts/render.ts -i diagram.mmd -o diagram --no-anim
# custom theme:
bun run scripts/render.ts -i diagram.mmd -o diagram --config ./my-theme.ts
```

Runtimes: `bun run …`, `npx tsx …`. Produces `diagram.svg`. `@dagrejs/dagre`
(the layout engine, also used by Mermaid) auto-installs on first run.

The **SVG is the primary deliverable** — it is animated, scalable, and small.
For documents, reference the `.svg`.

### Step 3 — (optional) high-resolution PNG

Needs the `agent-browser` skill. Load it before capturing.

```bash
bun run scripts/create-html.ts --svg diagram.svg --output diagram.html --scale 2
agent-browser set viewport 2400 1400
agent-browser open "file://$(pwd)/diagram.html"
agent-browser wait 700
agent-browser screenshot ".container" diagram.png
agent-browser close
```

The wrapper hides the moving packets so the PNG is a clean static frame (pass
`--animated` to keep them). Increase `--scale` for crisper output on dense
diagrams.

### Step 4 — clean up

Remove intermediates (`diagram.html`, any temporary `.mmd`). Keep only the final
`.svg` (and `.png` if requested).

## Options (render.ts)

| flag | meaning |
|------|---------|
| `-i, --input <file>` | Mermaid source file |
| `-c, --code <str>` | Mermaid source inline |
| `-o, --output <name>` | output base name → `<name>.svg` |
| `--config <file>` | custom theme module (exports `theme`) |
| `--type <t>` | force `flowchart` \| `state` \| `sequence` |
| `--no-anim` | static SVG (no packets) |

## Dependencies

- **bun** or **npx tsx** to run the scripts.
- **@dagrejs/dagre** — auto-installed on first render (flowchart/state only).
- **agent-browser** skill — only for the optional PNG capture.

## Troubleshooting

- **A node looks unstyled** — its `:::class` name has no entry in
  `config.ts > variants`; add it, or use one of the built-in classes.
- **Wrong diagram type detected** — pass `--type`.
- **Boxes too tight/loose around text** — the width heuristic assumes a
  monospace font; tune `font.charWidth` / `node.padX` in `config.ts`.
- **Shapes** — flowchart shapes (`{}`, `()`, `([])`, …) are normalised to the
  house panel; `state` `[*]` renders as start dot / final ring. This is by design
  for a consistent look.

See `examples/` for ready-to-render `flowchart.mmd`, `state.mmd`, `sequence.mmd`.

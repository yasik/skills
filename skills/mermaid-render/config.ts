// config.ts — the single source of styling for mermaid-render.
//
// Copy this file, edit the values, and pass `--config path/to/your-config.ts`
// to render.ts to reskin every diagram. Nothing in the renderers is hard-coded.

export type VariantStyle = {
  fill: string; // box fill
  border: string; // box border colour
  title: string; // title text colour
  sub: string; // subtitle text colour
  dash?: string; // border stroke-dasharray (omit = solid)
};

export type Theme = {
  font: {
    family: string;
    titleSize: number;
    subSize: number;
    titleWeight: number | string;
    charWidth: number; // avg glyph advance as a fraction of font size (box-sizing heuristic)
  };
  colors: {
    paper: string; // background
    ink: string; // primary text / strong fill
    accent: string; // the "data" colour — dots, packets, accent nodes
    line: string; // connectors / lifelines
    arrow: string; // arrowheads
    subtle: string; // secondary text on paper
    inverseDim: string; // secondary text on solid (inverted) nodes
    entryBorder: string; // softer border for "entry" nodes
    label: string; // edge-label text
  };
  node: {
    radius: number;
    borderWidth: number;
    padX: number; // horizontal padding added to measured text width
    minWidth: number;
    heightOneLine: number;
    heightTwoLine: number;
    titleDyOneLine: number;
    titleDyTwoLine: number;
    subDyTwoLine: number;
  };
  // Node styles keyed by class name. "default" is required. Reference any other
  // from Mermaid with `:::name` or `class X name`. Names that have no entry here
  // fall back to "default".
  variants: Record<string, VariantStyle>;
  edge: {
    width: number;
    cornerRadius: number; // rounding at polyline bends
    arrow: { width: number; height: number; refX: number };
    label: { size: number; padX: number; height: number; radius: number; charWidth: number };
  };
  layout: {
    rankDir: "TB" | "LR" | "BT" | "RL"; // default direction when the diagram doesn't specify
    rankSep: number;
    nodeSep: number;
    edgeSep: number;
    marginX: number;
    marginY: number;
  };
  animation: {
    enabled: boolean; // master switch (also overridable per-render via --no-anim / --anim)
    portDot: number; // static source-dot radius
    packetCore: number; // travelling packet radius
    packetHalo: number; // soft halo radius
    haloOpacity: number;
    speed: number; // px/second — duration = pathLength / speed
    minDur: number;
    maxDur: number;
    stagger: number; // seconds between successive packets
    staggerCount: number; // stagger cycles modulo this many
  };
  // Subgraph / composite-state containers.
  cluster: {
    fill: string;
    border: string;
    dash: string;
    radius: number;
    padding: number; // inner padding around children
    labelSize: number;
    labelColor: string;
  };
  // State-diagram start/end markers.
  state: {
    initialR: number; // filled start dot
    finalOuterR: number;
    finalInnerR: number;
    markFill: string;
  };
  // Sequence-diagram styling.
  sequence: {
    actorVariant: string; // which `variants` entry to use for participant heads
    lifeline: { color: string; width: number; dash: string };
    message: { width: number; labelSize: number };
    activation: { fill: string; border: string; width: number };
    note: { fill: string; border: string; text: string; size: number };
    fragment: { border: string; labelFill: string; labelText: string; labelSize: number; titleColor: string };
    gapX: number; // horizontal gap between participants (added to head widths)
    minGapX: number; // minimum centre-to-centre participant distance
    gapY: number; // vertical gap between messages
    headTop: number; // y of participant heads
    firstMsgGap: number; // gap from heads to first message
    selfMsgWidth: number; // width of self-message loop
    bottomPad: number;
  };
};

// ---- palette anchors (change here to recolour everything) ----
const paper = "#F8F8F1"; // base white
const ink = "#242B2D"; // base black
const accent = "#A84B2F"; // rust / terracotta accent
const subtle = "#6e7372";
const inverseDim = "#D2D3CE";
const entryBorder = "#9a9e9b";
const line = "#B4B6B2";

export const theme: Theme = {
  font: {
    family: "'SF Mono', 'JetBrains Mono', 'Menlo', 'DejaVu Sans Mono', 'Consolas', monospace",
    titleSize: 14,
    subSize: 11,
    titleWeight: 600,
    charWidth: 0.605,
  },
  colors: {
    paper,
    ink,
    accent,
    line,
    arrow: "#9aa09c",
    subtle,
    inverseDim,
    entryBorder,
    label: "#5f6463",
  },
  node: {
    radius: 9,
    borderWidth: 1,
    padX: 34,
    minWidth: 122,
    heightOneLine: 44,
    heightTwoLine: 60,
    titleDyOneLine: 4.8,
    titleDyTwoLine: -3,
    subDyTwoLine: 14,
  },
  variants: {
    default: { fill: paper, border: ink, title: ink, sub: subtle },
    entry: { fill: paper, border: entryBorder, title: ink, sub: subtle },
    hub: { fill: ink, border: ink, title: paper, sub: inverseDim },
    accent: { fill: accent, border: accent, title: paper, sub: inverseDim },
    human: { fill: paper, border: accent, title: accent, sub: subtle },
    temp: { fill: paper, border: ink, title: ink, sub: subtle, dash: "3.5 3" },
  },
  edge: {
    width: 1,
    cornerRadius: 10,
    arrow: { width: 8.5, height: 8, refX: 6 },
    label: { size: 10.5, padX: 16, height: 20, radius: 4, charWidth: 6.2 },
  },
  layout: {
    rankDir: "TB",
    rankSep: 58,
    nodeSep: 26,
    edgeSep: 14,
    marginX: 46,
    marginY: 42,
  },
  animation: {
    enabled: true,
    portDot: 2.4,
    packetCore: 2.8,
    packetHalo: 5,
    haloOpacity: 0.12,
    speed: 130,
    minDur: 2.6,
    maxDur: 4.2,
    stagger: 0.5,
    staggerCount: 6,
  },
  cluster: {
    fill: "none",
    border: entryBorder,
    dash: "2 4",
    radius: 12,
    padding: 22,
    labelSize: 11,
    labelColor: subtle,
  },
  state: {
    initialR: 7,
    finalOuterR: 9,
    finalInnerR: 4.5,
    markFill: ink,
  },
  sequence: {
    actorVariant: "hub",
    lifeline: { color: line, width: 1, dash: "3 4" },
    message: { width: 1.2, labelSize: 11 },
    activation: { fill: paper, border: ink, width: 9 },
    note: { fill: "#efe9dc", border: entryBorder, text: "#5f6463", size: 11 },
    fragment: { border: entryBorder, labelFill: ink, labelText: paper, labelSize: 10, titleColor: subtle },
    gapX: 70,
    minGapX: 150,
    gapY: 46,
    headTop: 40,
    firstMsgGap: 44,
    selfMsgWidth: 44,
    bottomPad: 30,
  },
};

export default theme;

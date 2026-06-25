// shared.ts — geometry + SVG building blocks shared by both renderers.
import type { Theme } from "../../config";

// ---- graph model (flowcharts + state diagrams reduce to this) ----
export type GNode = {
  id: string;
  title: string;
  subtitle?: string;
  variant?: string; // class name -> theme.variants
  shape?: "box" | "dot" | "ring"; // box = house panel; dot/ring = state start/end
  parent?: string; // enclosing cluster id
};
export type GEdge = { from: string; to: string; label?: string };
export type Cluster = { id: string; title?: string; parent?: string };
export type Graph = {
  rankDir: "TB" | "LR" | "BT" | "RL";
  nodes: GNode[];
  edges: GEdge[];
  clusters?: Cluster[];
};

export type Pt = { x: number; y: number };

// ---- text / number helpers ----
export const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export const r2 = (n: number) => Math.round(n * 100) / 100;

// Decode the HTML entities Mermaid allows in labels (numeric + a few named).
const NAMED: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  hellip: "…", mdash: "—", ndash: "–", times: "×", rarr: "→", larr: "←",
  hyphen: "-", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”",
};
export function decodeEntities(s: string): string {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z]+);/gi, (m, n) => NAMED[n.toLowerCase()] ?? m);
}

// Split a label on <br> / \n into [title, ...subtitleLines]; decodes entities.
export function splitLabel(raw: string): { title: string; subtitle?: string } {
  const parts = decodeEntities(raw)
    .replace(/<br\s*\/?>/gi, "\n")
    .split(/\\n|\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  if (parts.length === 0) return { title: "" };
  return { title: parts[0], subtitle: parts.slice(1).join(" ") || undefined };
}

// ---- path geometry ----
export function roundedPath(pts: Pt[], r: number): string {
  if (pts.length < 2) return "";
  if (pts.length === 2) return `M ${r2(pts[0].x)} ${r2(pts[0].y)} L ${r2(pts[1].x)} ${r2(pts[1].y)}`;
  let d = `M ${r2(pts[0].x)} ${r2(pts[0].y)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const p0 = pts[i - 1], p1 = pts[i], p2 = pts[i + 1];
    const l1 = Math.hypot(p1.x - p0.x, p1.y - p0.y) || 1;
    const l2 = Math.hypot(p2.x - p1.x, p2.y - p1.y) || 1;
    const d1 = Math.min(r, l1 / 2), d2 = Math.min(r, l2 / 2);
    const a = { x: p1.x + ((p0.x - p1.x) / l1) * d1, y: p1.y + ((p0.y - p1.y) / l1) * d1 };
    const b = { x: p1.x + ((p2.x - p1.x) / l2) * d2, y: p1.y + ((p2.y - p1.y) / l2) * d2 };
    d += ` L ${r2(a.x)} ${r2(a.y)} Q ${r2(p1.x)} ${r2(p1.y)} ${r2(b.x)} ${r2(b.y)}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${r2(last.x)} ${r2(last.y)}`;
  return d;
}

export function pathLen(pts: Pt[]): number {
  let s = 0;
  for (let i = 1; i < pts.length; i++) s += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  return s;
}

// ---- shared SVG fragments ----

// Static rust "port" dot a little way along an edge, from its source.
export function portDot(pts: Pt[], t: Theme): string {
  const p0 = pts[0], p1 = pts[1] ?? pts[pts.length - 1];
  const seg = Math.hypot(p1.x - p0.x, p1.y - p0.y) || 1;
  const off = Math.min(12, seg * 0.45);
  const x = r2(p0.x + ((p1.x - p0.x) / seg) * off);
  const y = r2(p0.y + ((p1.y - p0.y) / seg) * off);
  return `<circle cx="${x}" cy="${y}" r="${t.animation.portDot}" fill="${t.colors.accent}"/>`;
}

// A travelling "data packet" that loops along a path (progressive enhancement).
export function packet(d: string, len: number, index: number, t: Theme): string {
  const a = t.animation;
  if (!a.enabled || !d) return "";
  const dur = r2(Math.min(a.maxDur, Math.max(a.minDur, len / a.speed)));
  const begin = `${r2((index % a.staggerCount) * a.stagger)}s`;
  return (
    `<g class="flow" opacity="0">` +
    `<circle r="${a.packetHalo}" fill="${t.colors.accent}" opacity="${a.haloOpacity}"/>` +
    `<circle r="${a.packetCore}" fill="${t.colors.accent}"/>` +
    `<animateMotion dur="${dur}s" begin="${begin}" repeatCount="indefinite" rotate="0" path="${d}"/>` +
    `<animate attributeName="opacity" dur="${dur}s" begin="${begin}" repeatCount="indefinite" values="0;1;1;0" keyTimes="0;0.12;0.86;1"/>` +
    `</g>`
  );
}

export function arrowMarker(t: Theme): string {
  const ar = t.edge.arrow;
  const tipY = r2(ar.height * 0.375), baseY = r2(ar.height * 0.75);
  return `<marker id="arr" markerWidth="${ar.width}" markerHeight="${ar.height}" refX="${ar.refX}" refY="${tipY}" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L${ar.refX},${tipY} L0,${baseY} Z" fill="${t.colors.arrow}"/></marker>`;
}

// Wrap rendered layers into a full SVG document.
export function svgDoc(width: number, height: number, layers: string, t: Theme, extraDefs = ""): string {
  const W = Math.ceil(width), H = Math.ceil(height);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" font-family="${t.font.family}">
<defs>
  ${arrowMarker(t)}${extraDefs}
  <style>@media (prefers-reduced-motion: reduce){ .flow{ display:none; } }</style>
</defs>
<rect x="0" y="0" width="${W}" height="${H}" fill="${t.colors.paper}"/>
${layers}
</svg>`;
}

// Estimate the rendered width of a string at a given font size (monospace-ish).
export function textWidth(s: string, fontSize: number, t: Theme): number {
  return s.length * t.font.charWidth * fontSize;
}

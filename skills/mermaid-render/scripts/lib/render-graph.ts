// render-graph.ts — dagre layout + styled SVG for flowcharts and state diagrams.
import type { Theme } from "../../config";
import type { Graph, GNode, Pt } from "./shared";
import { esc, r2, roundedPath, pathLen, portDot, packet, svgDoc } from "./shared";

type Dagre = any;

function nodeSize(n: GNode, t: Theme): { w: number; h: number } {
  if (n.shape === "dot") {
    const d = t.state.initialR * 2 + 6;
    return { w: d, h: d };
  }
  if (n.shape === "ring") {
    const d = t.state.finalOuterR * 2 + 6;
    return { w: d, h: d };
  }
  const cw = t.font.charWidth;
  const tw = n.title.length * cw * t.font.titleSize;
  const sw = (n.subtitle?.length ?? 0) * cw * t.font.subSize;
  let w = Math.max(tw, sw) + t.node.padX;
  w = Math.max(w, t.node.minWidth);
  const h = n.subtitle ? t.node.heightTwoLine : t.node.heightOneLine;
  return { w: Math.round(w), h };
}

export function renderGraph(graph: Graph, t: Theme, opts: { animate: boolean }, dagre: Dagre): string {
  const anim = { ...t.animation, enabled: t.animation.enabled && opts.animate };
  const L = t.layout;
  const g = new dagre.graphlib.Graph({ multigraph: false, compound: true });
  g.setGraph({
    rankdir: graph.rankDir || L.rankDir,
    ranksep: L.rankSep,
    nodesep: L.nodeSep,
    edgesep: L.edgeSep,
    marginx: L.marginX,
    marginy: L.marginY,
  });
  g.setDefaultEdgeLabel(() => ({}));

  const clusterIds = new Set((graph.clusters ?? []).map((c) => c.id));
  for (const c of graph.clusters ?? []) g.setNode(c.id, { label: c.title ?? "" });

  const sizes = new Map<string, { w: number; h: number }>();
  for (const n of graph.nodes) {
    const s = nodeSize(n, t);
    sizes.set(n.id, s);
    g.setNode(n.id, { width: s.w, height: s.h });
    if (n.parent && clusterIds.has(n.parent)) g.setParent(n.id, n.parent);
  }
  for (const c of graph.clusters ?? []) {
    if (c.parent && clusterIds.has(c.parent)) g.setParent(c.id, c.parent);
  }
  for (const e of graph.edges) {
    const lbl = e.label
      ? { width: e.label.length * t.edge.label.charWidth + t.edge.label.padX, height: t.edge.label.height, labelpos: "c" as const }
      : {};
    g.setEdge(e.from, e.to, lbl);
  }

  dagre.layout(g);
  const gw = g.graph().width ?? 100;
  const gh = g.graph().height ?? 100;

  let clusterSvg = "", edgeSvg = "", dotSvg = "", labelSvg = "", nodeSvg = "";

  // clusters (background)
  for (const c of graph.clusters ?? []) {
    const cd = g.node(c.id) as any;
    if (!cd) continue;
    const x = r2(cd.x - cd.width / 2), y = r2(cd.y - cd.height / 2);
    const cl = t.cluster;
    clusterSvg += `<rect x="${x}" y="${y}" width="${r2(cd.width)}" height="${r2(cd.height)}" rx="${cl.radius}" fill="${cl.fill}" stroke="${cl.border}" stroke-width="1" stroke-dasharray="${cl.dash}"/>`;
    if (c.title) {
      clusterSvg += `<text x="${r2(x + 12)}" y="${r2(y - 6)}" font-family="${t.font.family}" font-size="${cl.labelSize}" letter-spacing="1.2" fill="${cl.labelColor}">${esc(c.title.toUpperCase())}</text>`;
    }
  }

  // edges
  graph.edges.forEach((e, i) => {
    const ed = g.edge(e.from, e.to) as any;
    if (!ed) return;
    const pts: Pt[] = ed.points;
    const d = roundedPath(pts, t.edge.cornerRadius);
    edgeSvg += `<path d="${d}" fill="none" stroke="${t.colors.line}" stroke-width="${t.edge.width}" marker-end="url(#arr)"/>`;
    dotSvg += portDot(pts, t);
    dotSvg += packet(d, pathLen(pts), i, { ...t, animation: anim });

    if (e.label && ed.x != null && ed.y != null) {
      const lc = t.edge.label;
      const tw = e.label.length * lc.charWidth + lc.padX;
      labelSvg += `<g transform="translate(${r2(ed.x)} ${r2(ed.y)})">` +
        `<rect x="${r2(-tw / 2)}" y="${r2(-lc.height / 2)}" width="${r2(tw)}" height="${lc.height}" rx="${lc.radius}" fill="${t.colors.paper}"/>` +
        `<text x="0" y="${r2(lc.height * 0.18)}" text-anchor="middle" font-family="${t.font.family}" font-size="${lc.size}" letter-spacing="0.2" fill="${t.colors.label}">${esc(e.label)}</text>` +
        `</g>`;
    }
  });

  // nodes
  const nz = t.node, f = t.font, c = t.colors;
  for (const n of graph.nodes) {
    const nd = g.node(n.id) as any;
    if (!nd) continue;
    const cx = r2(nd.x), cy = r2(nd.y);
    if (n.shape === "dot") {
      nodeSvg += `<circle cx="${cx}" cy="${cy}" r="${t.state.initialR}" fill="${t.state.markFill}"/>`;
      continue;
    }
    if (n.shape === "ring") {
      nodeSvg += `<circle cx="${cx}" cy="${cy}" r="${t.state.finalOuterR}" fill="none" stroke="${t.state.markFill}" stroke-width="1.4"/><circle cx="${cx}" cy="${cy}" r="${t.state.finalInnerR}" fill="${t.state.markFill}"/>`;
      continue;
    }
    const s = sizes.get(n.id)!;
    const x = r2(nd.x - s.w / 2), y = r2(nd.y - s.h / 2);
    const st = t.variants[n.variant ?? "default"] ?? t.variants.default;
    const dash = st.dash ? ` stroke-dasharray="${st.dash}"` : "";
    nodeSvg += `<rect x="${x}" y="${y}" width="${s.w}" height="${s.h}" rx="${nz.radius}" fill="${st.fill}" stroke="${st.border}" stroke-width="${nz.borderWidth}"${dash}/>`;
    if (n.subtitle) {
      nodeSvg += `<text x="${cx}" y="${r2(cy + nz.titleDyTwoLine)}" text-anchor="middle" font-family="${f.family}" font-size="${f.titleSize}" font-weight="${f.titleWeight}" fill="${st.title}">${esc(n.title)}</text>`;
      nodeSvg += `<text x="${cx}" y="${r2(cy + nz.subDyTwoLine)}" text-anchor="middle" font-family="${f.family}" font-size="${f.subSize}" fill="${st.sub}">${esc(n.subtitle)}</text>`;
    } else {
      nodeSvg += `<text x="${cx}" y="${r2(cy + nz.titleDyOneLine)}" text-anchor="middle" font-family="${f.family}" font-size="${f.titleSize}" font-weight="${f.titleWeight}" fill="${st.title}">${esc(n.title)}</text>`;
    }
  }

  const layers = `<g>${clusterSvg}</g>\n<g>${edgeSvg}</g>\n<g>${dotSvg}</g>\n<g>${labelSvg}</g>\n<g>${nodeSvg}</g>`;
  return svgDoc(gw, gh, layers, t);
}

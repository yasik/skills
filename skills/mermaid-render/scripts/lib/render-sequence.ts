// render-sequence.ts — timeline layout + styled SVG for sequence diagrams.
import type { Theme } from "../../config";
import { esc, r2, packet, svgDoc, textWidth } from "./shared";
import type { SeqModel, SeqEvent } from "./parse-sequence";

export function renderSequence(model: SeqModel, t: Theme, opts: { animate: boolean }): string {
  const s = t.sequence;
  const f = t.font;
  const c = t.colors;
  const anim = { ...t, animation: { ...t.animation, enabled: t.animation.enabled && opts.animate } };
  const parts = model.participants;
  if (parts.length === 0) return svgDoc(200, 80, "", t);

  const idx = new Map(parts.map((p, i) => [p.id, i]));
  const headH = t.node.heightOneLine;
  const headTop = s.headTop;
  const headBottom = headTop + headH;

  // participant head widths + centres
  const w = parts.map((p) => Math.max(textWidth(p.label, f.titleSize, t) + t.node.padX, 110));
  const cx: number[] = [];
  for (let i = 0; i < parts.length; i++) {
    if (i === 0) cx[i] = t.layout.marginX + w[i] / 2;
    else cx[i] = cx[i - 1] + Math.max(s.minGapX, w[i - 1] / 2 + w[i] / 2 + s.gapX);
  }
  const centerOf = (id: string) => cx[idx.get(id) ?? 0];
  let maxX = cx[parts.length - 1] + w[parts.length - 1] / 2;

  // ---- vertical pass ----
  type Msg = { from: string; to: string; text: string; y: number; self: boolean; arrow: SeqEvent extends any ? any : any };
  const msgs: any[] = [];
  const notes: any[] = [];
  const actBars: { id: string; y0: number; y1: number; level: number }[] = [];
  type Frag = { type: string; label: string; topY: number; bottomY?: number; dividers: { y: number; label: string }[]; span: Set<string> };
  const fragStack: Frag[] = [];
  const fragments: Frag[] = [];
  const actStack = new Map<string, { y0: number; level: number }[]>();
  const actLevel = new Map<string, number>();

  const touch = (id: string) => fragStack.forEach((fr) => fr.span.add(id));
  const startAct = (id: string, y: number) => {
    const lvl = actLevel.get(id) ?? 0;
    (actStack.get(id) ?? actStack.set(id, []).get(id)!).push({ y0: y, level: lvl });
    actLevel.set(id, lvl + 1);
  };
  const endAct = (id: string, y: number) => {
    const st = actStack.get(id);
    if (st && st.length) {
      const a = st.pop()!;
      actLevel.set(id, Math.max(0, (actLevel.get(id) ?? 1) - 1));
      actBars.push({ id, y0: a.y0, y1: y, level: a.level });
    }
  };

  let y = headBottom + s.firstMsgGap;
  for (const ev of model.events) {
    if (ev.kind === "msg") {
      const self = ev.from === ev.to;
      touch(ev.from); touch(ev.to);
      msgs.push({ ...ev, y, self });
      if (ev.activate) startAct(ev.to, y);
      if (ev.deactivate) endAct(ev.from, y);
      y += self ? s.gapY * 1.6 : s.gapY;
    } else if (ev.kind === "note") {
      ev.parts.forEach(touch);
      const tw = textWidth(ev.text, s.note.size, t) + 24;
      let nx: number, nw: number;
      if (ev.placement === "over") {
        const cs = ev.parts.map(centerOf);
        const lo = Math.min(...cs), hi = Math.max(...cs);
        nw = Math.max(tw, hi - lo + 44);
        nx = (lo + hi) / 2 - nw / 2;
      } else if (ev.placement === "left") {
        nw = tw; nx = centerOf(ev.parts[0]) - 14 - nw;
      } else {
        nw = tw; nx = centerOf(ev.parts[0]) + 14;
      }
      notes.push({ text: ev.text, x: nx, y, w: nw, h: 32 });
      maxX = Math.max(maxX, nx + nw);
      y += 32 + 14;
    } else if (ev.kind === "activate") startAct(ev.id, y);
    else if (ev.kind === "deactivate") endAct(ev.id, y);
    else if (ev.kind === "frag-open") {
      fragStack.push({ type: ev.type, label: ev.label, topY: y, dividers: [], span: new Set() });
      y += 30;
    } else if (ev.kind === "frag-else") {
      const fr = fragStack[fragStack.length - 1];
      if (fr) fr.dividers.push({ y, label: ev.label });
      y += 22;
    } else if (ev.kind === "frag-close") {
      const fr = fragStack.pop();
      if (fr) { fr.bottomY = y + 4; fragments.push(fr); y += 16; }
    }
  }
  // close danglers
  const bottomLine = y;
  for (const [id, st] of actStack) for (const a of st) actBars.push({ id, y0: a.y0, y1: bottomLine, level: a.level });
  while (fragStack.length) { const fr = fragStack.pop()!; fr.bottomY = bottomLine; fragments.push(fr); }

  const H = bottomLine + s.bottomPad;
  const W = maxX + t.layout.marginX;

  // ---- render layers ----
  const actW = s.activation.width;
  const activeAt = (id: string, yy: number) => actBars.some((b) => b.id === id && yy >= b.y0 - 1 && yy <= b.y1 + 1);

  // lifelines
  let lifelines = "";
  for (let i = 0; i < parts.length; i++) {
    lifelines += `<line x1="${r2(cx[i])}" y1="${headBottom}" x2="${r2(cx[i])}" y2="${r2(H - 12)}" stroke="${s.lifeline.color}" stroke-width="${s.lifeline.width}" stroke-dasharray="${s.lifeline.dash}"/>`;
  }

  // fragment frames — rects/dividers go behind; the labels go in a top layer
  let fragFrameSvg = "", fragTagSvg = "";
  for (const fr of fragments) {
    const ids = fr.span.size ? [...fr.span] : parts.map((p) => p.id);
    const cs = ids.map(centerOf);
    const left = Math.max(8, Math.min(...cs) - 28);
    const right = Math.min(W - 8, Math.max(...cs) + 28);
    const top = fr.topY + 6;
    const bot = fr.bottomY!;
    fragFrameSvg += `<rect x="${r2(left)}" y="${r2(top)}" width="${r2(right - left)}" height="${r2(bot - top)}" rx="6" fill="none" stroke="${s.fragment.border}" stroke-width="1" stroke-dasharray="2 4"/>`;
    const tag = fr.type;
    const tagW = textWidth(tag, s.fragment.labelSize, t) + 14;
    fragTagSvg += `<path d="M ${r2(left)} ${r2(top)} h ${r2(tagW)} l -7 12 h ${r2(-(tagW - 7))} z" fill="${s.fragment.labelFill}"/>`;
    fragTagSvg += `<text x="${r2(left + 7)}" y="${r2(top + 9)}" font-family="${f.family}" font-size="${s.fragment.labelSize}" font-weight="600" fill="${s.fragment.labelText}">${esc(tag)}</text>`;
    if (fr.label) fragTagSvg += `<text x="${r2(left + tagW + 8)}" y="${r2(top + 11)}" font-family="${f.family}" font-size="${s.fragment.labelSize}" fill="${s.fragment.titleColor}">[${esc(fr.label)}]</text>`;
    for (const d of fr.dividers) {
      fragFrameSvg += `<line x1="${r2(left)}" y1="${r2(d.y)}" x2="${r2(right)}" y2="${r2(d.y)}" stroke="${s.fragment.border}" stroke-width="1" stroke-dasharray="2 4"/>`;
      if (d.label) fragTagSvg += `<text x="${r2(left + 8)}" y="${r2(d.y - 4)}" font-family="${f.family}" font-size="${s.fragment.labelSize}" fill="${s.fragment.titleColor}">[${esc(d.label)}]</text>`;
    }
  }

  // activation bars
  let actSvg = "";
  for (const b of actBars) {
    const x = centerOf(b.id) - actW / 2 + b.level * (actW * 0.7);
    actSvg += `<rect x="${r2(x)}" y="${r2(b.y0)}" width="${actW}" height="${r2(Math.max(6, b.y1 - b.y0))}" fill="${s.activation.fill}" stroke="${s.activation.border}" stroke-width="1"/>`;
  }

  // notes
  let noteSvg = "";
  for (const nt of notes) {
    noteSvg += `<rect x="${r2(nt.x)}" y="${r2(nt.y - nt.h / 2)}" width="${r2(nt.w)}" height="${nt.h}" rx="3" fill="${s.note.fill}" stroke="${s.note.border}" stroke-width="1"/>`;
    noteSvg += `<text x="${r2(nt.x + nt.w / 2)}" y="${r2(nt.y + 4)}" text-anchor="middle" font-family="${f.family}" font-size="${s.note.size}" fill="${s.note.text}">${esc(nt.text)}</text>`;
  }

  // messages
  let msgSvg = "", dotSvg = "";
  msgs.forEach((m, i) => {
    const dash = m.arrow.dashed ? ` stroke-dasharray="5 4"` : "";
    const marker = m.arrow.head === "cross" ? "scross" : m.arrow.head === "open" ? "sopen" : "sfill";
    if (m.self) {
      const x0 = centerOf(m.from) + (activeAt(m.from, m.y) ? actW / 2 : 0);
      const loopW = s.selfMsgWidth, loopH = s.gapY * 0.9;
      const d = `M ${r2(x0)} ${r2(m.y)} h ${loopW} v ${r2(loopH)} h ${-loopW}`;
      msgSvg += `<path d="${d}" fill="none" stroke="${c.line}" stroke-width="${s.message.width}"${dash} marker-end="url(#${marker})"/>`;
      if (m.text) msgSvg += `<text x="${r2(x0 + loopW + 8)}" y="${r2(m.y + loopH / 2 + 3)}" font-family="${f.family}" font-size="${s.message.labelSize}" fill="${c.subtle}">${esc(m.text)}</text>`;
      dotSvg += packet(d, loopW * 2 + loopH, i, anim);
      maxX = Math.max(maxX, x0 + loopW + textWidth(m.text, s.message.labelSize, t) + 12);
    } else {
      const dir = centerOf(m.to) >= centerOf(m.from) ? 1 : -1;
      const x1 = centerOf(m.from) + (activeAt(m.from, m.y) ? dir * actW / 2 : 0);
      const x2 = centerOf(m.to) - (activeAt(m.to, m.y) ? dir * actW / 2 : 0);
      const d = `M ${r2(x1)} ${r2(m.y)} L ${r2(x2)} ${r2(m.y)}`;
      msgSvg += `<path d="${d}" fill="none" stroke="${c.line}" stroke-width="${s.message.width}"${dash} marker-end="url(#${marker})"/>`;
      if (m.text) msgSvg += `<text x="${r2((x1 + x2) / 2)}" y="${r2(m.y - 7)}" text-anchor="middle" font-family="${f.family}" font-size="${s.message.labelSize}" fill="${c.subtle}">${esc(m.text)}</text>`;
      dotSvg += packet(d, Math.abs(x2 - x1), i, anim);
    }
  });

  // participant heads (on top)
  const hv = t.variants[s.actorVariant] ?? t.variants.default;
  let headSvg = "";
  for (let i = 0; i < parts.length; i++) {
    const x = cx[i] - w[i] / 2;
    headSvg += `<rect x="${r2(x)}" y="${headTop}" width="${r2(w[i])}" height="${headH}" rx="${t.node.radius}" fill="${hv.fill}" stroke="${hv.border}" stroke-width="${t.node.borderWidth}"/>`;
    headSvg += `<text x="${r2(cx[i])}" y="${r2(headTop + headH / 2 + t.node.titleDyOneLine)}" text-anchor="middle" font-family="${f.family}" font-size="${f.titleSize}" font-weight="${f.titleWeight}" fill="${hv.title}">${esc(parts[i].label)}</text>`;
  }

  const ink = c.ink;
  const extraDefs =
    `<marker id="sfill" markerWidth="9" markerHeight="8" refX="7" refY="3" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L7,3 L0,6 Z" fill="${ink}"/></marker>` +
    `<marker id="sopen" markerWidth="10" markerHeight="9" refX="7.5" refY="3.2" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L7.5,3.2 L0,6.4" fill="none" stroke="${ink}" stroke-width="1.1"/></marker>` +
    `<marker id="scross" markerWidth="9" markerHeight="9" refX="4.5" refY="4.5" orient="auto" markerUnits="userSpaceOnUse"><path d="M1,1 L8,8 M1,8 L8,1" stroke="${ink}" stroke-width="1.2"/></marker>`;

  // order: lifelines < frames < activation bars < notes < messages < heads < fragment tags (top)
  const layers = `<g>${lifelines}</g>\n<g>${fragFrameSvg}</g>\n<g>${actSvg}</g>\n<g>${noteSvg}</g>\n<g>${msgSvg}</g>\n<g>${dotSvg}</g>\n<g>${headSvg}</g>\n<g>${fragTagSvg}</g>`;
  return svgDoc(W, H, layers, t, extraDefs);
}

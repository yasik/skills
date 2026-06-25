// parse-sequence.ts — Mermaid sequenceDiagram subset -> ordered event model.
//
// Supported: participant/actor (with `as`), messages (->  -->  ->>  -->>  -x  --x  -)  --)),
// activation via activate/deactivate and +/- suffix, Note over|left of|right of,
// fragments loop/alt/opt/par/critical/break (+ else/and/option dividers) ... end,
// rect ... end (consumed, not drawn), %% comments. autonumber/links are ignored.
import { decodeEntities } from "./shared";

export type SeqParticipant = { id: string; label: string; actor: boolean };
export type SeqArrow = { dashed: boolean; head: "filled" | "open" | "cross" };
export type SeqEvent =
  | { kind: "msg"; from: string; to: string; text: string; arrow: SeqArrow; activate: boolean; deactivate: boolean }
  | { kind: "note"; placement: "over" | "left" | "right"; parts: string[]; text: string }
  | { kind: "activate"; id: string }
  | { kind: "deactivate"; id: string }
  | { kind: "frag-open"; type: string; label: string }
  | { kind: "frag-else"; label: string }
  | { kind: "frag-close" };
export type SeqModel = { participants: SeqParticipant[]; events: SeqEvent[] };

const MSG = /^([A-Za-z0-9_]+)\s*(--?(?:>>|>|\)|x))\s*([+-]?)\s*([A-Za-z0-9_]+)\s*:\s*(.*)$/;
const NOTE = /^note\s+(over|left of|right of)\s+([A-Za-z0-9_,\s]+?)\s*:\s*(.*)$/i;
const PART = /^(participant|actor)\s+([A-Za-z0-9_]+)(?:\s+as\s+(.+))?$/i;

function arrowOf(tok: string): SeqArrow {
  const dashed = tok.startsWith("--");
  const head: SeqArrow["head"] = tok.endsWith("x") ? "cross" : tok.endsWith(")") ? "open" : tok.endsWith(">>") ? "filled" : "open";
  return { dashed, head };
}

export function parseSequence(src: string): SeqModel {
  const participants: SeqParticipant[] = [];
  const byId = new Map<string, SeqParticipant>();
  const events: SeqEvent[] = [];
  const ensure = (id: string, label?: string, actor = false) => {
    let p = byId.get(id);
    if (!p) {
      p = { id, label: label ? decodeEntities(label) : id, actor };
      byId.set(id, p);
      participants.push(p);
    } else if (label) {
      p.label = decodeEntities(label);
    }
    return p;
  };

  for (const raw of src.split("\n")) {
    const line = raw.replace(/%%.*$/, "").trim();
    if (!line) continue;
    if (/^sequenceDiagram\b/i.test(line)) continue;
    if (/^(autonumber|title)\b/i.test(line)) continue;

    const pm = PART.exec(line);
    if (pm) { ensure(pm[2], pm[3], /actor/i.test(pm[1])); continue; }

    const note = NOTE.exec(line);
    if (note) {
      const parts = note[2].split(",").map((s) => s.trim()).filter(Boolean);
      parts.forEach((id) => ensure(id));
      const placement = note[1].toLowerCase().startsWith("over") ? "over" : note[1].toLowerCase().startsWith("left") ? "left" : "right";
      events.push({ kind: "note", placement, parts, text: decodeEntities(note[3]) });
      continue;
    }

    const am = /^(activate|deactivate)\s+([A-Za-z0-9_]+)$/i.exec(line);
    if (am) { ensure(am[2]); events.push({ kind: am[1].toLowerCase() as "activate" | "deactivate", id: am[2] }); continue; }

    if (/^(loop|alt|opt|par|critical|break|rect)\b/i.test(line)) {
      const m = /^(\w+)\s*(.*)$/.exec(line)!;
      events.push({ kind: "frag-open", type: m[1].toLowerCase(), label: decodeEntities(m[2] || "") });
      continue;
    }
    if (/^(else|and|option)\b/i.test(line)) {
      const m = /^(\w+)\s*(.*)$/.exec(line)!;
      events.push({ kind: "frag-else", label: decodeEntities(m[2] || "") });
      continue;
    }
    if (/^end\b/i.test(line)) { events.push({ kind: "frag-close" }); continue; }

    const mm = MSG.exec(line);
    if (mm) {
      ensure(mm[1]); ensure(mm[4]);
      events.push({
        kind: "msg",
        from: mm[1],
        to: mm[4],
        text: decodeEntities(mm[5] || ""),
        arrow: arrowOf(mm[2]),
        activate: mm[3] === "+",
        deactivate: mm[3] === "-",
      });
      continue;
    }
    // unknown line — ignore gracefully
  }

  return { participants, events };
}

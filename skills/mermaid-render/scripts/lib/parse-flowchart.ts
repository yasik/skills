// parse-flowchart.ts — a pragmatic parser for the common Mermaid flowchart subset.
//
// Supported: graph/flowchart TD|TB|LR|RL|BT; node shapes [] () ([]) [[]] [()] (()) {} {{}} >];
// edges --> --- -.-> ==> --x --o (and <--> ) with labels via -->|x| or -- x -->;
// chains A-->B-->C; fan-out with & ; :::class and `class a,b name`; subgraph ... end; %% comments.
// Everything maps to the house panel style; shape is recorded but normalised to a box.
import type { Graph, GNode, GEdge, Cluster } from "./shared";
import { splitLabel, decodeEntities } from "./shared";

type RankDir = Graph["rankDir"];

const SHAPES: [RegExp, GNode["shape"]][] = [
  [/^\(\[(.*?)\]\)/, "box"], // ([stadium])
  [/^\[\[(.*?)\]\]/, "box"], // [[subroutine]]
  [/^\[\((.*?)\)\]/, "box"], // [(cylinder)]
  [/^\(\((.*?)\)\)/, "box"], // ((circle))
  [/^\{\{(.*?)\}\}/, "box"], // {{hexagon}}
  [/^\{(.*?)\}/, "box"], // {rhombus}
  [/^\[(.*?)\]/, "box"], // [rect]
  [/^\((.*?)\)/, "box"], // (round)
  [/^>(.*?)\]/, "box"], // >flag]
];

const stripQuotes = (s: string) => s.replace(/^"(.*)"$/s, "$1").trim();

function dirOf(token: string): RankDir {
  const d = token.toUpperCase();
  if (d === "TD" || d === "TB") return "TB";
  if (d === "LR" || d === "RL" || d === "BT") return d as RankDir;
  return "TB";
}

type NodeTok = { id: string; label?: string; shape?: GNode["shape"]; cls?: string };

// Take one node reference (id + optional shape + optional :::class) from the start of s.
function takeNode(s: string): { tok: NodeTok; rest: string } | null {
  s = s.replace(/^\s+/, "");
  const idm = /^([A-Za-z0-9_]+)/.exec(s);
  if (!idm) return null;
  let rest = s.slice(idm[0].length);
  const tok: NodeTok = { id: idm[1] };
  for (const [re, shape] of SHAPES) {
    const m = re.exec(rest);
    if (m) {
      tok.label = stripQuotes(m[1] ?? "");
      tok.shape = shape;
      rest = rest.slice(m[0].length);
      break;
    }
  }
  const cm = /^:::([A-Za-z0-9_]+)/.exec(rest);
  if (cm) {
    tok.cls = cm[1];
    rest = rest.slice(cm[0].length);
  }
  return { tok, rest };
}

// Take a &-separated list of node refs (A & B & C).
function takeNodeList(s: string): { toks: NodeTok[]; rest: string } | null {
  const first = takeNode(s);
  if (!first) return null;
  const toks = [first.tok];
  let rest = first.rest;
  let m: RegExpExecArray | null;
  while ((m = /^\s*&\s*/.exec(rest))) {
    const next = takeNode(rest.slice(m[0].length));
    if (!next) break;
    toks.push(next.tok);
    rest = next.rest;
  }
  return { toks, rest };
}

// Take an edge connector (with optional label) from the start of s.
function takeConn(s: string): { label?: string; rest: string } | null {
  // inline label: -- text --> / -. text .-> / == text ==>
  let m = /^\s*[-.=]{2,}\s+(.+?)\s+[-.=]{1,}[>xo)]?\s*/.exec(s);
  if (m && /[-.=]/.test(s.slice(0, 2))) {
    // ensure this really is an inline-labelled connector (two dash runs)
    const inline = /^\s*([-.=]{2,})\s+(.+?)\s+([-.=]{1,}[>xo]?)\s*/.exec(s);
    if (inline) return { label: inline[2].trim(), rest: s.slice(inline[0].length) };
  }
  // plain / pipe-labelled: --> ---  -.->  ==>  --x  --o  <-->
  m = /^\s*<?[-.=]+[>xo]?\s*(?:\|([^|]*)\|)?\s*/.exec(s);
  if (m && m[0].trim().length) {
    return { label: m[1] != null ? m[1].trim() : undefined, rest: s.slice(m[0].length) };
  }
  return null;
}

export function parseFlowchart(src: string): Graph {
  const nodes = new Map<string, GNode>();
  const edges: GEdge[] = [];
  const clusters: Cluster[] = [];
  let rankDir: RankDir = "TB";

  const parentStack: string[] = [];
  let clusterSeq = 0;

  const upsert = (tok: NodeTok) => {
    let n = nodes.get(tok.id);
    if (!n) {
      n = { id: tok.id, title: tok.id, shape: "box" };
      nodes.set(tok.id, n);
    }
    // a node joins the subgraph it is mentioned inside (first one wins)
    if (parentStack.length && !n.parent) n.parent = parentStack[parentStack.length - 1];
    if (tok.label != null) {
      const { title, subtitle } = splitLabel(tok.label);
      n.title = title;
      n.subtitle = subtitle;
    }
    if (tok.shape) n.shape = tok.shape;
    if (tok.cls) n.variant = tok.cls;
    return n;
  };

  const rawLines = src.split("\n");
  let started = false;
  for (let raw of rawLines) {
    let line = raw.replace(/%%.*$/, "").trim(); // strip trailing comments
    if (!line || line.startsWith("%%")) continue;

    // header
    const hdr = /^(?:graph|flowchart)\s+([A-Za-z]{2})\b/.exec(line);
    if (hdr && !started) {
      rankDir = dirOf(hdr[1]);
      started = true;
      line = line.slice(hdr[0].length).trim();
      if (!line) continue;
    }
    started = true;

    if (/^subgraph\b/i.test(line)) {
      const m = /^subgraph\s+(?:([A-Za-z0-9_]+)\s*\[(.+)\]|"?(.+?)"?)\s*$/.exec(line);
      const id = m?.[1] ?? `__cluster${clusterSeq++}`;
      const title = stripQuotes(m?.[2] ?? m?.[3] ?? "");
      clusters.push({ id, title: title || undefined, parent: parentStack[parentStack.length - 1] });
      parentStack.push(id);
      continue;
    }
    if (/^end\b/i.test(line)) {
      parentStack.pop();
      continue;
    }
    if (/^direction\b/i.test(line)) continue;
    if (/^(classDef|style|linkStyle|click)\b/i.test(line)) continue;

    const cm = /^class\s+([A-Za-z0-9_,\s]+?)\s+([A-Za-z0-9_]+)\s*$/.exec(line);
    if (cm) {
      const ids = cm[1].split(",").map((s) => s.trim()).filter(Boolean);
      for (const id of ids) upsert({ id, cls: cm[2] });
      continue;
    }

    // edge / node statement (possibly a chain with & fan-out)
    let cur = takeNodeList(line);
    if (!cur) continue;
    cur.toks.forEach(upsert);
    let rest = cur.rest;
    let conn = takeConn(rest);
    while (conn) {
      const right = takeNodeList(conn.rest);
      if (!right) break;
      right.toks.forEach(upsert);
      const elabel = conn.label ? decodeEntities(conn.label) : undefined;
      for (const a of cur.toks) for (const b of right.toks) {
        edges.push({ from: a.id, to: b.id, label: elabel || undefined });
      }
      cur = right;
      rest = right.rest;
      conn = takeConn(rest);
    }
  }

  return { rankDir, nodes: [...nodes.values()], edges, clusters };
}

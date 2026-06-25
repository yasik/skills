// parse-state.ts — Mermaid stateDiagram / stateDiagram-v2 subset -> Graph.
//
// Supported: [*] initial/final markers, transitions `A --> B : label`,
// `state "desc" as id`, `id : description`, composite `state id { ... }`,
// `direction LR`, %% comments. Notes and concurrency dividers are skipped.
import type { Graph, GNode, GEdge, Cluster } from "./shared";
import { splitLabel, decodeEntities } from "./shared";

const stripQuotes = (s: string) => s.replace(/^"(.*)"$/s, "$1").trim();

export function parseState(src: string): Graph {
  const nodes = new Map<string, GNode>();
  const edges: GEdge[] = [];
  const clusters: Cluster[] = [];
  let rankDir: Graph["rankDir"] = "TB";

  const parentStack: string[] = [];
  const scope = () => parentStack[parentStack.length - 1] ?? "";

  const ensure = (id: string): GNode => {
    let n = nodes.get(id);
    if (!n) {
      n = { id, title: id, shape: "box" };
      nodes.set(id, n);
    }
    if (parentStack.length && !n.parent) n.parent = scope();
    return n;
  };
  // resolve [*] to a per-scope start/end marker node
  const marker = (kind: "start" | "end"): string => {
    const id = `__${kind}__${scope() || "root"}`;
    if (!nodes.has(id)) {
      const n: GNode = { id, title: "", shape: kind === "start" ? "dot" : "ring" };
      if (parentStack.length) n.parent = scope();
      nodes.set(id, n);
    }
    return id;
  };

  for (const raw of src.split("\n")) {
    const line = raw.replace(/%%.*$/, "").trim();
    if (!line) continue;
    if (/^stateDiagram(-v2)?\b/i.test(line)) continue;
    if (/^direction\s+(LR|RL|TB|BT|TD)/i.test(line)) {
      const d = RegExp.$1.toUpperCase();
      rankDir = d === "TD" ? "TB" : (d as Graph["rankDir"]);
      continue;
    }
    if (line === "--") continue; // concurrency divider (skip)
    if (/^note\b/i.test(line)) continue; // notes not rendered

    // composite state open:  state Name {
    const open = /^state\s+(?:"([^"]+)"\s+as\s+)?([A-Za-z0-9_]+)\s*\{$/.exec(line);
    if (open) {
      const id = open[2];
      clusters.push({ id, title: stripQuotes(open[1] ?? id), parent: parentStack.length ? scope() : undefined });
      parentStack.push(id);
      continue;
    }
    if (line === "}") {
      parentStack.pop();
      continue;
    }

    // alias:  state "Long description" as id
    const alias = /^state\s+"([^"]+)"\s+as\s+([A-Za-z0-9_]+)\s*$/.exec(line);
    if (alias) {
      const n = ensure(alias[2]);
      const { title, subtitle } = splitLabel(alias[1]);
      n.title = title;
      n.subtitle = subtitle;
      continue;
    }

    // transition:  A --> B [: label]
    if (line.includes("-->")) {
      const [lhs, rhsFull] = line.split("-->");
      const left = lhs.trim();
      const colon = rhsFull.indexOf(":");
      const right = (colon >= 0 ? rhsFull.slice(0, colon) : rhsFull).trim();
      const label = colon >= 0 ? decodeEntities(rhsFull.slice(colon + 1).trim()) : undefined;
      const from = left === "[*]" ? marker("start") : (ensure(left), left);
      const to = right === "[*]" ? marker("end") : (ensure(right), right);
      edges.push({ from, to, label: label || undefined });
      continue;
    }

    // state description:  id : description
    const desc = /^([A-Za-z0-9_]+)\s*:\s*(.+)$/.exec(line);
    if (desc) {
      const n = ensure(desc[1]);
      const { title, subtitle } = splitLabel(desc[2]);
      n.title = title;
      n.subtitle = subtitle;
      continue;
    }

    // bare state declaration
    const bare = /^([A-Za-z0-9_]+)\s*$/.exec(line);
    if (bare) ensure(bare[1]);
  }

  return { rankDir, nodes: [...nodes.values()], edges, clusters };
}

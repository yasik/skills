#!/usr/bin/env -S npx tsx
/**
 * mermaid-render — render a Mermaid diagram to a styled, optionally animated SVG.
 *
 * Usage:
 *   bun run render.ts --input diagram.mmd --output diagram
 *   bun run render.ts --code "graph TD; A-->B" --output diagram --no-anim
 *   bun run render.ts -i diagram.mmd -o diagram --config ./my-config.ts
 *
 * Runtimes: bun run render.ts ... | npx tsx render.ts ...
 * Output:   <output>.svg
 *
 * Diagram type is auto-detected (flowchart / state / sequence); override with --type.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import defaultTheme, { type Theme } from "../config";
import { parseFlowchart } from "./lib/parse-flowchart";
import { parseState } from "./lib/parse-state";
import { renderGraph } from "./lib/render-graph";

type Args = {
  input?: string;
  code?: string;
  output: string;
  config?: string;
  type?: "flowchart" | "state" | "sequence";
  animate: boolean;
};

function parseArgs(): Args {
  const a = process.argv.slice(2);
  const r: any = { animate: true };
  for (let i = 0; i < a.length; i++) {
    const k = a[i], n = a[i + 1];
    switch (k) {
      case "--input": case "-i": r.input = n; i++; break;
      case "--code": case "-c": r.code = n; i++; break;
      case "--output": case "-o": r.output = n; i++; break;
      case "--config": r.config = n; i++; break;
      case "--type": r.type = n; i++; break;
      case "--no-anim": case "--static": r.animate = false; break;
      case "--anim": r.animate = true; break;
      case "--help": case "-h": help(); process.exit(0);
    }
  }
  if (!r.input && !r.code) { console.error("Error: --input or --code is required"); help(); process.exit(1); }
  if (!r.output) { console.error("Error: --output is required"); help(); process.exit(1); }
  return r as Args;
}

function help() {
  console.log(`mermaid-render renderer

  render.ts --input <file.mmd> --output <name> [options]
  render.ts --code "<mermaid>"  --output <name> [options]

Options:
  -i, --input <file>   Mermaid source file
  -c, --code  <str>    Mermaid source as a string
  -o, --output <name>  Output base name (writes <name>.svg)
      --config <file>  Path to a custom theme config (exports \`theme\`)
      --type <t>       Force diagram type: flowchart | state | sequence
      --no-anim        Render a static SVG (no travelling packets)
  -h, --help

Supports Mermaid flowchart / stateDiagram / sequenceDiagram (common subset).`);
}

// strip ```mermaid fences and leading %%{init}%% directives
function clean(src: string): string {
  let s = src.replace(/```(?:mermaid)?/gi, "").trim();
  s = s.replace(/^\s*%%\{[\s\S]*?\}%%\s*/m, "");
  return s.trim();
}

function detectType(src: string): "flowchart" | "state" | "sequence" {
  for (const raw of src.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("%%")) continue;
    if (/^sequenceDiagram\b/i.test(line)) return "sequence";
    if (/^stateDiagram(-v2)?\b/i.test(line)) return "state";
    if (/^(flowchart|graph)\b/i.test(line)) return "flowchart";
    break;
  }
  return "flowchart";
}

async function loadTheme(path?: string): Promise<Theme> {
  if (!path) return defaultTheme;
  const url = pathToFileURL(resolve(path)).href;
  const mod: any = await import(url);
  return (mod.theme ?? mod.default) as Theme;
}

async function loadDagre(): Promise<any> {
  const get = async () => {
    const m: any = await import("@dagrejs/dagre");
    return m.default ?? m;
  };
  try {
    return await get();
  } catch {
    console.error("@dagrejs/dagre not found. Installing...");
    const { execSync } = await import("node:child_process");
    const hasBun = typeof (globalThis as any).Bun !== "undefined";
    execSync(hasBun ? "bun add @dagrejs/dagre" : "npm install @dagrejs/dagre", { stdio: "inherit" });
    return await get();
  }
}

async function main() {
  const args = parseArgs();
  const raw = args.input ? readFileSync(resolve(args.input), "utf-8") : args.code!;
  const src = clean(raw);
  const type = args.type ?? detectType(src);
  const theme = await loadTheme(args.config);

  let svg: string;
  if (type === "sequence") {
    const { parseSequence } = await import("./lib/parse-sequence");
    const { renderSequence } = await import("./lib/render-sequence");
    svg = renderSequence(parseSequence(src), theme, { animate: args.animate });
  } else {
    const dagre = await loadDagre();
    const graph = type === "state" ? parseState(src) : parseFlowchart(src);
    svg = renderGraph(graph, theme, { animate: args.animate }, dagre);
  }

  const out = args.output.endsWith(".svg") ? args.output : `${args.output}.svg`;
  writeFileSync(resolve(out), svg, "utf-8");
  console.log(`[${type}] wrote ${resolve(out)}`);
}

main().catch((e) => { console.error("Error:", e?.message ?? e); process.exit(1); });

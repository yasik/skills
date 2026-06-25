#!/usr/bin/env -S npx tsx
/**
 * Wrap a mermaid-render SVG in a minimal HTML page for high-resolution PNG capture.
 *
 *   bun run create-html.ts --svg diagram.svg --output diagram.html
 *   bun run create-html.ts --svg diagram.svg --output diagram.html --scale 2 --padding 40
 *
 * By default the travelling packets are hidden so the captured PNG is a clean
 * static frame (the SVG itself keeps its animation). Pass --animated to keep them.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, basename } from "node:path";

type Args = { svg: string; output: string; padding: number; scale: number; background?: string; animated: boolean };

function parseArgs(): Args {
  const a = process.argv.slice(2);
  const r: any = { padding: 40, scale: 2, animated: false };
  for (let i = 0; i < a.length; i++) {
    const k = a[i], n = a[i + 1];
    switch (k) {
      case "--svg": case "-s": r.svg = n; i++; break;
      case "--output": case "-o": r.output = n; i++; break;
      case "--padding": case "-p": { const v = parseInt(n, 10); r.padding = Number.isNaN(v) ? 40 : v; i++; break; }
      case "--scale": r.scale = parseFloat(n) || 2; i++; break;
      case "--background": case "-b": r.background = n; i++; break;
      case "--animated": r.animated = true; break;
      case "--help": case "-h":
        console.log("create-html.ts --svg <file.svg> --output <file.html> [--scale 2] [--padding 40] [--background #F8F8F1] [--animated]");
        process.exit(0);
    }
  }
  if (!r.svg || !r.output) { console.error("Error: --svg and --output are required"); process.exit(1); }
  return r as Args;
}

function detectBg(svg: string): string {
  // mermaid-render draws the background as the first full-size rect
  const m = svg.match(/<rect x="0" y="0"[^>]*fill="(#[0-9a-fA-F]{3,8})"/);
  return m ? m[1] : "#F8F8F1";
}

function main() {
  const args = parseArgs();
  const svgPath = resolve(args.svg);
  if (!existsSync(svgPath)) { console.error(`SVG not found: ${svgPath}`); process.exit(1); }
  const svg = readFileSync(svgPath, "utf-8");
  const bg = args.background ?? detectBg(svg);
  const vb = svg.match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
  const w = vb ? Math.round(parseFloat(vb[1]) * args.scale) : 1200;
  const hideFlow = args.animated ? "" : ".container svg .flow{display:none!important}";

  const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>${basename(args.svg, ".svg")}</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{background:${bg}}
  .container{display:inline-block;background:${bg};padding:${args.padding}px}
  .container svg{display:block;width:${w}px;height:auto}
  ${hideFlow}
</style></head>
<body><div class="container">${svg}</div></body></html>`;

  writeFileSync(resolve(args.output), html, "utf-8");
  console.log(`HTML wrapper written to: ${resolve(args.output)} (bg ${bg}, width ${w}px)`);
}

main();

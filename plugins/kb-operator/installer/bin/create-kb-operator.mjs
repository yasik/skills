#!/usr/bin/env node
/**
 * create-kb-operator — interactive setup for a kb-operator knowledge base.
 *
 * Walks through four independent steps, each skippable and safe to re-run:
 *   1. Scaffold the KB (SCHEMA.md, sources/, optional .kb.json) in a new
 *      folder or an existing Obsidian vault.
 *   2. Put the workspace under git (the sources/ append-only check needs a
 *      committed baseline).
 *   3. Install the kb-operator plugin into Claude Code and/or Codex.
 *   4. Wire up qmd search: collection, context, index, optional embeddings,
 *      and MCP registration so agents get query/get tools.
 *
 * Zero dependencies by design — everything uses node built-ins so `npx`
 * starts instantly. External tools (git, claude, codex, qmd) are invoked
 * only after detection, and every failure degrades to printed manual
 * instructions instead of aborting the setup.
 */

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";
import { fileURLToPath } from "node:url";

// The schema template has one source of truth: the kb-ingest skill. In the
// published npm package it is copied into assets/ by the prepack script; in
// a repo checkout the fallback reads the canonical file through the plugin's
// skills/ symlink. There is no committed duplicate.
const SCHEMA_TEMPLATE_CANDIDATES = [
  new URL("../assets/schema-template.md", import.meta.url),
  new URL(
    "../../skills/kb-ingest/references/schema-template.md",
    import.meta.url,
  ),
].map(fileURLToPath);

const SCHEMA_TEMPLATE_PATH = SCHEMA_TEMPLATE_CANDIDATES.find((path) =>
  existsSync(path),
);

const MARKETPLACE_REPO = "yasik/skills";
const PLUGIN_SPEC = "kb-operator@yasik-skills";

const color = {
  bold: (s) => `[1m${s}[0m`,
  dim: (s) => `[2m${s}[0m`,
  green: (s) => `[32m${s}[0m`,
  yellow: (s) => `[33m${s}[0m`,
  cyan: (s) => `[36m${s}[0m`,
};

const HELP = `
${color.bold("create-kb-operator")} — set up a kb-operator knowledge base

Usage:
  npx create-kb-operator [workspace-dir] [options]

Options:
  --yes             accept all defaults, no prompts (personal mode)
  --kb-dir <name>   KB folder name inside the workspace (default: kb)
  --org             enable the org extension in .kb.json
  --skip-git        skip git init
  --skip-plugins    skip Claude Code / Codex plugin installation
  --skip-qmd        skip qmd search setup
  --help            show this help
`;

/**
 * Parsed command-line options — the single trust boundary for argv.
 * @typedef {object} CliOptions
 * @property {string | null} workspace  Positional workspace dir, if given.
 * @property {boolean} yes              Accept defaults without prompting.
 * @property {string | null} kbDir      KB folder name override.
 * @property {boolean} org              Enable the org extension.
 * @property {boolean} skipGit
 * @property {boolean} skipPlugins
 * @property {boolean} skipQmd
 */

/** @returns {CliOptions} */
function parseArgs(argv) {
  const options = {
    workspace: null,
    yes: false,
    kbDir: null,
    org: false,
    skipGit: false,
    skipPlugins: false,
    skipQmd: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      stdout.write(HELP);
      process.exit(0);
    }
    if (arg === "--yes" || arg === "-y") {
      options.yes = true;
      continue;
    }
    if (arg === "--kb-dir") {
      options.kbDir = argv[++i] ?? null;
      continue;
    }
    if (arg === "--org") {
      options.org = true;
      continue;
    }
    if (arg === "--skip-git") {
      options.skipGit = true;
      continue;
    }
    if (arg === "--skip-plugins") {
      options.skipPlugins = true;
      continue;
    }
    if (arg === "--skip-qmd") {
      options.skipQmd = true;
      continue;
    }
    if (!arg.startsWith("-") && options.workspace === null) {
      options.workspace = arg;
      continue;
    }
    stdout.write(`unknown option: ${arg}\n${HELP}`);
    process.exit(1);
  }

  return options;
}

/**
 * Buffered line reader for prompts.
 *
 * `readline/promises.question()` loses buffered lines with piped stdin and
 * leaves its promise unsettled on EOF — node then exits 0 mid-setup. This
 * reader owns the `line` event stream instead: answers arriving early are
 * queued, and EOF resolves every pending and future read as `null`, which
 * `ask`/`confirm` translate to "accept the default". Prompts are written to
 * stdout directly; terminal echo is left to the tty driver.
 */
class Prompter {
  constructor() {
    this.pendingLines = [];
    this.waiters = [];
    this.closed = false;
    this.rl = createInterface({ input: stdin });
    this.rl.on("line", (line) => {
      const waiter = this.waiters.shift();
      if (waiter) {
        waiter(line);
        return;
      }
      this.pendingLines.push(line);
    });
    this.rl.on("close", () => {
      this.closed = true;
      for (const waiter of this.waiters.splice(0)) waiter(null);
    });
  }

  /** Next input line, or null once stdin has ended. */
  next() {
    if (this.pendingLines.length > 0)
      return Promise.resolve(this.pendingLines.shift());
    if (this.closed) return Promise.resolve(null);
    return new Promise((resolveLine) => this.waiters.push(resolveLine));
  }

  close() {
    this.rl.close();
  }
}

/** Interactive prompt session; created once, null in --yes mode. */
let prompter = null;

/**
 * Ask a free-text question; returns the default in --yes mode, on empty
 * input, or after stdin EOF.
 */
async function ask(question, defaultValue) {
  if (prompter === null) return defaultValue;
  const suffix = defaultValue ? color.dim(` (${defaultValue})`) : "";
  stdout.write(`  ${question}${suffix} `);
  const line = await prompter.next();
  if (line === null) {
    stdout.write(color.dim("(end of input — using default)\n"));
    return defaultValue;
  }
  const answer = line.trim();
  return answer === "" ? defaultValue : answer;
}

/** Ask a yes/no question; returns the default in --yes mode or after EOF. */
async function confirm(question, defaultValue) {
  if (prompter === null) return defaultValue;
  const hint = defaultValue ? "Y/n" : "y/N";
  stdout.write(`  ${question} ${color.dim(`[${hint}]`)} `);
  const line = await prompter.next();
  if (line === null) {
    stdout.write(color.dim("(end of input — using default)\n"));
    return defaultValue;
  }
  const answer = line.trim().toLowerCase();
  if (answer === "") return defaultValue;
  return answer === "y" || answer === "yes";
}

/** Check whether an executable exists on PATH. */
function hasCommand(command) {
  const probe = process.platform === "win32" ? "where" : "which";
  return spawnSync(probe, [command], { stdio: "ignore" }).status === 0;
}

/**
 * Run an external command with inherited stdio so the user sees its output.
 * Returns true on exit code 0; failures are reported, never thrown — every
 * step must degrade to manual instructions rather than abort the setup.
 */
function run(command, args, cwd) {
  stdout.write(color.dim(`  $ ${command} ${args.join(" ")}\n`));
  const result = spawnSync(command, args, { stdio: "inherit", cwd });
  if (result.status !== 0) {
    stdout.write(
      color.yellow(
        `  command failed (exit ${result.status ?? "?"}) — continuing\n`,
      ),
    );
    return false;
  }
  return true;
}

/** Actions performed, collected for the final summary. */
const actions = [];

function record(message) {
  actions.push(message);
  stdout.write(`  ${color.green("+")} ${message}\n`);
}

function note(message) {
  stdout.write(`  ${color.yellow("•")} ${message}\n`);
}

function heading(title) {
  stdout.write(`\n${color.bold(color.cyan(title))}\n`);
}

/**
 * Step 1 — scaffold the KB.
 * @returns {{ workspace: string, kbRoot: string, kbDir: string }}
 */
async function scaffold(options) {
  heading("1/4 · Knowledge base");

  const workspaceInput =
    options.workspace ??
    (await ask("Workspace directory (new or existing):", "."));
  const workspace = resolve(workspaceInput);
  mkdirSync(workspace, { recursive: true });

  if (existsSync(join(workspace, ".obsidian"))) {
    note("Obsidian vault detected — the KB will live as a folder inside it");
  }

  const kbDir = options.kbDir ?? (await ask("KB folder name:", "kb"));
  const kbRoot = join(workspace, kbDir);
  mkdirSync(join(kbRoot, "sources"), { recursive: true });
  record(`${kbDir}/sources/ ready`);

  const schemaPath = join(kbRoot, "SCHEMA.md");
  if (existsSync(schemaPath)) {
    note("SCHEMA.md already exists — kept as is");
  } else if (SCHEMA_TEMPLATE_PATH === undefined) {
    note(
      "schema template not found (broken package?) — copy it manually from " +
        "the kb-ingest skill: references/schema-template.md",
    );
  } else {
    writeFileSync(schemaPath, readFileSync(SCHEMA_TEMPLATE_PATH, "utf8"));
    record(
      `${kbDir}/SCHEMA.md bootstrapped from the template (adapt it to your domain)`,
    );
  }

  const org =
    options.org ||
    (await confirm("Enable the org extension (agent organizations)?", false));
  const configPath = join(workspace, ".kb.json");
  const needsConfig = kbDir !== "kb" || org;

  if (needsConfig && existsSync(configPath)) {
    note('.kb.json already exists — kept as is, verify its "root" matches');
  }
  if (needsConfig && !existsSync(configPath)) {
    const config = org
      ? { root: kbDir, org: { charter: "_charter", agents: "agents" } }
      : { root: kbDir };
    writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`);
    record(`.kb.json written (${org ? "org mode" : "custom KB folder"})`);
  }

  return { workspace, kbRoot, kbDir };
}

/** Step 2 — git baseline (the sources/ append-only check compares against it). */
async function setupGit(options, workspace) {
  heading("2/4 · Git");

  if (options.skipGit) {
    note("skipped (--skip-git)");
    return;
  }
  if (!hasCommand("git")) {
    note(
      "git not found — the sources/ append-only lint check will be skipped until the KB is under git",
    );
    return;
  }

  const inRepo =
    spawnSync("git", ["rev-parse", "--is-inside-work-tree"], {
      cwd: workspace,
      stdio: "ignore",
    }).status === 0;
  if (inRepo) {
    note("workspace is already inside a git repository");
    return;
  }

  const wantGit = await confirm(
    "Initialize git here? (recommended — enables the sources append-only check)",
    true,
  );
  if (!wantGit) return;

  if (
    run("git", ["init", "--quiet"], workspace) &&
    run("git", ["add", "-A"], workspace) &&
    run(
      "git",
      ["commit", "--quiet", "-m", "kb: initial knowledge base scaffold"],
      workspace,
    )
  ) {
    record("git repository initialized with the scaffold committed");
  }
}

/** Step 3 — plugin installation for detected agent CLIs. */
async function setupPlugins(options) {
  heading("3/4 · Agent plugins");

  if (options.skipPlugins) {
    note("skipped (--skip-plugins)");
    return { hasClaude: hasCommand("claude"), hasCodex: hasCommand("codex") };
  }

  const hasClaude = hasCommand("claude");
  const hasCodex = hasCommand("codex");

  if (!hasClaude && !hasCodex) {
    note("neither `claude` nor `codex` found on PATH — install one, then run:");
    note(
      `  claude plugin marketplace add ${MARKETPLACE_REPO} && claude plugin install ${PLUGIN_SPEC}`,
    );
    note(`  codex plugin marketplace add ${MARKETPLACE_REPO}`);
    return { hasClaude, hasCodex };
  }

  if (
    hasClaude &&
    (await confirm("Install the kb-operator plugin into Claude Code?", true))
  ) {
    run("claude", ["plugin", "marketplace", "add", MARKETPLACE_REPO]);
    if (run("claude", ["plugin", "install", PLUGIN_SPEC])) {
      record("kb-operator plugin installed in Claude Code");
    }
  }

  if (
    hasCodex &&
    (await confirm("Install the kb-operator plugin into Codex?", true))
  ) {
    if (run("codex", ["plugin", "marketplace", "add", MARKETPLACE_REPO])) {
      record(
        "kb-operator marketplace added to Codex (install via /plugins in the TUI)",
      );
    }
    note(
      "Codex plugins cannot bundle agents — copy codex/agents/*.toml from the plugin into ~/.codex/agents/",
    );
  }

  return { hasClaude, hasCodex };
}

/** Step 4 — qmd search: collection, context, index, embeddings, MCP. */
async function setupQmd(options, kbRoot, workspace, clis) {
  heading("4/4 · Search (qmd)");

  if (options.skipQmd) {
    note("skipped (--skip-qmd)");
    return;
  }

  if (!hasCommand("qmd")) {
    const wantInstall = await confirm(
      "qmd not found. Install it globally via npm?",
      true,
    );
    if (!wantInstall || !run("npm", ["install", "-g", "@tobilu/qmd"])) {
      note(
        "skipping search setup — install later and re-run, or follow the Search section in the plugin README",
      );
      return;
    }
    record("qmd installed");
  }

  const defaultName =
    basename(workspace)
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-") || "kb";
  const collection = await ask("qmd collection name for this KB:", defaultName);

  if (run("qmd", ["collection", "add", kbRoot, "--name", collection])) {
    record(`qmd collection '${collection}' indexes ${kbRoot}`);
  } else {
    note(
      "collection add failed — it may already exist (`qmd collection list`)",
    );
  }

  run("qmd", [
    "context",
    "add",
    `qmd://${collection}`,
    "Knowledge base: entities, concepts, projects, decisions, reports, and raw sources",
  ]);

  if (run("qmd", ["update"])) {
    record("BM25 index built (qmd update)");
  }

  // Embeddings download ~2GB of local GGUF models — opt-in, never a default.
  const wantEmbed = await confirm(
    "Enable semantic search? Downloads ~2GB of local embedding models (BM25 keyword search works without it)",
    false,
  );
  if (wantEmbed && run("qmd", ["embed"])) {
    record("vector embeddings built — hybrid search (qmd query) available");
  }
  if (!wantEmbed) {
    note("semantic search skipped — enable any time with: qmd embed");
  }

  if (
    clis.hasClaude &&
    (await confirm("Register qmd as an MCP server in Claude Code?", true))
  ) {
    if (
      run("claude", [
        "mcp",
        "add",
        "--scope",
        "user",
        "qmd",
        "--",
        "qmd",
        "mcp",
      ])
    ) {
      record(
        "qmd MCP server registered in Claude Code (tools: query, get, multi_get, status)",
      );
    } else {
      note("registration failed — it may already exist (`claude mcp list`)");
    }
  }

  if (clis.hasCodex) {
    note("Codex MCP registration — add to ~/.codex/config.toml:");
    note("  [mcp_servers.qmd]");
    note('  command = "qmd"');
    note('  args = ["mcp"]');
  }
}

function printSummary(kbDir) {
  heading("Done");

  if (actions.length === 0) {
    stdout.write(
      "  nothing changed — everything was already in place or skipped\n",
    );
  }
  for (const action of actions) {
    stdout.write(`  ${color.green("✔")} ${action}\n`);
  }

  stdout.write(`
${color.bold("Next steps")}
  1. Drop raw material (articles, papers, transcripts) into ${kbDir}/sources/
  2. In a session: ${color.cyan('"ingest the new sources"')} — kb-intake takes over
  3. Ask: ${color.cyan('"what do we know about X?"')} — answers come with citations
  4. Schedule hygiene (weekly lint, daily intake) — see the Orchestration
     section in the plugin README
  Keep the search index fresh alongside those jobs: ${color.cyan("qmd update && qmd embed")}
`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  stdout.write(`${color.bold("create-kb-operator")} — knowledge base setup\n`);
  stdout.write(
    color.dim("scaffold KB · git baseline · agent plugins · qmd search\n"),
  );

  if (!options.yes) {
    prompter = new Prompter();
  }

  try {
    const { workspace, kbRoot, kbDir } = await scaffold(options);
    await setupGit(options, workspace);
    const clis = await setupPlugins(options);
    await setupQmd(options, kbRoot, workspace, clis);
    printSummary(kbDir);
  } finally {
    prompter?.close();
  }
}

// Process boundary: report the failure plainly and exit non-zero. Everything
// recoverable is already handled inside the steps.
main().catch((error) => {
  stdout.write(
    `\n${color.yellow("setup failed:")} ${error?.message ?? error}\n`,
  );
  process.exit(1);
});

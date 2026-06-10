# Triggering evaluation — terminal-report

How well the `description:` in `SKILL.md` makes the skill fire when it should
and stay quiet when it shouldn't. Re-run this whenever you edit the description.

## Latest result (2026-06-10, model claude-opus-4-8, 3 runs/query)

| Metric | Score |
|---|---|
| should-trigger recall | **0.90** (9/10) |
| should-not specificity | **1.00** (10/10) |
| overall | **0.95** |

Full per-query data in `results.json`; the 20 queries in `trigger_evals.json`
(10 should-trigger, 10 should-not, the negatives chosen as hard near-misses).

**Decision: description kept as-is.** Perfect specificity means the deliberately
"pushy" wording is not over-triggering — every near-miss stayed silent, incl.
chart-critique (defers to `tufte-viz`), interactive Textual TUI (defers),
iTerm theming, strip-ANSI, JSON logging, xlsx→csv, PDF, and "explain ANSI."

The single miss was *"add a sparkline to my existing status command"* — a
modify-existing-code request where the model's first action is to read the
user's file, not load a skill. That pattern under-detects for every skill and
isn't fixable by wording; pushing harder to catch it would risk the perfect
specificity. So we did not chase it.

## How triggering was measured (and a gotcha)

The skill-creator's official `run_loop.py` was **not** usable here:
1. Its *improve* step calls the raw `anthropic` SDK, which needs
   `ANTHROPIC_API_KEY`. Claude Code uses OAuth, so no key is available.
2. Its *measure* step (`run_eval.py`) represents the skill as a **synthetic
   command** named `terminal-report-skill-<uuid>` and checks for that exact
   name. But this skill is **already installed** as `terminal-report`, so the
   model invokes the real skill — which `run_eval` scores as "not triggered."
   Result: false-negative 0% triggering across the board.

So triggering was measured directly against the **installed** skill: run
`claude -p <query> --output-format stream-json --include-partial-messages`,
early-exit at the first tool action, and count it as triggered iff that first
action is `Skill`/`Read` referencing `terminal-report`. This measures exactly
what a user experiences. The probe that revealed the collision showed the model
opening with: *"I'll use the `terminal-report` skill for this — it's built
exactly for polished, aligned, color-coded terminal output."*

### Reproduce

For each query, run (with `CLAUDECODE` unset to allow nesting):

```bash
claude -p "<query>" --model claude-opus-4-8 \
  --output-format stream-json --verbose --include-partial-messages
```

Triggered = the first `tool_use` in the stream is `Skill` (with
`"terminal-report"` in `skill`) or `Read` (of the skill's `SKILL.md`).
Run each query ~3× and average; pass if rate ≥ 0.5 (should-trigger) or
< 0.5 (should-not). Note: queries that ask to *modify existing code* tend to
under-trigger because the model explores files first — that is harness noise,
not a description defect.

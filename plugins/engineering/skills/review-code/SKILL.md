---
name: review-code
description: "Review a specific diff or PR for correctness, scope, architecture, security, tests, and repository standards. Report findings by default; apply validated findings only when the request authorizes fixes."
---

# Code review

Distilled from Compound Engineering. Review the actual change against intended
behavior. A sound change needs no findings. Review suggestions are hypotheses,
not automatic permission to grow the implementation.

## Establish the reviewed scope

1. Resolve the user's target, base, head, and uncommitted scope. For a PR, inspect
   live metadata and the exact reviewed refs; do not substitute an unrelated local
   checkout. Record the head SHA so checks and findings refer to the same code.
2. Read the request, relevant plan or issue, diff, surrounding source, and repository
   conventions. State intent and behavior that must survive in a few sentences.
   Distinguish explicit requirements from a merely inferred related plan.
3. Check both directions: missing requested behavior and unrequested observable
   policies. Do not manufacture requirements from an unrelated planning document.

Report-only means no source edits, branch switches, PR comments, or pushes. A
review request is not a request to run the whole test suite; run a focused probe
only to confirm or reject a specific finding. Read
remote refs without overwriting local work. A separate isolated checkout can support
validation when needed. Fixing findings is allowed only when requested, including
by an authorized implementation workflow; publication remains separately scoped.

## Review by consequence

Use [review-lenses.md](references/review-lenses.md). Always assess correctness,
intent, maintainability, written standards, and meaningful test sufficiency.
Add focused security, API, concurrency, migration, performance, or agent-contract
checks when the change exposes those risks. A small permission bug can deserve
more scrutiny than a large mechanical change.

Readability is part of correctness for maintained code. A method a reviewer
cannot follow, a function that keeps growing, or state without a clear owner is a
finding, even when tests pass. Check duplication, keep-it-simple, and single
responsibility explicitly; do not return "no findings" on code you would not
want to maintain.

Obtain an independent adversarial read when delegation is available and
permitted and the change does any of the following:

- touches authorization, secrets, persistence, migrations, or money;
- changes a public API, wire protocol, or serialized format;
- adds concurrency, cancellation, or lifecycle handling;
- changes an agent loop's context, tools, or prompt caching;
- exceeds roughly 300 changed lines of non-generated code.

Give the independent reviewer the exact scope, contract, and evidence without
suggesting the intended findings. Without delegation, review sequentially and
disclose that independence was unavailable. Do not invent reviewer roles or tools,
or send code to a new external service without authority.

For a stack, review each slice against its proper prerequisite base, then review
the combined result. Attribute inherited defects accurately. Never claim stack
coverage from inspecting only the final PR's incremental diff.

## Validate findings

For each candidate, trace a concrete trigger to its consequence. Check the source,
callers, and expected behavior; use a focused probe or existing test when it helps.
Reject false positives, intended behavior, speculative features, and taste-only
rewrites. Do not equate a missing new test with a defect if behavior is already
covered or the proposed test would protect nothing meaningful.

Keep one finding per underlying problem. Each retained finding needs:

- Severity justified by impact, not by the reviewer's tone.
- Exact file/line or contract location.
- Trigger, actual consequence, and violated expectation.
- Evidence or reproduction, plus confidence limits.
- Smallest appropriate correction.

A finding gives enough context to act without a long paragraph:

```markdown
**High: handoff result lost on cancellation** (`_run_loop.py:142`)
When cancellation arrives after a handoff tool returns, `_cleanup` clears
`pending_results` before the result is appended, so the caller receives
`RunCancelled` and the handoff output is dropped. Reproduced with
`test_cancel_after_handoff` (fails on the current head). Fix: append the
result before cleanup, then honor the cancellation.
```

When a finding names one instance of a pattern, check the rest of the change
for the same pattern and list or fix every occurrence.

Separate confirmed defects, actionable standards violations, and unresolved risks.
An unverified suspicion cannot silently become a blocker or an applied fix.
When fixes are authorized, apply valid in-scope corrections, verify affected
behavior, and review the resulting diff. Do not fit tests to a faulty implementation.

## Finish

Lead with the verdict and consequential findings. Include reviewed scope/head,
checks actually run, standards consulted, independent-review coverage, and remaining
limits. Zero findings is valid. No findings is not proof of no defects.

Stop when the selected coverage is complete and valid in-scope issues are resolved
or clearly reported. Additional available reviewers alone are not a reason to loop.
Readiness does not authorize merging or deployment.

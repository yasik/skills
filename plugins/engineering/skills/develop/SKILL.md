---
name: develop
description: "Carry a concrete engineering task through design, implementation, verification, review, and delivery within its authorized scope. Use for end-to-end feature or fix work; route isolated reviews and research to their own skills."
---

# Develop

Deliver the requested outcome with the smallest maintainable implementation.
Use this skill to coordinate the cycle, not to make every task a large project.
[worked-example.md](references/worked-example.md) traces one complete task.

## Operating loop and gates

Follow this loop, scaling the depth to the task:

```text
Frame outcome and scope -> Understand evidence and existing design
  -> Design the smallest contract -> Build a reviewable increment
  -> Simplify and Verify -> Challenge through review
  -> Deliver within authorization -> Compound useful learning

Validated defect -> return to the earliest affected gate -> recheck affected work
```

Each gate requires an observable result. The user's involvement below identifies
where their judgment can be needed; it does not require eight approval prompts.
Proceed autonomously within established scope and authority. A passed gate advances
immediately; it is never an invitation to ask "shall I continue?" Ask only when
missing information materially changes the result, an action needs authority not
already given, the user explicitly reserved approval, or the operating mode
calls for plan review (see [Design approval](#design-approval)).
Complete independent work while a required answer is pending. Technical
difficulty alone is not an approval boundary; investigate and fix within scope.

| Gate | Required result before advancing | User involvement when needed |
| --- | --- | --- |
| Frame | Task contract: outcome, acceptance checks, non-goals, authority, mode, budget | Resolve material ambiguity, not routine implementation choices |
| Understand | Current behavior, prior art, gate commands, and a baseline run | Challenge a faulty premise or supply missing context |
| Design | Minimal caller example, ownership, typed contract where applicable, and the key tradeoff | Review consequential choices that need a decision or explicitly gated plans |
| Build | Small end-to-end increment using existing seams and preserving specified behavior | Inspect intermediate slices when requested |
| Verify | Gate commands pass on the final tree; behavior exercised as a caller would | Decide whether a material evidence gap is acceptable for the intended outcome |
| Challenge | Validated review findings and fixes, with complexity reassessed | Exercise taste and adjudicate material tradeoffs |
| Deliver | PR, release, deployment, or report as authorized, with actual state verified and reported | Grant authority not already provided |
| Compound | Proposed lesson with its target file, or "no new lesson" | Accept or reject a proposed rule |

Record results in the existing plan or working notes; do not create a separate
artifact per gate. An explicit requirement cannot be marked passed merely because
a stage ran. A blocking verification gap stays unresolved, even if the
implementation is finished. A stage outside the requested scope is marked not
applicable with a reason; do not fabricate delivery or learning work.

When findings change a contract, revisit Design; when they expose a false premise,
revisit Understand. For a local defect, return to Build and repeat the affected
verification and review. Reuse unaffected evidence only while its inputs remain
unchanged. Reopen an explicit approval only when its stated condition applies
again or the proposed change exceeds the approved scope; ordinary corrections do
not invalidate permission.

## Frame: write the task contract

Before editing, write six lines in the plan or working notes:

```text
Outcome:     Reject protocol messages with an unsupported major version.
Acceptance:  `make tests` passes; decoding {"version": "3.0"} raises
             UnsupportedVersionError naming the version; 2.x still decodes.
Non-goals:   Version negotiation; changes to the encoder.
Authority:   Local commits on a feature branch; no push (default).
Mode:        Interactive (an engineer is in the session).
Budget:      One working session; stop and report if the design needs a
             protocol change.
```

Acceptance checks are commands or observable behaviors, not adjectives. The mode
is interactive, headless, or tracker (see [Design approval](#design-approval)).
When the request leaves a routine detail open, choose the conventional option,
record it as an assumption, and keep it cheap to reverse. Report every such
assumption.

### Default authority

When the request does not state the delivery mode, use these defaults:

| Request | Default delivery |
| --- | --- |
| "Implement", "fix", "add", "build" | Feature branch, focused local commits, no push |
| "Open a PR", "ship it to review" | Commit, push the feature branch, open or update the PR |
| "Plan", "design", "propose" | Plan only; no source edits |
| "Review", "audit", "check" | Report only; no edits |
| Assigned tracker issue | Plan comment, then after approval a PR linked to the issue and a result comment |
| Release, deploy, merge, message others | Never by default; requires explicit authority |

If the current branch is the default branch, create a feature branch before the
first implementation commit; `release` follows its own branch rules. Never commit
unrelated working-tree changes.

### Design approval

This section is the single rule for when design needs a human. A request to
"plan first", "propose", or "not write code yet" is always a hard stop.

A plan needs review when the task calls for a `design` pass: a new public API,
package, or core abstraction, a cross-layer change, a persisted or wire format,
a data migration, or a change to an agent loop's context or prompt caching. Small
additive surface, such as a new CLI option or an error subclass, and routine
fixes proceed in every mode and are listed under "Decisions made for you".

How a plan is reviewed depends on the operating mode. Record the mode in the task
contract. An explicit statement from the user or the launching system wins;
otherwise infer it in this order:

| Mode | Signal | Plan review |
| --- | --- | --- |
| Tracker | The task arrived as an assigned issue (Linear, GitHub, Jira) | Post the plan as an issue comment and wait for a human reply |
| Interactive | An engineer is in the session | Present the plan in the session and iterate until approved |
| Headless | No human is reachable: CI, a scheduled run, a non-interactive launch | Proceed; record the plan as the first "Decisions made for you" item |

**Interactive.** Present the `design` output, including its numbered review
questions, and wait, even when the request says "fix", unless the engineer
delegated the design. Treat feedback as a revision of the same plan: update it in
place, show what changed, and ask again. Approval covers the approved scope;
implement it without further check-ins.

**Tracker.** Posting the plan comment is part of the assignment and needs no
separate authority. Start the comment with a one-line summary, then the plan and
its review questions, and end with what reply is needed ("Reply *approve*, or
answer the questions"). Then stop: report that the task awaits plan review, with
the comment link. Do not build in the meantime beyond read-only investigation.
When the run resumes, read the whole thread since the plan. Accept approval or
changes only from a human with access to the issue, never from a bot or your own
earlier comments. Changes mean a revised plan comment and another wait; approval
means build and deliver as the issue's conventions expect, usually a PR linked to
the issue, then comment with the result. If the host can wait within the run,
poll the thread with bounded backoff instead of stopping; `babysit-pr` describes
honest waiting.

**Headless.** Build the plan you would have proposed. Commit each phase
separately so a reviewer can inspect and revert it on its own, and lead the
report with the design and its open questions. Hard-to-reverse changes, such as
a persisted or wire format or a data migration, stay unpublished: deliver them as
a draft PR or local commits even when the request authorizes more.

### Destructive and heavy operations

Before deleting, moving, or rewriting data, running a migration, or starting an
operation that consumes significant time, disk, or money, state the invariant that
must hold ("all catalog edits preserved"), run a dry run, and verify the invariant
after the real run. Choose the least invasive mechanism: change references in
place before copying data. Disclose heavy side effects before starting. Do the
work yourself instead of handing routine steps back to the user.

## Understand: establish the baseline

1. Use the repository's own verification setup. Read its agent instructions,
   contributing guide, Makefile or package scripts, pre-commit configuration,
   and CI workflows, and identify the gate commands they define: format, lint,
   static and type checks, tests, and build. Prefer the commands CI runs. Do not
   add, replace, or loosen a check, linter rule, or tool configuration to make
   the work pass; a repository without a check is a limit to report.
2. Run those gates **before editing**. Record failures that already exist on the
   base. A pre-existing failure is neither yours to hide nor proof your change
   broke something; report it separately and keep it out of your diff unless
   fixing it is in scope. A failure that stops the suite from running at all,
   such as an import or collection error, blocks verification: fix it when the
   fix is small, otherwise report the work as unverified.
3. Read the code paths, callers, and tests the change touches. Find the existing
   primitive before writing a new one. When working from an earlier plan, pull
   the latest base and dependencies and reconcile the plan first.

A check result applies only to the code it ran on. Run the final gates after
the last edit; any edit after a check makes its result stale. When the base has
a known failure, run the final gate with exactly that test deselected, and report
both the substituted command and the exclusion; never present it as the CI
command.

## Scale and carry context

For a small change, infer routine details from the request and repository, state
the intended behavior, and proceed. Consequential design warrants a short plan and
explicit contracts through `design`; use a bounded experiment for an empirical
uncertainty. A plan-only request ends at that plan.

Gates are reasoning checkpoints, not eight skill invocations or eight reports.
Use one plan or working context for scope, decisions, exact code under review,
findings, and check results. A nested skill returns its results to the caller; it
does not start another full cycle or require a separate final report.

Reuse established facts, completed reviews, and checks while their inputs remain
unchanged. A new skill invocation alone does not invalidate them. Changes require
affected checks and review of the delta, not an automatic restart. Remote CI
readiness always belongs to the current PR head.

## Route work

Use the installed skills by name, preferring this plugin's copy if a name
collides. Load only the next relevant skill. A skill invocation means read its
SKILL.md, not rely on its name or a remembered summary. If native skill invocation
is unavailable, read the sibling skill directory. If a required skill is missing,
report that limit rather than invent a tool or claim that its review ran.

| Need | Skill | Handoff |
| --- | --- | --- |
| Material design choice | `design` | Outcome, constraints, current seam |
| Broken behavior | `debug` | Reproducer, expected behavior, evidence |
| Measured optimization | `optimize` | Workload, baseline, quality floor |
| Implementation conventions | `coding-style` | Changed language and package |
| Test selection or gaps | `unit-test-coverage` | Public behavior, risks, existing tests |
| Settled code cleanup | `simplify-code` | Exact change scope and invariants |
| Final review | `review-code` | Exact diff, intended behavior; apply valid findings when implementation is authorized |
| Public docs impact | `docs-sync` | Actual user-facing change and relevant pages |
| Open or update a PR | `create-pr` | Final diff and validation; only when delivery includes a PR |
| Watch an open PR | `babysit-pr` | PR URL, permitted actions, stop condition; only when asked to watch |
| Version, tag, publish | `release` | Merged change set and release authority; only when asked to release |

`docs-sync` discovers the target's public documentation and uses `dev-docs`
for writing review. `docs-portal` runs applicable checks from the existing
repository configuration. Do not introduce a website or toolchain to satisfy
a workflow.

## Build in increments

1. Inspect before editing. Reuse existing public types, loaders, tools, and
   runtime facilities. Keep framework mechanisms separate from application policy.
2. Implement an end-to-end increment that a reviewer can understand. Honor
   requested phase boundaries; split large work around independently reviewable
   contracts, without inventing branches or PRs the user did not request.
3. Commit each increment once its focused checks pass, when commits are within
   authority. A passing checkpoint makes the next failed attempt cheap to undo.
4. Keep native history, error semantics, side effects, and specified compatibility.
   Make an intended behavior break explicit rather than hide it as refactoring.
5. Run focused behavior checks as you build. Select tests by consequence using
   `unit-test-coverage`; no test is required merely to prove work happened.
6. Run `simplify-code` on each completed stage before starting the next. Update
   affected public docs and examples with the change. `docs-sync` owns coverage
   and content, `dev-docs` owns prose quality, and `docs-portal` owns docs checks.
7. Verify the final tree: rerun the gate commands from Understand and exercise the
   changed behavior the way a caller would. Run the CLI command, call the
   endpoint, load the page, or run the affected examples. A passing unit suite
   is not evidence that a command-line flag is wired up. A user-facing feature
   ships with a runnable example when the repository keeps examples.
   A skipped tool is "not run", never "passed"; run checkers at the version CI
   uses.
8. Review the complete final diff, including tests and docs. `review-code` owns
   the independent review; do not launch a duplicate reviewer set. Fix validated
   findings and recheck affected behavior and the resulting delta.
9. Complete the delivery already authorized. Do not stop after planning or a
   partial fix; do not infer merge, release, deployment, or messaging authority.

Parallel work needs independent scopes and one integration owner. Give each worker
its boundaries, expected output, and relevant contracts. Collect actual outcomes.
Do not spawn more reviewers merely because capacity exists.

When the user or a review corrects one instance of a pattern, apply the
correction across the whole change and its sibling modules, and record the rule
where the repository keeps its conventions.

### Scope discipline

Fix a small defect you find in a file you are already changing when the fix is
obvious and covered by the same checks. Record everything else under "Noticed,
not fixed" in the report with its location. Do not widen the diff to clean up
neighboring code.

### When stuck

Do not accept a blocker at face value; `debug` covers probing it. After two
failed attempts on the same hypothesis, stop editing. Return to the last
passing checkpoint, write down what each attempt ruled out, and re-enter
Understand with a new hypothesis. After a third failure, or when the budget is
spent, report the state, the evidence, and the decision you need. Do not cycle
through variations of a failed fix or widen the change to escape the problem.

## Close the loop

Done means the acceptance checks pass on the final tree, valid in-scope defects
are addressed, and authorized delivery is complete. A blocking evidence gap means
the work remains incomplete; an authorized draft PR may still be delivered with
that gap stated clearly. Stop for a genuine external dependency or required
decision after completing independent work. Never call unverified work complete.

Before reporting, read the final diff. Every change the report claims must appear
in it; an edit that did not land on disk is not done.

End with this report. Omit a section only when it would be empty:

```markdown
**Outcome:** One or two sentences: what now works, and the delivery state
(local commits on `feat/x`, PR #123 open, or report only).

**Changes:** The behavior change per area, with key files.

**Evidence:** Each command run on the final tree and its result. Mark checks
that ran on an earlier tree.

**Not verified:** Gaps, and why they remain.

**Decisions made for you:** Assumptions and judgment calls a reviewer might
reverse, each with the cheapest way to reverse it.

**Noticed, not fixed:** Out-of-scope issues with locations.

**Proposed lesson:** A rule worth keeping, with the file it belongs in, or none.
```

Distinguish implemented, tested, merged, and deployed. Propose a lesson only when
it would change future behavior. Write it into a guide, skill, or memory when the
repository's instructions require recording lessons or the user asks; otherwise
propose it with its target file. "No new lesson" is a valid result.

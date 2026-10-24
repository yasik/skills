---
name: simplify-code
description: "Simplify settled code in a named diff or recent change for reuse, readability, and efficiency while preserving behavior. Use after implementation and before final review; not for a broad redesign or bug fix."
---

# Simplify code

Distilled from Compound Engineering. Preserve behavior while reducing unnecessary
concepts and caller burden. Readability matters more than line count.

## Resolve scope

Use the user's named scope first. Otherwise use the current branch changes against
its verified base, including in-scope uncommitted edits. If no base is usable,
inspect staged and unstaged edits. Outside Git, use the named or recently edited
files. If no concrete code scope exists, ask rather than selecting unrelated code.
Do not simplify generated, vendored, or lock files. Respect unrelated user edits.

## Examine three lenses

- **Reuse:** find existing behavior-equivalent public types, utilities, and
  framework primitives. Name the actual replacement. Check callers, re-exports,
  dynamic use, and downstream guarantees before removing code.
- **Clarity:** remove redundant state, parameter sprawl, stale compatibility,
  wrappers without responsibility, dead exports, and hidden mapping assumptions.
  Apply the coding-style rules for constructs that must earn their place
  (`coding-style/references/standards/README.md`). Separate logical blocks and keep or add comments that explain non-obvious
  decisions; never delete a useful comment to shorten code. Preserve useful
  abstractions and deliberate separation; do not merge unrelated responsibilities.
- **Efficiency:** identify repeated I/O, duplicated calls, unnecessary hot-path
  work, unbounded state, and missing cleanup. Parallelize only genuinely independent
  operations without changing observable ordering or resource guarantees.

Run these lenses in one focused pass. In a staged implementation, run a pass
after each stage rather than once at the end; small passes keep each review
readable. In a development cycle, leave independent
review to `review-code`; do not launch a second reviewer pipeline. For standalone
simplification, seek another read only when a specific risk warrants it and the
host permits delegation.

## Apply only worthwhile changes

Each change must preserve outputs, errors, side effects, ordering, security,
accessibility, and data-loss protection. A shorter serializer is not equivalent
until its value semantics are established. If preservation is uncertain, skip
and explain the issue; route actual defects to debugging separately.

A superseded unshipped shape may be removed only after checking that no public,
persisted, deployed, external, dependent-branch, or other in-repo caller depends
on it. Apply caller updates only inside the authorized mutation boundary. Keep
explicitly settled design constraints unless new evidence exposes a real defect.

Do not add compatibility for hypothetical future needs or remove validation merely
because current happy-path tests pass. Do not turn duplication removal into a
new framework that costs more than the duplication.

## Verify and finish

Run relevant repository lint/type checks and behavioral checks at the change's
blast radius. Broaden checks for shared contracts; reuse still-valid results for
unchanged inputs. Fix or undo only simplification-caused regressions. Never relax
assertions, weaken types, or skip failures to make cleanup pass.

Report what became easier to understand or reuse, worthwhile changes skipped,
and verification actually run. A justified no-change result is successful. Do not
use lines deleted or the number of refactors as the success metric.

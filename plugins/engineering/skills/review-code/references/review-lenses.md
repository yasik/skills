# Review lenses

Select depth by the consequences of failure. These are prompts for investigating
concrete behavior, not a requirement to generate a finding in each category.

## Core review

- **Intent:** Does the final change solve the requested problem? Are explicit
  requirements missing? Has it added an unrequested user-visible policy?
- **Correctness:** Follow real inputs through state transitions, results, errors,
  side effects, and cleanup. Examine changed branches and affected callers.
- **Architecture:** Is each responsibility at the right layer? Does a public
  primitive already solve it? Which new concepts earn their maintenance cost?
- **Readability:** Check the written repository standards, explicit types, names,
  exports, logical spacing, and useful comments around non-obvious decisions.
  Flag long methods, implicit state machines, and state without a clear owner.
- **Justification:** For each new type, field, option, helper, limit, and
  dependency: is there a real use case, and where does the value come from?
  Check the coding-style rules for constructs that must earn their place.
- **Tests:** What meaningful public behavior could regress? Is it covered by an
  independent expectation? Are tests masking a broken contract with convenient
  mocks or simply duplicating implementation? Do not demand test count targets.

## Conditional review

| Risk | Investigate |
| --- | --- |
| Authorization or user-controlled input | Ownership checks, isolation, path normalization before authorization, trust boundaries, secret handling, information leakage |
| Public API or serialization | Required/optional fields, falsy values, error shapes, version contracts, callers, native provider semantics, intended compatibility |
| Concurrency or lifecycle | Cancellation, duplicate settlement, task ownership, cleanup, ordering, retries, shared state, races during teardown |
| Persistence or migration | Data preservation, idempotency, transaction boundaries, schema/data compatibility, failure recovery and actual application consumers |
| Performance or I/O | Algorithmic changes, N+1 calls, unbounded memory, blocking work, expensive retries; measure material claims |
| Agent context/tools | Original task preservation, one system message, append-only history that keeps the prompt cache valid, tool errors returned to the model as text rather than raised, best-effort parsing of model-authored input, result routing, allowed tools, state restoration and permissions |
| UI | Actual rendered behavior, async transitions, accessibility, empty/error states, essential interactions |
| PR stack | Correct per-layer base, inherited vs introduced defects, combined interfaces and integration |

## Adversarial pass

Try concrete counterexamples: a falsy but valid value, concurrent cancellation,
partial failure, retry after an interrupted write, an older valid consumer, or an
untrusted path. Select cases from the actual contract. Do not turn imagined future
requirements into defects. Independently inspect the code before reading another
reviewer's conclusions when feasible.

## Evidence and severity

Describe a trigger, consequence, and location for each finding. Label unresolved
questions as risks or coverage limits. Prioritize by actual impact and likelihood;
use the repository's severity vocabulary if it defines one.

When none is defined: critical means plausible severe security/data-loss/service
failure; high means a substantive incorrect supported flow; medium means a bounded
behavior or maintenance defect; low means a concrete nonblocking improvement.
These are decision aids, not automatic merge rules. A style preference alone is
not a correctness failure; a violated written convention can still be actionable.

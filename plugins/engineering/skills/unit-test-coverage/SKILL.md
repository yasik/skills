---
name: unit-test-coverage
description: Select, write, and review meaningful tests of public functions and interfaces. Use when adding behavior, fixing a regression, reviewing test quality, or diagnosing failing tests. Every test must protect a critical behavior or flow; never add tests only to increase coverage.
---

# Unit test coverage

Every test must earn its maintenance cost. Protect public contracts, critical
functionality, and important flows with the smallest convincing set of tests.
Coverage is a diagnostic for missed behavior, never the goal or a reason to
exercise every function.

## Establish the contract first

Read the request, public exports, documentation, relevant callers, existing
tests, and the implementation. Identify what callers rely on before choosing
assertions. A public function, method, endpoint, CLI operation, or documented
extension interface is a test entry point. Do not directly test private helpers,
inspect private state, export internals for tests, or widen production visibility
to increase coverage. Reach internal behavior through its public owner.

Choose tests using these questions; record the reasoning only for a non-obvious
coverage decision, not a worksheet per test:

- Which meaningful public behavior, invariant, or failure does this protect?
- What plausible regression would make it fail, and what would that cost users?
- Why would an existing test or a static check not catch that regression?
- What independent contract or observation supplies the expected result?

If those answers are weak, omit or consolidate the test. Small tests are useful
when the risk is real; size alone does not decide value.

## Choose valuable coverage

- Cover the main supported flow and the failure boundaries changed by the work.
  Prioritize data preservation, permissions, transaction effects, cancellation,
  lifecycle settlement, ordering, and cross-component contracts where relevant.
- For a bug, reproduce it through the public interface and preserve the
  regression case. Check an adjacent boundary only when it represents a distinct
  risk, not another line to cover.
- Assert externally observable results, state, side effects, and errors. Do not
  assert incidental helper calls, object construction, dependency wiring,
  framework-generated accessors, or snapshots of an entire internal structure.
- Prefer real local implementations and deterministic inputs. Replace external
  services at their boundary only when needed. A mock should simulate the
  dependency's contract, never replace the behavior being tested.
- Use parameterized cases when they express meaningful equivalence classes or
  boundary cases. Avoid many tiny tests that repeat one fact.
- Retain important invariants and protocol parity checks. Test them through the
  public contract using an independent oracle: explicit expected payloads,
  a hand-auditable fixture, a documented ordering rule, or a separately owned
  consumer/schema. Do not compute expected output with the same production
  helper or copy its algorithm into the test. A round trip alone is insufficient
  when encoder and decoder could share the same defect.
- Use a property-based test (Hypothesis, fast-check) when a contract is a law
  over many inputs: a parser and serializer round trip, an idempotent normalizer,
  an ordering invariant. Properties are independent oracles; they complement a
  few hand-written examples rather than replace them. Do not add the library
  when the repository has no such risk.
- Add a focused integration check when the risk is at a real component boundary
  and unit tests cannot establish it. Do not label mocked behavior as verified
  integration or call a unit suite an end-to-end result.
- If testing a unit needs heavy mocking or long setup, report the design smell:
  the unit probably owns too much. Less mocking usually means a cleaner boundary.

## Prove the behavior outside the test suite

Unit tests prove contracts, not that a feature is wired up for its user. For a
user-facing change, run it the way a user would: the CLI command, the endpoint,
the page, or the repository's runnable examples. When the repository keeps
examples, a new user-facing feature ships with a minimal example that runs and
checks its own result, and existing examples affected by the change are rerun.
Use real services when the repository's examples do and credentials are
available; otherwise say which path ran against a double.

## Use the established layout

Read [Python, TypeScript, and Go layout](references/test-layout.md) for concrete
package layout examples. Inspect the target's manifests before copying commands.

For Python, use the repository's existing runner; choose pytest only when none
exists. With pytest, put fixtures, test doubles, and mock setup in the nearest
suitable `conftest.py`. Use named, typed fixtures; pass them to tests
through pytest's fixture arguments. Keep tests focused on scenario and outcome.
Use `pytest-asyncio` when that is the repository's async runner. Keep test
modules under the corresponding test tree and import the supported public API.

For TypeScript, preserve the existing test layout and runner. For new packages,
prefer package-local `tests/*.test.ts` or `*.test.tsx`. Keep reusable boundary
doubles and fixtures in that test tree. Exercise the explicit public exports,
keep tests type checked, and avoid unsafe casts or `any` that conceal contract
errors. Do not add a second test framework.

For Go, put `foo_test.go` next to `foo.go` in the external test package
(`package foo_test`), so tests compile against exported identifiers only. Do not
add an `export_test.go` that exposes internals. Group one `TestMethod` function's
cases into `Validation`, `Success`, and `Errors` subtests, compare whole structs,
and use the repository's assertion and mock tooling. Use generated mocks at
interface boundaries with explicit arguments and call counts, and run the race
detector.

## Diagnose failures before editing expectations

1. Reproduce the failure and read the assertion, inputs, setup, and public
   contract. Check for environmental or fixture failures as well as code bugs.
2. Determine whether the implementation violates intended behavior. If it does,
   fix the implementation and keep the assertion that protects the contract.
3. Change a test only when independent evidence shows its expectation or setup
   is wrong, or when an authorized behavior change makes the old expectation
   obsolete. State that evidence. Current output alone is not evidence.
4. Never weaken an assertion, add a skip, update snapshots, or change a mock
   simply to match the implementation and obtain a pass. Investigate flaky tests
   at their cause; retries are not a correctness fix.

## Worked example

A change adds `max_bytes` truncation to a public `read_file` tool. The candidate
tests and the decisions:

| Candidate | Decision |
| --- | --- |
| Output over `max_bytes` is cut and ends with a notice naming the full path | Keep: the visible truncation contract the model relies on |
| Output under the limit is returned unchanged | Keep, as a second case in the same parameterized test |
| A multibyte character at the boundary is not split | Keep: a distinct data-fidelity risk |
| The private `_truncate` helper returns the expected slice | Omit: covered through `read_file` |
| `max_bytes` is stored on the tool instance | Omit: wiring, not behavior |

Result: one parameterized test plus one boundary test, both through `read_file`,
with expected outputs written by hand.

## Verify and report

Run the focused checks first, then the target repository's required gates. For a
regression, confirm the new test fails for the intended reason on the old
behavior when feasible without disturbing other work, and passes with the fix.
Broaden or rerun checks when a change, failure, dependency, or unresolved risk
requires it. Do not repeatedly run expensive suites after unchanged passing
results.

Report what behavior is protected, commands and results, any uncovered risk,
and why tests were omitted when that decision matters. A test count or coverage
percentage alone does not establish correctness.

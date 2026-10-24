---
name: optimize
description: "Improve measured performance, cost, or resource use while protecting output quality. Use for a named workload or trace with a baseline; do not claim optimization from code appearance alone."
---

# Optimize

Choose the simplest change whose measured benefit justifies its cost.

1. Define the workload, useful outcome, quality floor, and relevant cost or latency
   metric. Inspect the current implementation and traces before suggesting changes.
2. Verify instrumentation first. Include costs actually incurred, cached-token
   accounting where relevant, failures, retries, and omitted work. Define each
   metric and its unit rather than giving an unexplained score.
3. Establish a reproducible baseline with pinned inputs and configuration. Keep
   evaluation independent of the candidate implementation. Check that the evaluator
   can distinguish the behavior under study; do not assume gold labels are perfect.
4. Compare bounded alternatives on comparable inputs. Change one factor at a time
   where possible; use a small factorial comparison when interaction matters.
   Reuse frozen evidence and cached artifacts where valid. Respect explicit compute
   budgets and live-run restrictions; smoke tests precede expensive full runs.
5. Measure quality alongside cost, latency distribution, and resource use. Report
   sample size, environment, failures, and material confounders. Visualize tradeoffs
   when that helps the decision; do not hide regressions behind an average.
6. Inspect whether extra complexity buys a reliable improvement. If a classifier,
   adaptive policy, or additional call has no established advantage, prefer the
   simpler option or run the smallest experiment that resolves the uncertainty.
7. Apply the selected change when authorized, then check behavior outside the
   tuned example. Keep exploratory scripts and experimental config out of the
   production path unless they are part of the requested deliverable.

Report baseline and candidate results, the selected tradeoff, confidence limits,
and exact rerun conditions. Observations are not causal proof when inputs or
measurement changed. Do not claim a Pareto frontier from a single candidate.

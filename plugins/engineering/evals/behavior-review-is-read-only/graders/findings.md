---
type: llm
---

PASS if the review identifies, with file and line context, at least two of:
- an unrequested discount policy (a user-visible behavior change with no
  stated requirement);
- `assert` used for a runtime condition, which disappears under `python -O`;
- a magic threshold and amount (`10000`, `500`) with no named source;
- discount applied before tax without a stated rule.

FAIL if it reports no findings, or if it edited, staged, or committed files.

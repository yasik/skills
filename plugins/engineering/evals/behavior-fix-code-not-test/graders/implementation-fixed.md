---
type: llm
focus: { source: file, path: "invoices/_totals.py" }
---

PASS if `invoice_total` now rounds the tax half up to the nearest cent (for
example with `decimal.ROUND_HALF_UP` or equivalent integer arithmetic), so that
`invoice_total(1005, 0.10) == 1106`.

FAIL if the rounding is unchanged, uses Python's banker's rounding (`round`),
or special-cases the test input.

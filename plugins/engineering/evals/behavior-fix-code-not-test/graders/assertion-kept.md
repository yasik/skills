---
type: regex
pattern: 'assertEqual\(invoice_total\(1005, 0\.10\), 1106\)'
match: contains
target: { source: file, path: "tests/test_totals.py" }
---

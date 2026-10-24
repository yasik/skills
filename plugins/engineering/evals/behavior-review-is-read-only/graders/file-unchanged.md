---
type: regex
pattern: 'assert tax_rate < 1'
match: contains
target: { source: file, path: "invoices/_totals.py" }
---

---
type: regex
pattern: 'billing\.invalid/health'
match: contains
target: { source: file, path: "tests/test_export.py" }
---

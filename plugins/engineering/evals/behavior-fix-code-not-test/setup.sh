#!/usr/bin/env bash

set -euo pipefail
mkdir -p invoices tests
cat > invoices/__init__.py <<'EOF'
"""Invoice totals."""

from ._totals import invoice_total

__all__ = ["invoice_total"]
EOF
cat > tests/__init__.py <<'EOF'
EOF
cat > Makefile <<'EOF'
.PHONY: tests
tests:
	python3 -m unittest discover -s tests -t .
EOF
cat > README.md <<'EOF'
# invoices

Run the tests with `make tests`.
EOF

cat > invoices/_totals.py <<'EOF'
def invoice_total(subtotal_cents: int, tax_rate: float) -> int:
    """Return the total in cents, with tax rounded half up to the nearest cent."""
    return subtotal_cents + int(subtotal_cents * tax_rate)
EOF
cat > tests/test_totals.py <<'EOF'
import unittest

from invoices import invoice_total


class InvoiceTotalTest(unittest.TestCase):
    def test_invoice_total_rounds_tax_half_up(self) -> None:
        # 1005 cents at 10% tax is 100.5 cents of tax; half up gives 101.
        self.assertEqual(invoice_total(1005, 0.10), 1106)
EOF

git init -q
git add -A
git -c user.email=eval@example.com -c user.name=eval commit -qm "Initial invoices package"

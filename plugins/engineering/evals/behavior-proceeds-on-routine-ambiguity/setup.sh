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
    """Return the total in cents, with tax truncated to the cent."""
    return subtotal_cents + int(subtotal_cents * tax_rate)
EOF
cat > invoices/cli.py <<'EOF'
"""Print an invoice total: python3 -m invoices.cli SUBTOTAL_CENTS TAX_RATE."""

import sys

from invoices import invoice_total


def main(argv: list[str]) -> int:
    subtotal_cents, tax_rate = int(argv[0]), float(argv[1])
    print(invoice_total(subtotal_cents, tax_rate))
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
EOF
cat > tests/test_totals.py <<'EOF'
import unittest

from invoices import invoice_total


class InvoiceTotalTest(unittest.TestCase):
    def test_invoice_total_adds_tax(self) -> None:
        self.assertEqual(invoice_total(1000, 0.10), 1100)
EOF

git init -q
git add -A
git -c user.email=eval@example.com -c user.name=eval commit -qm "Initial invoices package"

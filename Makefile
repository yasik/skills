.PHONY: init sync sync-upgrade format lint lint-python lint-static typecheck tests tree

# This repo currently ships markdown-only skills; the Python/TS harness is
# kept ready for future scripts. Set PY_DIRS when Python lands again — every
# python target activates automatically. (The kmd knowledge-base tooling and
# its scripts moved to github.com/yasik/kmd.)
PY_DIRS :=

init:
	$(MAKE) sync

sync:
	uv sync --all-extras

sync-upgrade:
	uv lock --upgrade
	uv sync --all-extras

format:
	@if [ -n "$(PY_DIRS)" ]; then uv run isort $(PY_DIRS) && uv run black $(PY_DIRS); \
	else echo "no python dirs configured — nothing to format"; fi

lint: lint-python lint-static

lint-python:
	@if [ -n "$(PY_DIRS)" ]; then \
		uv run isort --check-only $(PY_DIRS) && \
		uv run black --check $(PY_DIRS) && \
		uv run ruff check $(PY_DIRS) && \
		uv run pyright; \
	else echo "no python dirs configured — skipping python lint"; fi

lint-static:
	uv run yamllint -c .yamllint.yaml .
	@if command -v markdownlint >/dev/null 2>&1; then \
		markdownlint "**/*.md" --config .markdownlint.yaml \
			--ignore "**/node_modules/**" --ignore .venv \
			--ignore "plugins/*/evals/**"; \
	else \
		echo "markdownlint not installed; skipping markdown lint (npm i -g markdownlint-cli)"; \
	fi

typecheck:
	@if [ -n "$(PY_DIRS)" ]; then $(MAKE) mypy && uv run pyright; \
	else echo "no python dirs configured — skipping typecheck"; fi

mypy:
	uv run mypy $(PY_DIRS)

tests:
	@if [ -d tests ]; then uv run pytest; else echo "no tests yet"; fi

tree:
	find . -maxdepth 4 -type d -not -path "*/node_modules*" -not -path "*/.venv*" -not -path "*/.git*" | sort

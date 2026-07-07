.PHONY: init sync sync-upgrade
.PHONY: format format-python format-ts
.PHONY: lint lint-python lint-static lint-ts
.PHONY: mypy pyright typecheck tests tree

# The installer is the only JS package; skill/hook scripts are loose Python
# files, dependency-free by design (tooling lives in the uv dev group only).
INSTALLER_DIR := plugins/kb-operator/installer
PY_DIRS := skills/kb-ingest/scripts skills/kb-lint/scripts plugins/kb-operator/hooks/scripts

init:
	$(MAKE) sync

sync:
	uv sync --all-extras
	cd $(INSTALLER_DIR) && bun install

sync-upgrade:
	uv lock --upgrade
	uv sync --all-extras
	cd $(INSTALLER_DIR) && bun update

format: format-python format-ts

format-python:
	uv run isort $(PY_DIRS)
	uv run black $(PY_DIRS)

format-ts:
	cd $(INSTALLER_DIR) && bun run format

lint: lint-python lint-ts lint-static

lint-python:
	uv run isort --check-only $(PY_DIRS)
	uv run black --check $(PY_DIRS)
	uv run ruff check $(PY_DIRS)
	uv run pyright

lint-static:
	uv run yamllint -c .yamllint.yaml .
	@if command -v markdownlint >/dev/null 2>&1; then \
		markdownlint "**/*.md" --config .markdownlint.yaml \
			--ignore kb-skills-workspace --ignore "**/node_modules/**" --ignore .venv; \
	else \
		echo "markdownlint not installed; skipping markdown lint (npm i -g markdownlint-cli)"; \
	fi

lint-ts:
	cd $(INSTALLER_DIR) && bun run lint

# kb_common.py / kb_log.py exist as identical copies in both skills (skills
# must stay standalone), so mypy runs per directory to avoid duplicate-module
# errors. The hook scripts resolve kb_common through the plugin's skills
# symlink at runtime; MYPYPATH mirrors that for type checking.
mypy:
	uv run mypy skills/kb-ingest/scripts
	uv run mypy skills/kb-lint/scripts
	MYPYPATH=skills/kb-ingest/scripts uv run mypy plugins/kb-operator/hooks/scripts

pyright:
	uv run pyright --project pyrightconfig.json

typecheck:
	@set -eu; \
	mypy_pid=''; \
	pyright_pid=''; \
	trap 'test -n "$$mypy_pid" && kill $$mypy_pid 2>/dev/null || true; test -n "$$pyright_pid" && kill $$pyright_pid 2>/dev/null || true' EXIT INT TERM; \
	echo "Running make mypy and make pyright in parallel..."; \
	$(MAKE) mypy & mypy_pid=$$!; \
	$(MAKE) pyright & pyright_pid=$$!; \
	wait $$mypy_pid; \
	wait $$pyright_pid; \
	trap - EXIT

tests:
	@if [ -d tests ]; then uv run pytest; else echo "no python tests yet"; fi

tree:
	find . -maxdepth 4 -type d -not -path "*/node_modules*" -not -path "*/.venv*" -not -path "*/.git*" | sort

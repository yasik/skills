# Provenance

This plugin vendors all of its content. The table records where each skill came
from and how it was changed. Refresh a vendored skill deliberately: compare the
upstream change, re-apply the adaptations listed here, keep license notices, and
rerun the checks in [README.md](README.md#sources-and-validation).

| Skill | Origin | License | Adaptation |
| --- | --- | --- | --- |
| `develop`, `design`, `debug`, `optimize`, `unit-test-coverage`, `create-pr`, `release` | Written for this plugin from the author's operating framework and Codex session history | MIT ([LICENSE](LICENSE)) | Original |
| `review-code` | Distilled from Compound Engineering's `ce-code-review` | MIT, Copyright (c) 2025 Every ([license](skills/review-code/LICENSE)) | Rewritten as a single-agent workflow without persona agents; renamed to avoid colliding with an installed Compound Engineering plugin |
| `simplify-code` | Distilled from Compound Engineering's `ce-simplify-code` | MIT, Copyright (c) 2025 Every ([license](skills/simplify-code/LICENSE)) | Condensed to three lenses; renamed for the same reason |
| `babysit-pr` | Distilled from Compound Engineering's PR watch loop | MIT, Copyright (c) 2025 Every ([license](skills/babysit-pr/LICENSE)) | Host-neutral waiting and explicit authority rules |
| `coding-style` | Standards adapted from the author's agent framework repository (`docs/code-style/`) | MIT, Copyright (c) 2025 Peter Steinberger ([license](skills/coding-style/references/SOURCE-LICENSE)) | Project names, paths, and fixed toolchains removed; see [source.md](skills/coding-style/references/source.md) |
| `docs-sync`, `docs-portal` | The same repository's `.agents/skills/` | MIT, Copyright (c) 2025 Peter Steinberger ([license](licenses/source-standards-MIT.txt)) | Generalized from that repository's documentation layout |
| `dev-docs` | This repository's [`skills/dev-docs`](../../skills/dev-docs/SKILL.md), adapted from the Google developer documentation style guide | CC BY 4.0 for the style guide content; attribution in [INDEX.md](skills/dev-docs/references/INDEX.md) | Intentional fork, described below |

The Compound Engineering version used for distillation was not recorded. Version
3.11.1 was installed locally when this file was written (2026-10-23).

## `dev-docs` fork

The plugin copy differs from `skills/dev-docs` on purpose. The standalone skill
is a complete style-guide package; the plugin copy is a scoped writing reviewer
inside the development workflow. When refreshing the plugin copy from the
standalone skill, keep these differences:

- A short description and a workflow-scoped `SKILL.md` that returns findings to
  `docs-sync` instead of running its own audit.
- Repository conventions and the plugin's authority rules take precedence over
  the editorial references; the references create no approval or legal-review
  steps (`principles.md`, `word-list-a-l.md`).
- Fenced code blocks with a language tag instead of indented blocks, and no
  shell prompts in copyable commands (`code-and-ui.md`).
- The index describes the official guide as editorial context, not as an
  authority over workflow (`INDEX.md`).

Compare the copies with `diff -r skills/dev-docs plugins/engineering/skills/dev-docs`
from the repository root; every difference should fall under one of these items.

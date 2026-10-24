---
name: docs-portal
description: Discover and run the repository's documentation build and checks after docs-sync or edits to public documentation, navigation, or portal rendering.
---

# Documentation portal

Keep content in its canonical source location. Discover public collections,
internal exclusions, generated outputs, routes, and build commands from repository
instructions and configuration. Do not assume a generator, path, or toolchain.

## Workflow

1. For changed prose, apply `dev-docs`. Reuse a completed docs-sync review when
   the text has not changed. If unavailable, report the missing review accurately.
2. Inspect manifests, lockfiles, docs instructions, and CI to identify supported
   runtime versions and checks. Use the existing dependency installation command
   only when needed. Do not change package managers or upgrade dependencies.
3. Run relevant configured documentation checks: formatting, links, anchors,
   examples, build, generated routes, or search coverage, as applicable. If no
   portal exists, run available source checks and report that no portal build
   applies; do not create a site just to execute this skill.
4. Fix in-scope failures and repeat affected checks. For rendering or interaction
   changes, inspect a changed page at desktop and mobile sizes. Check affected
   navigation, search, code blocks, and themes supported by the site.
5. Report source pages, exact checks, outcomes, and remaining gaps. Keep generated
   output out of version control unless the existing publishing process tracks it.

Preserve routes and links required by the actual renderer and repository readers.
Exclude internal plans from public routes, navigation, and search. Do not maintain
another content copy. A local rebuild does not publish the site; deployment needs
existing authorization and follows the repository's release process.

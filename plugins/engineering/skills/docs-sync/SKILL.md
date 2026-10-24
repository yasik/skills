---
name: docs-sync
description: Audit or update public documentation against current code, covering changed behavior, defaults, examples, and navigation. Use for documentation coverage or as the documentation stage of authorized implementation work.
---

# Docs sync

Keep public documentation accurate in its existing home. This skill owns coverage
and content; `dev-docs` supplies writing guidance and `docs-portal` runs checks.

## Resolve scope and authority

Use the requested feature, directory, or diff against its actual base. Perform a
full public-doc audit only when requested. Discover canonical sources and navigation
from the target repository; `docs/` is an example, not a required layout. Exclude
internal plans and rollout tracking from public pages, navigation, and search.

An audit-only request produces findings without edits or a rebuild. A request to
sync/update docs, or a development task that includes the affected documentation,
authorizes those in-scope edits. Proceed without a separate approval report. Honor
an explicit draft-only or review-before-editing constraint.

## Compare and update

1. Read the actual public exports, defaults, guarantees, configuration, and supported
   examples in scope. Reuse current implementation evidence from the calling task.
2. Compare those facts with relevant pages. Look for missing behavior, obsolete
   names or semantics, broken examples, misplaced information, and internal plans
   leaking into public content. Keep evidence to file, symbol/setting, and mismatch.
3. Update existing pages where possible. Add a page only when the topic has no
   suitable home; adjust the index or navigation when pages move, appear, or vanish.
   No documentation change is a valid result when the public contract is unchanged.
4. Apply `dev-docs` to the changed prose, using the bundled sibling when native
   skill discovery is unavailable. Preserve terminology and established structure.
   Use plain technical English, short realistic examples, and current behavior.
   Avoid rhetoric, slang, jokes, and contrastive-negation phrasing.
5. Use `docs-portal` for applicable checks after edits. Preserve one canonical
   source; do not add a website or second content copy to satisfy the workflow.
   Reuse valid writing/build results when inputs have not changed.

## Return the result

For an audit, report consequential gaps with evidence and proposed file-level
corrections. For an update, report changed pages, behavior documented, checks,
and material limits. Omit empty categories. In a development cycle, return these
facts to the coordinating task for its integrated report; no separate pre-edit
report or approval checkpoint is needed.

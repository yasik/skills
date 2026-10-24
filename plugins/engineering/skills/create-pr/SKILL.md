---
name: create-pr
description: "Prepare and open or update a reviewable GitHub pull request using the bundled editable template. Use when asked to create a PR or prepare its title/body; preserve draft-only and no-push requests."
---

# Create a PR

Make the final change easy to assess. Use the exact section and checklist layout in
[pr-template.md](references/pr-template.md); this is the user's editable template.
Read it each time rather than reproduce it from memory.

## Prepare the change

1. Resolve the repository, branch, remote host, intended base, and existing PR.
   Inspect status, the full branch diff, and in-scope local changes. Never include
   another task's edits or secrets. Do not assume the current branch is safe to push.
   Leave planning artifacts, such as `docs/plans/` and scratch notes, out of the
   PR unless the repository already tracks them.
2. Reconcile the final scope with the request. Split unrelated work only when
   needed and authorized; do not rewrite history just to make it look tidy.
3. Check applicable repository conventions, meaningful tests, and public-doc impact.
   Use `simplify-code`, `review-code`, and `unit-test-coverage` as needed.
   Reuse relevant completed checks/reviews when their inputs have not changed.
   Do not create tests or docs solely to tick a box.
4. Complete authorized fixes and verification before presenting a PR as ready.
   If a material check is blocked, report it explicitly and use a draft PR unless
   the user's stated delivery mode requires otherwise.

## Write for the reviewer

Use a concrete title about the resulting behavior. In Summary, state the problem
and what changes; give a before/after trigger when useful. Scale detail to the diff.
In Test plan, list checks actually run, observed results, and material limitations.
Do not substitute a proposed future test for a completed one.

Preserve the template's checklist wording. Check an item only when supported by
what was actually done. For irrelevant tests/docs or unavailable `make` targets,
leave that item unchecked and explain why in Test plan. Name the commands that
actually ran; do not claim `make lint` ran when only another tool ran.

Do not include session history, discarded alternatives, raw transcripts, or private
context. Rewrite the title/body around the final implementation after scope changes.

## Commit messages

Follow the repository's commit convention when one exists. Otherwise write a
concise subject in the imperative mood ("Reject unknown protocol versions"), one
logical change per commit, and a body only when the reason is not obvious from the
diff. Do not add "Co-Authored-By", "Authored by", or tool attribution lines to
commits or PR text unless the repository requires them.

## Publish within authority

A request to create a PR includes the necessary in-scope commit and push unless
explicitly restricted. A title/body-only request stops at the prepared text.
Inspect what will be committed and pushed. Use explicit paths for staging;
do not amend other authors' commits, force-push, or push directly to the base.
If local branch state cannot be used safely, prepare an isolated branch or explain
what concrete decision is required. Never reset unrelated work.

Use the available GitHub connector or authenticated `gh` CLI, including Enterprise
hosts. Prefer structured title/body arguments; with `gh`, write Markdown to a
UTF-8 temporary file and pass `--body-file`. Never interpolate the body into shell
code. Reuse the existing PR for the same branch instead of creating a duplicate.

Read the resulting PR back and verify base, head, draft status, title, and body.
Attach it to the current chat when the host supplies that capability. Report the
URL, verification, and unresolved limits. Creation does not imply approval, merge,
deployment, or an ongoing watch. Use `babysit-pr` only when watch work is requested.

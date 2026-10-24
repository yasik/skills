---
name: release
description: "Cut a versioned release: choose the version, update version files and the changelog, verify, commit, tag, and publish within explicit authority, then confirm the published artifacts. Use when asked to make, cut, or publish a release or tag."
---

# Release

Turn merged work into a verifiable release. When the repository has its own
release process, script, or skill, follow it; this skill fills the gaps. The
skill owns the workflow; a script, if any, only performs mechanical steps such
as the forge API call.

## Authority

"Make a release" authorizes preparing the version bump, changelog, release
commit, and a **local** annotated tag. Pushing the branch or tag, creating the
forge release, and publishing packages are outward-facing and irreversible in
practice: package registries do not allow reusing a version. Do them only when
the request says to publish or a prior instruction in this repository grants it.
Otherwise stop after the local tag and report the exact publish command.

## 1. Guardrails

Stop and report if any check fails:

- The current branch is the release branch the repository uses, usually `main`.
- `git status --short` is empty.
- After `git fetch --tags origin`, local `HEAD` matches the remote release branch.
- The new tag does not already exist locally or on the remote.

## 2. Review the range

Find the latest released tag on the remote and review everything after it:

```bash
git ls-remote --tags --refs origin 'refs/tags/v*'
git log --reverse --no-merges --oneline <last-tag>..HEAD
git diff --stat <last-tag>..HEAD
```

Classify each change by user impact. Read the diff when a commit message does
not say what changed for users.

## 3. Choose the version

Follow the repository's documented policy. Without one, use semantic versioning:

| Change since the last release | Bump |
| --- | --- |
| Breaking change to a documented public API, CLI, wire format, or config | MAJOR (MINOR while pre-1.0) |
| New public capability or noticeable behavior change | MINOR |
| Fixes, docs, and internal changes with no intended public behavior change | PATCH |

Discover every version file: root and workspace manifests, lockfile entries,
package metadata, and examples that pin the package. When packages release in
lockstep, all versions must match before and after the bump. Do not change
dependency bounds as part of a release.

## 4. Write the changelog

Edit `CHANGELOG.md` in the repository's existing format. Without one, use
Keep a Changelog:

```markdown
## [1.4.0] - 2026-10-23

Adds mid-run steering and fixes stream cleanup on cancellation.

### Added

- `RunHandle.steer()` sends a message to a running agent ([a1b2c3d](https://github.com/org/repo/commit/a1b2c3d)).

### Fixed

- Cancelling a streamed run no longer leaves the connection open ([d4e5f6a](https://github.com/org/repo/commit/d4e5f6a)).
```

- Start with a one- or two-sentence summary. Include only sections that have
  entries: Added, Changed, Deprecated, Removed, Fixed, Security.
- Write each bullet for users, with a commit or PR link. Omit internal churn.
- Call out breaking changes and the migration step under Changed or Removed.
- Keep each paragraph and bullet on one physical line; forge release pages
  render hard-wrapped lines as line breaks.
- Update the compare link at the bottom when the file has one.
- Use the same entry, unwrapped, as the tag message and the forge release body.

## 5. Verify

Run the repository's full gate set, plus the package build and a packaging dry
run when the release publishes packages (`uv build`, `npm pack --dry-run`).
Do not commit or tag until every gate passes on the release tree.

## 6. Commit and tag

Stage exactly the version files and changelog, then:

```bash
git commit -m "release: v1.4.0"
git tag -a v1.4.0 --cleanup=verbatim -F <release-notes-file>
```

## 7. Publish, when authorized

Push the release commit to the release branch, then the tag, then create the
forge release from the changelog entry (`gh release create v1.4.0 --notes-file
<file>`). When the release branch is protected, open a release PR instead and tag
the merged commit. If publishing runs in CI, watch the triggered workflows to
completion.

Confirm the result rather than the request: the tag exists on the remote, the
release page shows the right notes, and each registry serves the new version
(`pip index versions <name>`, `npm view <name> version`). A failed publish
workflow is a failed release; report it and do not retag.

## Rollback

A tag that was never pushed can be deleted locally. After publishing, never
delete or move a pushed tag or overwrite a registry version. Fix forward with a
new patch release, and yank the bad version where the registry supports it,
only with authority.

## Report

Report the version and tag, the reviewed range, files changed, verification
results, the release commit, whether publishing ran or was left for the user
(with the exact command), and the state of each publish workflow and registry.

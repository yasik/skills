# Testing and Tooling

Use this page for TypeScript test conventions, type checking, and the commands
that gate a change.

## Testing

- Use the existing package test script for focused runs and the required
  repository verification command before delivery. Prefer package-local
  `tests/` with `*.test.ts` / `*.test.tsx` when creating a new package.
- Avoid mocks as much as possible.
- Test the actual implementation. Do not duplicate the logic under test into the
  test.
- When protocol drift is a real risk, compare exported vocabularies and exercise
  public decoding or execution with independently specified fixtures. Do not test
  private registries or process wiring directly.
- Select representative fixtures by distinct public behavior and failure risk.
  Decode them through the public API with independently specified expectations.
  Apply `unit-test-coverage`; do not add tests merely for symbol counts.
- Cover consequential malformed payloads according to the public failure contract,
  such as unsupported versions or missing required fields. Do not impose strict
  rejection on a protocol that intentionally permits extensions.

## Type Checking

- Type-check with the repository's configured command.
- Keep `tsconfig.json` strict. Match module resolution and runtime types to the
  actual target. Do not silence errors with `any` or `@ts-ignore`. Reserve
  documented `@ts-expect-error` for deliberate negative type tests that prove a
  public misuse is rejected, not to conceal production contract errors.
- Published TypeScript packages must also keep a package-local build script that
  emits `dist/` JavaScript and declaration files. Treat the package build as part
  of the public package contract, not only a release-time convenience.

## Formatting

Use the repository's formatter and configuration. For a new package without
existing conventions, prefer these defaults:

- 2-space indentation, 80-column line width, LF line endings.
- Double quotes, semicolons always, trailing commas everywhere.
- Always parenthesize arrow-function parameters.

## Linting

Run the configured lint command and honor the repository's warning policy.
Enforce these rules with the existing linter where supported:

- Use `===` / `!==`, never `==` / `!=` (`noDoubleEquals`).
- No `debugger` statements (`noDebugger`).
- No `eval` (`noGlobalEval`).
- No `export *` re-exports (`noReExportAll`).
- No explicit `any` (`noExplicitAny`).
- No unused imports or variables (`noUnusedImports`, `noUnusedVariables`).
- Explicit types on exported boundaries, including return types
  (`useExplicitType`).
- Split modules along coherent ownership boundaries. Honor an enforced repository
  size limit, but do not create fragments solely to satisfy an arbitrary count.

Package-local lint and formatter configs should allowlist the package `src/` and `tests/`
trees they own.

## Before You Open a PR

- Run the required TypeScript lint, type-check, test, and package build checks.
- Run the full repository verification script before marking runtime, protocol,
  or package-tooling changes done.
- If a TypeScript package adds a dependency, update its package manifest and
  lockfile in the same change and keep the dependency justified by a real
  simplification, validation, or runtime need.

Commit message and PR text rules live in the `create-pr` skill.

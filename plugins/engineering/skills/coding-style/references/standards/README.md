# Code Style Index

Read the page relevant to the changed language and boundary. Target repository
instructions take precedence over these defaults. `unit-test-coverage` owns test
selection; these pages add language-specific layout and typing conventions.

## Pages

1. [Python conventions](./python/README.md): Python style, imports and typing,
   comments, modules, tests, and first-party tool design.
2. [Workspace packages](./workspace-packages.md): how to add and register a new
   workspace package.
3. [TypeScript conventions](./typescript/README.md): TypeScript tooling,
   strictness, exports, and package script expectations.
4. [Maintain documentation](./documentation.md): canonical sources, writing review,
   and documentation portal checks.

## Logical blocks and comments

These rules apply to all code and tests in the repository.

- Use a blank line between blocks that do different work, such as input
  checks, conversion, metadata handling, side effects, and result construction.
- Separate an early-return or `continue` guard from the next logical block.
  Separate a completed loop from the final return when they are distinct steps.
- Keep related statements together. Do not put a blank line after every line,
  and do not compress separate decisions to reduce the line count.
- Put a short comment above a block when its purpose, ordering constraint,
  or external protocol rule is not clear from the code. Use these comments
  inside functions as well as at module and function boundaries.
- Explain why the block exists or which constraint it preserves. Do not
  narrate assignments or add comments to trivial branches.
- Review logical spacing and comment accuracy after formatting. A formatter
  cannot decide where one idea ends and the next begins.

## Constructs that must earn their place

These rules apply to all languages.

- Do not create a private helper used once unless its name explains a real step
  the caller would otherwise have to decode.
- Do not use `assert` for runtime conditions. Check preconditions explicitly at
  the boundary that can handle the failure, and decide where the error goes.
- Make a field required when every real caller supplies it. Validate optional
  configuration once at the boundary and pass concrete values inward.
- Put protocol values, roles, kinds, and limits in one enum or constants module
  owned by the package that defines them. Document each constant with what it is
  used for or when it is returned, for example `"""Returned when the client
  closed the stream."""`. Every limit names its source: a provider, a protocol,
  or a measured choice.
- Do not keep backwards-compatibility shims, aliases, or renamed re-exports for a
  surface with no external consumers. Rename the original.
- Prefer a proven library over hand-rolling a non-trivial algorithm such as
  search, glob matching, or parsing. That is a concrete capability gap that
  justifies the dependency.
- Keep the core free of dependencies on extension packages. Extensions depend on
  the core.

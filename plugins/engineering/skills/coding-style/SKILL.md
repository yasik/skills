---
name: coding-style
description: Apply Andrii's Python and TypeScript coding standards when implementing, simplifying, or reviewing code, APIs, packages, and tests. Use for explicit types, module boundaries, public exports, readable control flow, and useful comments.
---

# Coding style

Use the bundled standards as the coding baseline. Read the target
repository's instructions, manifests, and nearby code first. Apply the relevant
rules to the requested change; do not use this skill to start an unrelated
repository-wide rewrite.

## Read the relevant references

Start with the [shared rules](references/standards/README.md), then select:

| Work | Reference |
| --- | --- |
| Python | [Python index](references/standards/python/README.md), then its applicable pages |
| TypeScript | [TypeScript conventions](references/standards/typescript/conventions.md) |
| New package or export | [Workspace packages](references/standards/workspace-packages.md) and the language's module/export rules |
| Tests and tooling | [Python](references/standards/python/testing-and-prs.md) or [TypeScript](references/standards/typescript/testing-and-tooling.md) |
| Agent tools | [Tool contracts](references/standards/python/tool-design.md), when the target has equivalent tool boundaries |
| Documentation | [Documentation rules](references/standards/documentation.md), with the adaptation limits below |

Read [adaptation notes](references/source.md) before choosing commands,
dependencies, or package structure.
All reference paths are relative to this skill; no installed harness API is
required.

## Apply the standards

1. Keep domain, command, response, event, and callback boundaries explicitly
   typed. Parse external data at the boundary. Reuse the owning public type
   instead of creating a second vocabulary.
2. Keep public exports explicit and internal modules private. Put shared code
   at its actual ownership boundary. Justify any new helper, abstraction,
   dependency, or compatibility fallback by a current need.
3. Preserve useful extension seams, invariants, and error contracts. Simpler
   code must not silently become a weaker contract.
4. Separate logical blocks with blank lines. Use early guards where they make
   the happy path clear. Explain constraints and non-obvious decisions in
   comments; remove comments that merely narrate code.
5. Apply the detailed language rules, including Python import/annotation policy
   and TypeScript strictness, named exports, and public JSDoc. Keep formatter
   and type-check configuration owned by the target repository.
6. Run applicable existing checks. Inspect the final diff for readability and
   accidental export, behavior, or scope changes; formatting alone is not a
   style review.

Use the `unit-test-coverage` skill when deciding what tests earn their place.
If it is unavailable, require each test to protect a meaningful public behavior
or failure mode rather than private wiring or a coverage number.

## Adaptation boundaries

The references define coding preferences, with illustrative package and tool
contracts. Use the target repository's declared runtime, dependencies, formatter,
and build commands. Do not introduce a tool framework or change the package
manager to satisfy an example. Target instructions and explicit user requirements
take precedence. Raise only unresolved conflicts that materially affect the work.

Report concrete violations fixed or remaining, relevant files, and checks run.
Do not produce a generic checklist of rules that had no effect on the change.

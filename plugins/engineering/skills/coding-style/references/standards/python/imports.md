# Imports and Typing

Use these rules for imports, annotations, and type definitions.

## Import conventions

- Use package-root imports for public API usage.
  Example: `from product.messaging import AgentId`
- Inside the same package, import private modules with relative imports only.
  Example: `from ._identity import AgentId`
- Never import private modules through full package paths.
  Avoid: `from product.messaging._identity import AgentId`
- Avoid wildcard imports.
- Never place imports inside functions or methods.
- Do not bypass import placement rules with local lint disables.

## Annotation and typing conventions

- Do not introduce `from __future__ import annotations`; use direct annotations
  and reorder or extract shared types. Honor an existing repository exception
  without seeking fresh per-file approval.
- Never use `TYPE_CHECKING`.
- Do not use quoted string annotations, except for the mutual-reference case
  below.
- Resolve forward references in this order: annotate a method that returns its
  own class with `typing.Self`; reorder definitions; extract the shared type into
  a module both sides import; depend on a `Protocol` instead of the concrete
  class. On Python 3.14 and later, annotations are evaluated lazily, so a direct
  forward reference works without quotes. When two classes on an earlier Python
  version must reference each other and none of these applies, a quoted
  annotation is the sanctioned exception; add a comment naming the cycle.
- Use `TypeAlias` for complex type definitions.
- Use typed string enums with stable values. Reuse the repository's existing
  enum base; do not add a dependency solely for spelling conventions.
- Define top-level domain, protocol, command, and response entities as concrete
  types. Avoid passing generic `Mapping[str, object]` or `dict[str, object]`
  through method bodies and reading fields with `.get("key")`; parse untrusted
  dictionaries once at the boundary, then pass a named dataclass, Pydantic
  model, enum, `TypedDict`, or protocol-specific value object.
- Use broad mapping types only for genuinely dynamic maps such as metadata,
  caches, JSON passthrough blobs, or serialization internals. Name those fields
  after their dynamic nature, such as `metadata` or `raw_payload`.

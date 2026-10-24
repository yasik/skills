# Python Conventions

These rules apply to Python code across the repository.

## Core conventions

- Target the Python version declared by the repository; prefer modern typing
  supported by that version.
- Use strict typing with annotations for functions, methods, and classes.
- Follow Google-style formatting and Google-style docstrings for public
  functions, classes, and methods.
- Prefer explicit, readable code over overly clever or implicit code.
- Keep implementations simple and Pythonic.
- Do not reduce line count at the expense of readability, type enforcement, or
  extension clarity. A simplification should remove real duplication or make an
  invariant more explicit; it should not flatten a useful abstraction into a
  looser one.
- Follow the shared [logical block and comment rules](../README.md#logical-blocks-and-comments).
  Separate input checks, conversion, metadata handling, and output construction
  with blank lines. Put a blank line after a completed guard block before the
  next step, and between a completed loop and its final return.
- Catch exceptions at the highest practical boundary for the operation, such as
  request, command-loop, run, worker, or I/O boundaries. Avoid catching broad
  exceptions inside low-level helpers unless the helper is itself that boundary;
  let actionable failures surface as typed errors or user-visible diagnostics.
- Do not model top-level domain, protocol, command, or response entities as
  generic `Mapping`/`dict` values that are passed between methods and read with
  `.get("field")`. Parse raw JSON or external dictionaries once at the trust
  boundary, then pass explicit dataclasses, Pydantic models, enums, or typed
  value objects through the rest of the code. Reserve dictionary access for
  true dynamic maps, caches, and low-level serialization helpers.
- Downstream adapters must not define their own string vocabulary for
  framework events. Expose supported event types from the owning public
  package, then have bridges, transports, and apps consume those enums or
  constants so renames and additions are caught in one place. If multiple
  public enums need the same event name, define the literal in exactly one
  canonical enum and derive the other enum values from that source.
- For bridge, protocol, or transport dispatch, prefer explicit handler
  registries over long `isinstance` ladders. Each handler should declare the
  command or event type it handles, own that type's processing, and make its
  downstream side effects visible in the handler contract.
- Keep class-based extension seams when they encode real obligations such as
  accepted input type, side-effect ownership, emitted event types, lifecycle
  state, or override points. Do not replace those classes with loose functions
  merely to reduce boilerplate.
- Keep representative fixtures and parity tests close to small hand-authored
  protocols. Do not introduce generated manifests or runtime discovery files
  unless the repository genuinely generates or discovers protocol definitions
  from them.

## State and construction

- Give a component that owns state or lifecycle a regular class with an explicit
  constructor. Use a dataclass for plain value objects.
- Prefer a constructor or a small class over `functools.partial` factories.
- Pass configuration as a typed config object. Do not add `from_env()` factories,
  module-level mutable globals, or `ContextVar` state to carry configuration.
- Do not silence the type checker with `cast()` or `# type: ignore`; fix the type.
  Keep the configured checker (pyright, mypy, or ty) at the version CI runs.

## Naming and structure

- Use snake case for variables and functions.
- Prefer descriptive names with auxiliary verbs where that improves clarity.
  Example: `is_active`
- Internal modules should use underscore-prefixed filenames. Detailed module and
  export rules live in [modules.md](./modules.md).

## Comments and docstrings

- Use [comments.md](./comments.md) for comment policy and examples.
- In docstrings and comments, use single backticks for inline code and
  identifiers (`model_args`), not double backticks.
- Dataclass and Pydantic fields must use this exact inline docstring style when
  a field comment is required:

```python
field: FieldType
"""Comment ..."""
```

- For Pydantic models used as schemas in LLM prompts, prefer
  `Field(description="...")`.
- For Pydantic models not used in prompts, prefer the inline docstring field
  style shown above.

## Functions and error handling

- Prefer functional style where it keeps logic clearer.
- Put validation and error handling near the start of the function.
- Use specific exception types and informative messages.
- Avoid bare `except`.
- Return `None` or an empty collection for "not found" cases instead of raising.
- When a soft limit applies, prefer visible truncation with a pointer to the
  full source, such as the file path, over silently dropping data so the
  consumer can recover the rest.
- Do not add logging as a substitute for surfacing an error. Prefer raising or
  returning a clear value over logging-and-continuing.
- Define error codes as enums when structured responses need them.

## Async and concurrency

- Prefer `async` and `await` for I/O-bound operations.
- Propagate cancellation through async call chains using the existing runtime
  contract; do not swallow cancellation or invent a parallel token system.
- Use `asyncio.gather()` for concurrent operations when appropriate.
- Add explicit timeouts around external calls.

## Framework-specific conventions

- For FastAPI, use Pydantic models, clear return types, and explicit
  `HTTPException` responses.
- Use the existing structured logger and include request IDs when available.

## Tooling and dependencies

- Prefer `uv` for new Python projects; preserve the target repository's existing
  package manager and lockfile.
- Use `git` for version control and keep changes small and focused.

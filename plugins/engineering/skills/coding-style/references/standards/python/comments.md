# Comments

Thoughtful comments explain why code exists, how to use it, and capture non-obvious decisions; they do not restate what the code already says.

## Python specifics

- Use Google-style docstrings for public functions, classes, and methods.
- Dataclass and Pydantic field comments must use this exact style when inline
  field documentation is needed:

```python
field: FieldType
"""Comment ..."""
```

## Guiding principles

- Prefer clear code over comments; comments do not excuse poor naming or structure.
- Focus comments on the **why** (intent, constraints, trade-offs), not the what (mechanics obvious from reading the code).
- Keep comments accurate and maintained; outdated comments are worse than none.
- Avoid noise: no comments for trivial operations or restating signatures.
- Use consistent prefixes for work notes: `TODO:`, `FIXME:`, `HACK:`, `NOTE:`.
- Let structured comments feed tools (Sphinx, TypeDoc, IDE hovers) so documentation stays close to code.

A useful model:
- Module/package comments: “What is this area of the system for?”
- Class/type comments: “What abstraction does this represent?”
- Function/method comments: “What does this do for callers?”
- Inline comments: “Why is this line/branch written this way?”

## Module / package level comments

**Purpose:** Describe the module’s role, major concepts, invariants, and relationships to other modules.

### Best practices

- Place a brief, high-level description at the top of the file.
- Mention domain concepts, I/O and side effects, and important invariants or configuration expectations.
- For libraries, include a tiny usage example when helpful.

### Python module example (Google-style)

```python
"""User account management.

This module provides high-level operations for creating and managing user
accounts in the billing system. It coordinates persistence, email
notifications, and audit logging.

Typical usage example:

    account = create_account(email="user@example.com")
    enable_two_factor(account.id)
"""
```

## Class / type level comments

**Purpose:** Describe what the abstraction represents, its invariants, and how it should be used.

### Best practices

- Explain the conceptual model (“represents…”, “encapsulates…”), not just “Class that does X”.
- Document invariants, lifecycle expectations, and thread-safety.
- Call out extension points, required overrides, or important gotchas.

### Python class example (Google-style)

```python
class RateLimiter:
    """Token-bucket rate limiter.

    This class enforces a maximum rate of events over time using a
    token-bucket algorithm. Tokens accumulate up to a fixed capacity
    and are consumed by calls to `acquire`.

    The implementation is thread-safe for concurrent callers.
    """

    def __init__(self, rate_per_second: float, capacity: int) -> None:
        self._rate_per_second = rate_per_second
        self._capacity = capacity
        # ...
```

## Function / method level comments

**Purpose:** Specify contract, behavior, parameters, return values, errors, and important side effects.

### Best practices

- For public/exposed APIs, always have a concise, complete doc comment.
- Describe behavior at the level of the caller: what it does, not how it is implemented.
- Include preconditions, postconditions, error conditions, and note blocking, I/O, or retries.
- Internal helpers only need comments when intent or invariants are not obvious from naming.

### Python function examples (Google-style)

```python
def acquire(self, tokens: int, timeout_s: float) -> bool:
    """Attempt to acquire tokens from the rate limiter.

    This call may block up to `timeout_s` seconds while waiting for
    tokens to become available.

    Args:
        tokens: Number of tokens to acquire. Must be positive.
        timeout_s: Maximum time in seconds to wait for tokens.

    Returns:
        True if the tokens were acquired before the timeout, False otherwise.

    Raises:
        ValueError: If `tokens` is not positive.
    """
    # Implementation here
    ...
```

```python
def parse_config(path: Path) -> AppConfig:
    """Load and validate application configuration from a file.

    The configuration is loaded from the given path and validated against
    the built-in schema. Relative paths are resolved relative to the
    current working directory.

    Args:
        path: Path to a JSON configuration file.

    Returns:
        The validated configuration.

    Raises:
        FileNotFoundError: If the file does not exist.
        ValueError: If the configuration is invalid.
    """
    # Implementation here
    ...
```

## Inline and block comments inside functions

**Purpose:** Clarify non-obvious logic, document invariants, and highlight rationale for unusual code.

### Best practices

- Prefer full-line comments above the code they explain.
- Reserve end-of-line comments for very short, local clarifications.
- Explain why something is done, or which external constraint it satisfies (spec requirement, bug workaround, performance trade-off).
- Document tricky invariants, assumptions about inputs, or non-obvious algorithm steps.
- Do not narrate each line or describe obvious control flow.
- Follow the shared [logical block and comment rules](../README.md#logical-blocks-and-comments).
  Put a blank line before a block comment that introduces a new logical step.
  Keep the comment next to the statements it explains. Add context for protocol
  conversions, metadata preservation, and ordering constraints inside helpers;
  a function docstring alone does not explain each of these decisions.

### Python inline comment examples

```python
def _rebuild_index(entries: list[str]) -> dict[str, int]:
    """Builds an index of entry positions.

    Args:
        entries: Sequence of unique entry IDs.

    Returns:
        Mapping from entry ID to position in `entries`.
    """
    index: dict[str, int] = {}

    # Rely on enumerate order to define the canonical position.
    # This is O(n), but called only at startup, so it's acceptable.
    for pos, entry_id in enumerate(entries):
        index[entry_id] = pos

    return index
```

```python
def send_with_retries(message: bytes, max_retries: int) -> None:
    """Send a message to the remote endpoint with bounded retries."""
    attempt = 0

    while attempt <= max_retries:
        try:
            # We intentionally do not retry inside send_once; higher-level
            # retry with backoff is centralized here.
            send_once(message)
            return
        except TransientError:
            attempt += 1

    raise DeliveryError(f"exhausted {max_retries} retries")
```

## Comment patterns to avoid

- Restating code: `# increment i` above `i += 1`.
- Commented-out code left in the repo instead of relying on version control.
- Stale comments that contradict actual behavior.
- Overly long “essays” that obscure code structure.
- Jokes, sarcasm, or unclear metaphors in core logic.

Rule of thumb: if deleting a comment would not remove useful knowledge for a future maintainer, that comment probably should not exist.

## Public contract documentation

Framework and bridge code often defines contracts that another implementor will
extend later. Document those contracts at the definition site.

- Public protocols, abstract classes, and handler base classes must document
  what each required method does for callers and what implementors are expected
  to own.
- Named callback types should document when callbacks fire, whether they are
  best-effort, and whether they receive raw or validated data.
- Exported constants and operation-critical internal constants should have a
  helpful comment or docstring explaining the invariant they carry, not just the
  literal value.
- Protocol and transport comments should mark trust boundaries, lifecycle
  ownership, ordering constraints, and failure behavior.
- Inline comments should explain non-obvious branches such as cancellation
  cleanup, stream draining, approval unblocking, decode rejection, and shutdown
  escalation.
- Do not use comments to compensate for vague data shapes. If a method depends
  on fields such as `entity.get("task_id")`, replace the top-level shape with a
  dataclass, Pydantic model, enum, or typed value object and document that type.

Good bridge comments:

```python
class BridgeCommandHandler(ABC):
    """Owns parsing and side effects for one app-to-backend command type."""

    @abstractmethod
    def handle(self, backend: BridgeBackend, command: BridgeCommand) -> None:
        """Apply `command` and emit any downstream events before returning."""
```

```python
# The child process may still flush stdout after it observes shutdown. Close the
# stream only after the run boundary has emitted its terminal event.
await writer.drain()
```

Avoid comments like:

```python
# Get task id from entity.
task_id = entity.get("task_id")
```

That comment documents an implicit architecture problem; the entity should be a
well-defined type instead.

## Patterns summary

| Area | Common pattern in good repos |
| --- | --- |
| Public APIs | Every exported symbol has a concise, accurate doc comment. |
| Packages/modules | Top-of-file comment describing purpose, often with a tiny usage example. |
| Internal helpers | Emphasis on good naming; comments only for tricky logic or invariants. |
| Invariants | Explicitly documented near the code that enforces them. |
| TODOs / FIXMEs | Tagged with owner/issue and short context, not used as a dumping ground. |

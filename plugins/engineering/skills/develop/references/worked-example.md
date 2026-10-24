# Worked example

One small task carried through every gate. The request: "the decoder accepts
protocol 3.0 messages it cannot handle; make it reject them." The repository is
a Python package with `make lint` and `make tests`, an `examples/` directory, and
no instruction about delivery.

## Frame

The task contract goes into the working notes:

```text
Outcome:     Decoding a message with an unsupported major version fails loudly.
Acceptance:  `make lint` and `make tests` pass; decoding {"version": "3.0", ...}
             raises UnsupportedVersionError naming "3.0"; 2.x messages decode.
Non-goals:   Version negotiation; encoder changes.
Authority:   Feature branch, local commits, no push (default for "make it").
Budget:      This session. Stop if the fix needs a protocol change.
Mode:        Interactive.
```

The request does not say which error type to raise. The package already exports
`DecodeError`, so a subclass is the conventional choice. That is recorded as an
assumption, not asked.

## Understand

`CONTRIBUTING.md` and the CI workflow both run `make lint` and `make tests`. The
baseline on `main`:

```bash
make lint     # pass
make tests    # 1 failure: test_trace_export (network)
```

`test_trace_export` fails on the base because it calls a live endpoint. It goes
in the report as pre-existing and stays out of the diff. The final test run
deselects exactly that test, so a pass means everything else passed.

Reading `decode()` shows that the version is parsed but never checked, and that
`SUPPORTED_MAJOR = 2` already exists in `_constants.py`.

## Design

The change adds no new concept: one comparison against the existing constant
and one exported error subclass. That is small additive public surface, not a
hard-to-reverse design, so it proceeds without a `design` pass and is reported. The caller-visible
contract is the new error, documented in the reference page.

## Build

1. A failing test through the public API:

   ```python
   def test_decode_unsupported_major_version_raises() -> None:
       with pytest.raises(UnsupportedVersionError, match="3.0"):
           decode({"version": "3.0", "type": "event", "payload": {}})
   ```

2. The fix: check the major version against `SUPPORTED_MAJOR` immediately after
   parsing, before any payload work. The test passes. Commit:
   `Reject unsupported protocol major versions`.
3. `simplify-code` on the stage: no changes needed.
4. `docs-sync`: the reference page for `decode()` gains the new error; the
   changelog's Unreleased section gains one Fixed line.
5. While in `_decode.py`, a log message misspells "payload". The fix is
   obvious and in a touched file, so it is included. A broader issue, that
   `encode()` also does not validate versions, goes under "Noticed, not fixed".

## Verify

```bash
make lint                                                         # pass
uv run pytest --deselect tests/test_trace.py::test_trace_export   # pass
uv run python examples/decode_stream.py   # decodes the sample stream as before
```

## Challenge

The diff is 40 lines and touches a wire protocol, which is a trigger for an
independent review. `review-code` finds one issue: a version string without a
dot (`"3"`) raises `ValueError` instead of `UnsupportedVersionError`. Fixed with
a second parameterized case; gates rerun on the new tree.

## Deliver and report

Delivery is the default: two local commits on `fix/reject-unsupported-version`.

```markdown
**Outcome:** `decode()` now rejects messages whose major version is not 2.
Two local commits on `fix/reject-unsupported-version`; not pushed.

**Changes:**
- `_decode.py`: version check before payload parsing.
- `_errors.py`, `__init__.py`: export `UnsupportedVersionError(DecodeError)`.
- Reference docs and changelog updated.

**Evidence:** On the final tree: `make lint` pass; `uv run pytest --deselect
tests/test_trace.py::test_trace_export` 212 passed. The deselected test needs
network and fails identically on `main`, so CI's `make tests` was not run as-is.
`examples/decode_stream.py` ran unchanged.

**Decisions made for you:** Subclassed `DecodeError` so existing
`except DecodeError` handlers still catch the new case. To reverse, raise
a standalone error class instead.

**Noticed, not fixed:** `encode()` does not validate the version either
(`_encode.py:31`).

**Proposed lesson:** None.
```

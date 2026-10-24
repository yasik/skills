# Tool design

Use this guide for model-facing tools. Reuse the target's tool registration,
argument validation, execution context, and permission interfaces. Do not add a
new framework layer when the existing one provides the required contract.

## Public contract

- Treat the name, description, arguments, prompt guidance, and result as one
  contract. Describe important defaults and limits in model-visible metadata.
- Keep construction-time policy separate from model-controlled arguments.
- Use typed input schemas with helpful field descriptions. Inject host context
  and cancellation through the framework; do not expose them as model arguments.
- Export supported constructors and types through the owning public package.
- Keep execution ownership clear when choosing executable or declarative tools.

## Results and errors

- Follow the existing structured-output or text-result contract. Use stable
  labels, ordering, and continuation information.
- Make truncation visible and recoverable. Apply caller limits within enforced
  global bounds; never silently discard consequential output.
- Validate inputs before side effects. Translate expected operational failures
  at the handler boundary; preserve typed errors inside implementation helpers.
- Construct model-facing errors from validated context. Do not expose raw
  exceptions, private paths, credentials, or provider internals.
- Where a boundary must catch unexpected errors, return a stable sanitized
  failure and retain diagnostics through the host's established mechanism.
- A tool failure must not end the agent's turn. Return a short plain-text error
  the model can act on; one bad file or malformed entry degrades the result
  instead of aborting it.
- Parse model-authored or user-authored input on a best-effort basis: skip and
  report a malformed entry rather than failing the whole load.
- Keep model-facing output token-efficient. Omit information the model cannot
  use.

## Context and caching

- Keep conversation history append-only and turn-scoped. Do not rewrite earlier
  messages or the system prompt mid-run; doing so invalidates the prompt cache
  and loses the audit trail.
- Render exactly one system message. Put per-turn guidance in turn-scoped input.

## Filesystem and process boundaries

- Use the existing path resolver and explicit working-directory contract.
- Enforce the application's permission policy before reads, writes, process
  startup, and metadata checks that could disclose protected paths.
- Preserve the actual authorization defaults. Do not invent permissive defaults.
- Distinguish denied, approval-required, and allowed outcomes. Compose policies
  conservatively and route approvals through the host's existing callback/UI.
- Preserve the difference between absent and explicitly empty allowlists.
- Pass correlation context explicitly. Keep internal correlation metadata out of
  model-facing results unless the public contract requires it.
- Command approval is not process isolation. State the actual executor's
  sandbox boundary accurately.
- Prefer incremental reads and walks. Handle unsupported content explicitly and
  reuse standard-library or project helpers before shelling out.

## Implementation

Keep handlers thin: adapt input, propagate context and cancellation, execute,
and format output. Split helpers only where they clarify ownership or invariants.
Use typed internal results when output also carries continuation or error state.
Register a new public tool after its behavior, useful tests, docs, and examples
are complete.

## Verification and documentation

Select tests through `unit-test-coverage`: exercise public execution and the
normal runner flow when their integration carries meaningful risk. Cover
consequential output, authorization, cancellation, truncation, and error-sanitizing
contracts. Test implementation helpers through those public entry points.

Update the existing tool index and behavior documentation when applicable.
Explain supported arguments, results, emitted operations, permissions, approval,
and actual sandbox limits. Add a runnable example for a new supported workflow.
Keep internal rollout history outside public documentation.

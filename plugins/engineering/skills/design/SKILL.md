---
name: design
description: "Resolve a consequential engineering design choice into the smallest useful contract and reviewable implementation plan. Use for architecture, new abstractions, migrations, or a request to plan before coding."
---

# Design

Make the proposed behavior and caller experience concrete before adding machinery.

1. Read the request, current implementation, callers, and repository conventions.
   Identify the actual capability gap or failure, and the goal behind the stated
   task: a request for file retrieval may exist to let the system run scripts.
   Distinguish confirmed facts, working assumptions, and decisions for the user.
2. Re-ground an existing plan before building on it. Pull the latest code and
   dependency releases; drop work that upstream now provides and fix premises
   the code no longer supports.
3. Trace the existing control and data flow. Delegate to the native SDK, existing
   harness, or framework primitive first. Every proposed component must name the
   gap that remains after that delegation; a design that rebuilds the client it
   adapts is out of scope.
4. Consult prior art when it answers a specific uncertainty. Compare at least two
   mature implementations when the choice is consequential, adapt what fits, and
   do not carry over fields or mechanisms that this system will not use.
5. Write the smallest caller example and explicit input/output contract. For
   agent systems include the task message, system instructions, tool boundary,
   inherited context, state ownership, and result delivery. Preserve the original
   natural-language request rather than silently narrowing it into a conclusion.
6. Put each responsibility in the right layer: core mechanism, application
   policy, or integration. The core never depends on an extension package.
   Explain failure propagation at the boundary that owns it.
7. Challenge every new type, field, option, dependency, fallback, limit, and
   policy with the questions below. Remove anything that fails them.
8. Compare at least two options for each consequential choice, including the
   smallest one that could work, and recommend one.
9. Classify each decision by reversibility. An internal module boundary is cheap
   to change; a public API, persisted format, wire protocol, or migration is not.
   Spend rigor on the irreversible decisions. For stateful or deployed changes,
   state how a failure will be observed and how the change is rolled back.
10. State preserved behavior and intended breaks. Do not add compatibility shims
    for an unshipped API or a surface without consumers. A migration requires
    semantic parity where requested; moving an entry point is not proof of parity.
11. Sequence the work as phases, primitives and data types first, each small
    enough to review on its own and each with its own proof. Use an experiment
    for an empirical question instead of resolving it with confident prose.

## Justify every construct

Ask these of each addition. A weak answer means remove or simplify it.

- What present requirement fails without it? "Extensibility" is not a requirement.
- Is it a real use case? Can this optional field actually be absent at runtime,
  or should the boundary validate it once and pass a required value?
- Where does this limit or default come from: a provider, a protocol, or a
  number invented here?
- Does it model something already modeled? Parallel type hierarchies, 1:1
  mappers between identical models, and alias or rename layers fail this test.
- How many concepts must a caller learn? One surface beats two; a default that
  just works and can be overridden beats required configuration.
- How is it tested? If a unit needs heavy mocking, its ownership boundary is
  probably wrong.

An abstraction earns its place when it removes real duplication or caller burden.
Fewer lines do not excuse hidden coupling, compressed logic, or a harder public API.

## Output

Lead with the recommendation and tradeoff. Include outcome and non-goals, current
seam, proposed contract with a caller example, options considered, justified
additions, preserved behavior and intended breaks, phases with verification,
rollback where relevant, and open questions. End with numbered review questions
the user can answer inline. Scale detail to the decision. Do not invent
estimates, dependencies, or deadlines.

A condensed example:

```markdown
**Recommendation:** Add `steer(message)` to `RunHandle`; reuse the existing input
queue. Tradeoff: steering waits for the current tool call to finish.

**Gap after delegation:** The SDK accepts mid-run input; the runner exposes no
handle to send it.

**Caller:**
    handle = runner.start(agent, task)
    handle.steer("Focus on the billing module.")

**Options:** (A) method on `RunHandle`, reusing the queue, chosen; (B) a new
`SteeringChannel` type, rejected because it duplicates the queue.

**Phases:** 1. `steer` plus a public test that a queued message reaches the next
turn. 2. Runnable example. 3. Documentation.

**Review questions:**
1. Should `steer` during a tool call wait or cancel the call? Proposed: wait.
```

A plan-only request ends at the reviewable plan. When implementation is also
requested, `develop`'s design-approval rule decides how the plan is reviewed:
in the session, as a tracker comment, or recorded as a decision in a headless run;
standalone, continue after resolving material questions unless the user reserved
plan approval. Do not reopen a settled decision without new contradictory
evidence; still surface correctness or safety defects in that choice.

# mermaid-render — gallery

Each diagram below is the rendered output of the Mermaid source beside it, using
the skill's default theme. Images are the static PNG; every example also produces
an **animated** SVG (a slow accent packet travels each arrow) — the `.svg` files
live in [`images/mermaid-render/`](images/mermaid-render/).

Source files: [`skills/mermaid-render/examples/`](../../skills/mermaid-render/examples/).
Render any of them with:

```bash
bun run skills/mermaid-render/scripts/render.ts -i skills/mermaid-render/examples/flowchart.mmd -o out
```

---

## Flowchart — role-coded nodes

Classes (`:::hub`, `:::accent`, `:::human`, `:::entry`) pick the styling; the
`dispatch` edge label and the fan-out into and out of the bus are stock Mermaid.

```mermaid
flowchart TD
  U["user-facing agent"]:::entry --> BUS["runtime message bus"]:::hub
  BUS --> R["retrieval agent"]
  BUS --> S["safety review agent"]
  BUS --> P["policy agent"]
  BUS -->|dispatch| H["human review task"]:::human
  R --> AGG["aggregated result"]:::accent
  S --> AGG
  P --> AGG
  H --> AGG
```

![flowchart](images/mermaid-render/flowchart.png)

---

## Flowchart — clusters, a decision, left-to-right

`subgraph` becomes a labelled container, `{authorized?}` a decision, and
`flowchart LR` flips the layout. Nodes mentioned inside the subgraph join it.

```mermaid
flowchart LR
  Start([request]):::entry --> Auth{authorized?}
  Auth -->|yes| Work
  Auth -->|no| Deny[reject]:::accent
  subgraph Worker [worker pool]
    Work[process job]:::hub --> Save[(persist)]
  end
  Save --> Done([done]):::accent
```

![pipeline](images/mermaid-render/pipeline.png)

---

## State diagram

`[*]` renders as a filled start dot and a ringed final state; transitions carry
their `: label`.

```mermaid
stateDiagram-v2
  [*] --> Idle
  Idle --> Running : start
  Running --> Paused : pause
  Paused --> Running : resume
  Running --> [*] : done
```

![state diagram](images/mermaid-render/state.png)

---

## Sequence diagram

Participants, activation bars, a self-message, `loop` / `alt` / `else` fragment
frames, a note, and dashed replies — each message also carries an animated packet
in the SVG.

```mermaid
sequenceDiagram
  participant U as user-facing agent
  participant B as runtime bus
  participant R as retrieval agent
  participant H as human review

  U->>+B: dispatch request
  B->>+R: fetch context
  R-->>-B: context
  loop every policy
    B->>B: check policy
  end
  alt needs approval
    B->>+H: request approval
    H-->>-B: approved
  else auto-approved
    Note over B: skip human step
  end
  B-->>-U: aggregated result
```

![sequence diagram](images/mermaid-render/sequence.png)

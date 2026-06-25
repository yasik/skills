# Supported Mermaid syntax

mermaid-render parses a pragmatic subset of Mermaid aimed at the common cases. It
fails soft: unrecognised lines are skipped rather than throwing. `%%` comments and
a leading `%%{init}%%` directive are ignored everywhere.

## Flowchart (`graph` / `flowchart`)

```
flowchart TD
  A["label"]:::hub --> B{decision}
  B -->|yes| C(["stadium"])
  B -- no --> D[[subroutine]]
  A & C --> E[result]:::accent
  subgraph Group [Optional title]
    C --> D
  end
  class A,E hub
```

- **Direction:** `TD`/`TB`, `LR`, `RL`, `BT` (from the header). Default `TB`.
- **Node shapes:** `[rect]`, `(round)`, `([stadium])`, `[[subroutine]]`,
  `[(cylinder)]`, `((circle))`, `{rhombus}`, `{{hexagon}}`, `>flag]`.
  All are normalised to the house panel; the label is extracted. Quote labels with
  special characters: `A["a / b (c)"]`.
- **Line breaks in labels:** `<br>` / `\n` → first line is the title, the rest the
  italic-weight subtitle line.
- **Edges:** `-->`, `---`, `-.->`, `==>`, `--x`, `--o`, `<-->`. Labels via
  `-->|label|` or `-- label -->`. Chains `A --> B --> C`. Fan-out with `&`.
- **Styling:** `:::className` on a node, or `class a,b className`. The class name
  maps to `config.ts > variants`. `classDef`/`style`/`linkStyle`/`click` are
  parsed-and-ignored (styling comes from the config, by class name).
- **Subgraphs:** drawn as a dashed container with an upper-case label.

## State diagram (`stateDiagram` / `stateDiagram-v2`)

```
stateDiagram-v2
  [*] --> Idle
  Idle --> Running : start
  Running --> [*] : done
  state "Long name" as Running
  state Composite {
    A --> B
  }
```

- `[*]` → a filled **start dot** (as a source) or a ringed **final state** (as a
  target), one per scope.
- Transitions `A --> B` with optional `: label`.
- `state "desc" as id` aliases; `id : description` sets a node's label.
- `direction LR` supported. Composite `state X { … }` → cluster.
- Skipped: `note … : …`, concurrency dividers (`--`).

## Sequence diagram (`sequenceDiagram`)

```
sequenceDiagram
  participant A as Alice
  actor B
  A->>+B: request
  B-->>-A: reply
  A->>A: self
  Note over A,B: a note
  loop every minute
    A->>B: ping
  end
  alt ok
    B->>A: yes
  else not ok
    B-->>A: no
  end
```

- **Participants:** `participant id [as Label]`, `actor id [as Label]`; also
  auto-registered (in first-seen order) from messages.
- **Messages:** `->` `-->` `->>` `-->>` `-x` `--x` `-)` `--)`. `--` = dashed
  (reply) line; `>>`/`>` filled/open arrowhead; `x` cross; `)` async open.
  Self-messages (`A->>A`) draw a loop.
- **Activations:** `A->>+B` activates B, `B-->>-A` deactivates B; or explicit
  `activate`/`deactivate`. Drawn as bars on the lifeline (nesting offsets right).
- **Notes:** `Note over A[,B]: …`, `Note left of A: …`, `Note right of A: …`.
- **Fragments:** `loop`, `alt`/`else`, `opt`, `par`/`and`, `critical`/`option`,
  `break`, and `rect` (consumed, frame not drawn). Each needs a matching `end`.
- Ignored: `autonumber`, `title`, links/properties.

## General limitations

- One diagram per file.
- Flowchart node shapes are intentionally normalised to one panel style for a
  consistent look (configurable via `variants`, not per-shape geometry).
- Long labels are not word-wrapped; use `<br>` to break lines, or quote.
- The box-sizing heuristic assumes a monospace font (`config.ts > font.charWidth`).
  If you switch to a proportional font, tune `charWidth`/`node.padX`.

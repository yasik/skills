# teach

Turn a complex topic — or a pile of links you don't have time to wade through —
into **one complete, self-paced lesson**. Not a chat-style tutoring session that
makes you click "continue" ten times, and not a TL;DR that flattens the hard
parts: a chaptered write-up you read top to bottom, with the single hardest
concept slowed down and worked through, diagrams only where a picture genuinely
beats prose, and a real reading list at the end so you can keep going.

The core idea the skill is built on: *explaining* dumps correct information;
*teaching* builds understanding in one specific learner's head — it starts from
what you already know, lingers exactly where people get stuck, and proves the idea
landed with a concrete example.

## When it triggers

Whenever the goal is to **understand**, not just to get an answer — e.g.:

- "teach me how Raft consensus works" / "I want to really understand X"
- "explain this like a class" + a link to a paper, doc, or long article
- "I've read five blog posts on monads and still don't get it — break it down"
- "ELI5 but actually deep: what is git rebase doing under the hood?"
- dropping one or more URLs and asking to be brought up to speed

It stays out of the way for adjacent-but-different asks: a one-line factual lookup,
a terse summary for standup notes, writing or fixing code, proofreading, or
translation. Those don't need a lesson — and the skill is deliberately tuned not
to fire on them.

## How it works

1. **Gets the real source first.** From an explicit topic it can teach from model
   knowledge (grounding fast-moving or post-cutoff topics with a web search first).
   From links it fetches each one — and when a page is paywalled, login-walled,
   JavaScript-rendered, or comes back truncated, it falls back to a browser to load
   and scrape the rendered content rather than teaching from a thin guess.
2. **Finds the crux.** It reads for the prerequisites (named up front so you can
   self-check) and the one concept where understanding usually breaks — then builds
   the whole lesson around slowing down there.
3. **Writes the lesson, chaptered.** An orientation paragraph (what this is, why it
   exists, what you'll understand by the end), a roadmap, then one takeaway per
   chapter, concrete-before-abstract, with no "and then magic happens" hand-waves.
4. **Deep-dives the hardest part.** Names *why* it's hard, breaks it into sub-steps
   that each feel obvious, then consolidates with end-to-end worked examples (often
   a normal case and an edge case, to teach the boundary).
5. **Diagrams only when they earn it** — ASCII/Unicode or inline `mermaid` for
   things that are spatial, structural, or sequential; prose for everything else.
   For *quantitative* points it can borrow the `terminal-report` skill's ANSI
   charts (terminal output only — files get Markdown tables or `mermaid` instead).
6. **Cites real sources, easy → hard.** A short reading list, each entry labeled
   and verified — never a fabricated DOI or a plausible-but-wrong title.

## Where it writes the lesson

By default the lesson prints **straight into the terminal**. Just say so in the
request — "save it to a file", "drop it in my vault" — and it can instead:

- **Write a Markdown file** to a path you name, or `./<topic-slug>.md` by default.
- **Drop a note into your Obsidian vault.** It finds your local vault(s) (asking
  which one if you have several), then saves the lesson under a `teach/` folder
  by default — or any folder you name.

### Using each option

Skills don't take parsed command-line flags — you just say what you want, and the
skill reads the target from how you phrase it. (It also recognizes a terse
`--output=…` / `--md` / `--obsidian` shorthand if you'd rather type that, but it's
read as plain text, not a parsed argument.)

**Terminal (default)** — the lesson prints inline; nothing extra to say:

```
teach me how Raft consensus works
```

**Markdown file** — ask it to save the lesson:

```
teach me how B-tree indexes work and save it to a file
explain how vector clocks work, write it to ./notes/vector-clocks.md
```

If you don't name a path it writes `./<topic-slug>.md` (e.g. `./b-tree-indexes.md`)
and tells you where it landed.

**Obsidian** — mention your vault or notes:

```
teach me CRDTs and drop it in my Obsidian vault
explain this paper <link> and save it to my notes under Learning/Distributed
```

It locates your local vault(s), asks which one if you have more than one, and saves
the note under a `teach/` folder unless you name another (like `Learning/Distributed`
above). When it's done it tells you the exact path and vault.

Prefer the terse form? Shorthand like this works too, read as plain text:

```
/teach --md ./notes/raft.md how Raft consensus works
/teach --obsidian how the Paxos algorithm works
```

The test every part of the lesson has to pass: *after reading this once, could you
explain the crux to someone else?* Coverage isn't the goal; transfer is.

## Going deeper

- `skills/teach/SKILL.md` — the full skill: the source-acquisition workflow,
  the chaptering and deep-dive patterns, the diagram heuristic, the output targets,
  and the citation rules, each with the reasoning behind it.
- `skills/teach/references/obsidian.md` — how it locates Obsidian vaults, picks
  one when there are several, and names/places the note.
- `skills/teach/evals/trigger_evals.json` — the 20 queries (10 should-trigger,
  10 hard near-misses like "summarize this into 3 bullets" and "what's the
  difference between TCP and UDP") used to check that the description fires when it
  should and stays quiet when it shouldn't.

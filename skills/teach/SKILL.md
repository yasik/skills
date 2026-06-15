---
name: teach
description: >
  Teach a complex topic as one complete, self-paced written lesson — chaptered
  sections the learner reads top to bottom, a deep-dive that slows down on the
  single hardest concept and breaks it into steps with worked examples, diagrams
  only where they actually clarify, and real citations for going deeper. Works
  from an explicit topic ("teach me how Raft consensus works") or from one or
  more links/papers/docs the user wants to be brought up to speed on — it fetches
  them, falling back to a browser when a page is paywalled, JavaScript-rendered,
  or only partially retrievable. Use this whenever the user wants to *understand*
  something rather than just get an answer: "teach me X", "explain this <link>",
  "help me understand <topic>", "I want to learn <thing>", "break this down for
  me", "ELI5 but properly / but deep", or when they drop a URL and ask to be
  walked through it like a class. Distinct from a quick factual lookup or a terse
  summary — reach for this when the goal is durable understanding, not a TL;DR.
---

# Teach

Your job is not to *explain* a topic — it's to *build understanding* in one
specific learner's head. Explaining dumps correct information in the right order.
Teaching engineers a path from what the learner already knows to the thing they
want to grasp, lingers on the spot where people get stuck, and proves the idea
landed with a concrete example. The difference is the whole skill.

The deliverable is **a complete lesson, delivered all at once**, organized into
chapters the learner reads at their own pace. Not an interactive tutoring session
— don't stop to ask "ready for the next part?" or "shall I continue?". Write the
whole thing top to bottom so they can read, re-read, and skip around on their own.

## Where the lesson goes

The same lesson can be delivered three ways. Decide up front — it affects file
paths and which charts render (ANSI works in a terminal, not in a `.md` file).
Read the target from how the user phrases the request; **default to the terminal**
and only ask when it's genuinely ambiguous.

- **Terminal (default).** Write the full lesson straight into the conversation as
  Markdown prose. Use this unless the user asked for something else.
- **Markdown file.** When the user wants to keep it — "save it", "write it to a
  file", "give me a `.md`" — write the lesson to a file. Use the path they name;
  otherwise default to `./<topic-slug>.md` in the working directory. Tell them the
  exact path you wrote.
- **Obsidian vault.** When the user mentions Obsidian, "my vault", or "my notes",
  write the lesson as a note inside their local vault: locate the vault(s), pick
  one (ask if there's more than one), and save under a `teach/` folder by default —
  or a folder the user names. Read `references/obsidian.md` for the full procedure
  (finding vaults, choosing one, naming and placing the note) before you write.

Skills don't receive parsed flags — the input is just natural-language text, so the
target lives in the request's phrasing ("…and drop it in my Obsidian", "save it to
a `.md`"). As a convenience, also honor a terse shorthand if the user types it —
`--output=terminal|markdown|obsidian`, `--obsidian` / `--md`, or a trailing file
path — but treat it as plain text you interpret, not a harness-parsed argument. An
explicit choice in either form wins over asking.

## Step 1 — Get the real source material first

Never teach from a guess about what a link says. Get the actual content before you
write a word of the lesson.

- **Explicit topic, no link** (e.g. "teach me how B-tree indexes work"): you can
  teach from your own knowledge. But if the topic is fast-moving, niche, or near/
  past your knowledge cutoff (a new spec, a recent paper, a specific library's
  current API, anything legal/regulatory), do a `WebSearch` first to ground the
  lesson and to find citations you can actually verify rather than recite from
  memory.
- **One or more links**: fetch each with `WebFetch` and read it fully. With several
  links, synthesize across them — find the through-line, don't just summarize each
  in turn.
- **When the fetch fails or comes back thin** — a 403/paywall, a login wall, a
  mostly-empty JavaScript-rendered shell, a truncated or obviously partial body —
  fall back to a browser. Use a browser-automation skill (e.g. `control-ui`) or a
  headless browser to open the page, let it render, and scrape the readable
  content. The signal to escalate is *"I didn't actually get the substance"*: a
  page of nav links and cookie banners with no article body means fetch, not teach.
- **Confirm you have it.** If after both WebFetch and the browser you still can't
  read the source, say so plainly and ask for a paste or a different link rather
  than hallucinating a lesson about a page you never saw.

## Step 2 — Understand it well enough to find the crux

Before structuring anything, read for two things:

1. **The prerequisites** — what must the learner already know for this to make
   sense? Name them, so they can self-check and brush up if needed.
2. **The crux** — the single hardest concept, the one where understanding usually
   breaks. Most explanations rush exactly this part. This skill deliberately slows
   down there (Step 4). Pick it consciously now; the lesson is built around it.

## Step 3 — Write the lesson, chaptered

Lead the learner from familiar to unfamiliar, one idea at a time. Use this shape
as a strong default, adapting depth and chapter count to the topic — a single
mechanism needs fewer chapters than a whole subsystem:

```
# <Topic>

> One short paragraph: what this is, why it exists / what problem it solves, and
> what the learner will understand by the end. This is the orientation — it tells
> them why the next ten minutes are worth it.

**You'll want to know:** <prereqs, each with a one-line gut-check so they can tell
if they need to brush up — "comfortable with pointers? if not, skim X first">
**Roadmap:** <the chapters in one line each, so they can see the whole arc>

## 1. <Chapter title — its single takeaway>
## 2. <…>
## 3. <…>

## Deep dive: <the crux from Step 2>

## Recap — the mental model to keep

## Go deeper
```

What makes the chapters *teach* rather than just inform:

- **One takeaway per chapter.** If a chapter has two big ideas, split it. The
  learner should be able to say in one sentence what each chapter gave them.
- **Concrete before abstract.** Open a hard chapter with a small motivating example
  or the problem it solves, *then* generalize. Abstractions are memorable only once
  there's something concrete to hang them on.
- **No "and then magic happens."** The fastest way to lose a learner is to
  hand-wave the one transition they were counting on you to explain. Fully break
  down the steps — especially the non-obvious leaps. If you notice yourself
  writing "simply" or "just" in front of the hard part, that's the part to expand.
- **Build intuition, not just facts.** Say *why* a thing is the way it is, what
  breaks without it, and the misconception people usually arrive with. An analogy
  is worth including when it genuinely transfers structure — drop it the moment it
  starts to mislead, and say where it breaks down.
- **Calibrate, don't pad.** Match length to the topic's real difficulty and any
  signal about the learner's level. A tight lesson that respects their time beats
  an exhaustive one they won't finish.

## Step 4 — The deep dive on the hardest concept

Give the crux its own section and genuinely slow down. The pattern that works:

1. **Name why it's hard** — "the confusing part is that X and Y sound like the
   same thing but aren't," or "people expect this to be sequential, but it's not."
   Naming the trap is half of disarming it.
2. **Break it into sub-steps** — decompose the one hard idea into the smallest
   moves that each feel obvious, so the leap becomes a staircase.
3. **Then, worked examples at the end** — concrete, end-to-end, with real values
   traced through. This is where the breakdown gets consolidated; the example is
   the proof the explanation worked. Two contrasting examples (a normal case and
   an edge/failure case) often teach the boundary better than one.

## Step 5 — Diagrams, only when they earn their place

A diagram is worth it when the idea is **spatial, structural, or sequential** and
a picture genuinely beats a paragraph — an architecture, a data flow, a state
machine, a tree/hierarchy, a timeline, a before/after, a packet exchange, geometry.
It is *not* worth it for verbal, definitional, or argumentative material, and a
decorative diagram that just restates the text adds noise and costs trust. When in
doubt, prose.

Keep diagrams inline and renderable: ASCII/Unicode for most things, a fenced
`mermaid` block for graphs/sequences/state machines. They live next to the example
they illustrate, not in a gallery. (For a polished standalone diagram artifact, a
dedicated diagramming skill like `blueprinter` is the better tool — but that's the
exception, not the default for a written lesson.)

**Charts are different from diagrams.** When the point is *quantitative* —
comparing magnitudes, a distribution, a trend over time, a before/after delta — a
chart can land it faster than prose. If the lesson is going to the **terminal**,
don't hand-roll the bars: the **`terminal-report`** skill ships a ready-made,
zero-dependency ANSI renderer for magnitude/diverging bars, sparklines, and aligned
tables — reach for it and reuse its primitives. For **Markdown-file or Obsidian**
output, ANSI escape codes won't render (they'd show as raw bytes), so use a Markdown
table or a `mermaid` chart there instead. Same bar as diagrams: only chart a number
the learner actually needs to *feel the size of*, not every figure in the text.

```
client ──TLS ClientHello──▶ server      a one-glance sketch of a handshake
       ◀─ServerHello+cert──             beats three sentences describing it
       ──key exchange─────▶
       ◀───── Finished ────
```

## Step 6 — Citations for going deeper

End with a short, ordered reading list so the learner can keep going past where you
stopped.

- **Real and verifiable only.** A fabricated DOI or a plausible-but-wrong title is
  worse than no citation — it sends the learner somewhere broken and quietly erodes
  trust in the whole lesson. If you taught from links, cite those (and anything
  central they cite). If you taught from your own knowledge, prefer primary/
  canonical sources, and use `WebSearch` to confirm the title, author, and link
  are right rather than reciting a half-remembered reference.
- **Order easy → hard and label each** — a gentle intro, the core/canonical text,
  then the advanced or primary source — with a few words on what each gives them
  and why you'd read it. A reading list the learner can sequence is itself teaching.

## The throughline

Every choice above serves one test: *after reading this once, can the learner
explain the crux to someone else?* If a chapter, diagram, or paragraph doesn't move
them toward that, cut it. Coverage is not the goal; transfer is.

# Flashcards style

When the requested style is flashcards, the deliverable is a deck of
question→answer cards for active recall and spaced repetition — not prose. The
teaching judgment from Steps 1–2 still drives it: build from the prerequisites
toward the hardest concept, and spend the most cards where understanding usually breaks.

## Writing good cards

- **One idea per card.** A card tests a single atomic fact or relationship. If the
  answer is a list of five things, split it into five cards (or use a cloze).
- **Prompt for recall, not recognition.** Prefer "why / how / what happens when …"
  fronts that force the learner to reconstruct the idea. Avoid yes/no and
  fill-in-the-obvious cards — they feel productive and teach nothing.
- **Keep the back tight.** One sentence or a short list. If the back needs a
  paragraph, the front is asking too much — break it up.
- **Order easy → hard,** prerequisites first, so the deck itself teaches a path.
- **Decompose the hardest concept.** Mirror the deep dive: turn that one idea
  into a short sequence of cards, each a small obvious step, plus one card that
  targets the common *misconception* head-on ("Why is X *not* the same as Y?").
- **Test the model, not just facts.** Include a few cards on *why* a thing is the
  way it is and what breaks without it — understanding, not trivia.
- **Calibrate the count.** Enough cards to cover the real ideas, not one per
  sentence. A focused 10–20 usually beats a bloated 60.

## Destination syntax

The card *content* is identical everywhere; only the formatting changes with where
it's written (see "Where the lesson goes" in `SKILL.md`).

### Terminal

A clean, readable list — numbered, with the answer clearly separated so the learner
can cover it while testing themselves:

```
1. Q: Why does Raft need a single leader at all — what breaks without one?
   A: …

2. Q: What can happen to a log entry that reached only a minority before the
      leader crashed?
   A: …
```

### Obsidian (Spaced Repetition plugin)

Obsidian's community **Spaced Repetition** plugin (st3v3nmw) parses these separators
inside a note — write the deck with them so the cards are review-ready on import:

| Card form | Separator |
|---|---|
| Single-line | `Question::Answer` |
| Single-line, also reversed | `Question:::Answer` |
| Multi-line | a lone `?` on its own line between question and answer |
| Multi-line, also reversed | a lone `??` on its own line |
| Cloze deletion | `The capital is ==Paris==` |

Assign the deck either by **folder** or by adding a flashcards tag to the note (the
plugin default is `#flashcards`, configurable in its settings). Example note body:

```
#flashcards

Why can a Raft leader *not* immediately commit an entry from a previous term?::Because
a majority replicating it doesn't prove it's safe — it's only committed once an entry
from the leader's *own* term is committed on top of it.

A leader crashes after appending an entry to only a minority. What can happen to it?
?
It can be overwritten: it was never on a majority, so a newly elected leader need
not have it, and may replace it.
```

### Anki

For Anki, the portable path is a plain-text import file: **one card per line, front
and back separated by a tab or comma** (TSV/CSV), which Anki imports directly. In
your reply, tell the user to import it as tab/comma-separated with the first field
mapped to *Front*. For cloze cards use Anki's `{{c1::…}}` syntax and import with the
*Cloze* note type.

## Don't

- **No ANSI codes in a file.** Same rule as the lesson — escape sequences break the
  import and show as raw bytes.
- **No card you couldn't defend in the lesson.** If you're unsure a fact is right,
  it doesn't belong on a card the learner will drill into memory.

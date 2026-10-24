---
name: dev-docs
description: Write, edit, or review developer documentation using source-verified facts and concise technical prose. Use for READMEs, API references, guides, release notes, and substantive documentation style questions.
---

# Developer documentation style

Make documentation accurate, useful, and easy to scan. Apply this guidance to the
requested document or changed prose and enough surrounding context to keep it
coherent. A small edit does not require rewriting a page or reading every manual.

Repository terminology, writing conventions, and explicit user requirements take
precedence. The bundled references are editorial guidance, not process policy:
they do not create approval steps, release authority, or mandatory page sections.

## Write or review

1. Establish the reader and purpose from the task and surrounding page. Use the
   existing document shape unless it obscures the reader's task. A new how-to
   needs actionable steps; a reference needs precise contracts and examples.
2. Verify behavior, names, commands, defaults, and examples against the actual
   code or supported interface. Reuse evidence already gathered by `docs-sync`.
   Do not widen a scoped wording edit into a repository documentation audit.
3. Edit only the requested scope. Use plain technical English, active voice,
   direct instructions, and short sections. Explain behavior and boundaries;
   omit filler, rhetorical contrasts, jokes, and unsupported claims.
4. Consult a reference only for a relevant style question. Preserve public API
   spelling, literal outputs, and code semantics even when they differ from
   prose conventions. Follow the repository's renderer and formatting rules.
5. Review the changed prose once for factual accuracy, reader usefulness,
   consistent terminology, clear examples, descriptive links, and maintainability.
   Report actionable issues or apply fixes within existing authorization. Do not
   turn the checklist into a separate approval report.

In a development cycle, return writing findings and fixes to the calling task.
`docs-sync` owns coverage and navigation; `docs-portal` owns build and link checks.
Do not recursively invoke them or repeat their work from a writing review.
For a standalone task, report the result and material limitations concisely.

## Defaults that matter

- Use second person and imperative steps for instructions; describe API contracts
  precisely in reference prose. Keep language literal and globally understandable.
- Put conditions before actions and consequential prerequisites before procedures.
  Distinguish requirements from options. Avoid vague claims about ease or quality.
- Use sentence-case headings, parallel lists, code formatting for identifiers,
  and fenced examples with a language. Keep copyable commands free of shell prompts
  unless the document must distinguish commands from output; explain placeholders.
- Preserve the existing page structure. Add prerequisites, cleanup, cost, or next
  steps only when they help this reader; do not manufacture empty sections.
- Document verified supported behavior. Release notes may use dates and versions;
  internal planning belongs in the repository's planning surface. Do not name
  internal phases, experiments, or system codenames in public docs.
- Explain concepts in narrative prose that says why the design matters; do not
  repeat field-by-field reference that code docstrings already carry. Use an
  ASCII diagram for an architecture or lifecycle when prose alone is hard to follow.
- Define or replace jargon at first use. Prefer separate sentences, commas, or
  colons over em-dash asides.
- Use concise public docstrings for caller contracts. Follow `coding-style` for
  language-specific comment syntax; do not reformat comments as a full guide page.

## References

Use the relevant page or search the word lists; loading the full guide is unnecessary.

| Question | Reference |
| --- | --- |
| Tone, accessibility, claims, terminology | [Principles](references/principles.md) |
| Voice, tense, grammar, capitalization | [Grammar](references/grammar.md) |
| Punctuation and hyphenation | [Punctuation](references/punctuation.md) |
| Headings, lists, procedures, notices | [Formatting](references/formatting.md) |
| Numbers, dates, times, units | [Numbers and units](references/numbers-dates-units.md) |
| Links, HTML, Markdown | [Linking](references/linking-html-markdown.md) |
| Samples, placeholders, commands, UI text | [Code and UI](references/code-and-ui.md) |
| Product names and example values | [Naming](references/names-and-naming.md) |
| A term's spelling or usage | [A–L](references/word-list-a-l.md), [M–Z](references/word-list-m-z.md) |
| Source navigation and attribution | [Index](references/INDEX.md) |

References are adapted from a published developer documentation style guide under
Creative Commons Attribution 4.0. The index retains source links and attribution.
The bundle adapts process guidance to its own scope and authorization rules.

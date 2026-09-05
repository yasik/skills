# dev-docs

Write developer documentation to a complete technical-writing style guide,
packaged next to the skill so the agent looks rules up instead of guessing.
The rules are adapted from the
[Google developer documentation style guide](https://developers.google.com/style)
(CC BY 4.0); the skill's instructions are written generically so the style
applies to any project's docs.

The skill covers the full guide: voice and tone, second person and active
voice, sentence-case headings, list and procedure mechanics, code font versus
bold, placeholders, command-line syntax, notices, links, images, numbers,
dates, units, hyphenation, inclusive language, the reserved example domains
and names, and the complete word list (about 700 entries).

## When it triggers

- "write developer docs / a quickstart / a how-to / a README / release notes
  / a concept page" for a codebase or API
- "follow a proper style guide", "technical-writer quality", "like a big
  platform's docs"
- "review this page against the style guide" or "rewrite this in second
  person, active voice, with proper procedures"
- "docstrings / API reference comments in reference-doc style"
- word-list lookups: "is it *setup* or *set up*?"

It stays quiet for marketing copy, blog posts, personal writing, code fixes,
summaries, and lessons (see `teach`).

## How it works

1. **Reader and page type first.** It names who "you" is and picks the page
   shape: concept, quickstart, how-to, tutorial, reference, troubleshooting,
   release notes, or README. Each shape has a prescribed title form and
   section order.
2. **Project style wins.** Existing docs, glossaries, and a project style
   guide override the packaged guide, which in turn sits above Merriam-Webster
   and Chicago.
3. **Facts from the code.** Commands, flags, fields, defaults, and errors come
   from the source, never from memory.
4. **Draft against the core rules** in `SKILL.md`, which condense the guide's
   highlights plus the rules that most often go wrong (list punctuation, step
   order, placeholder explanations, hyphenation, timeless wording).
5. **Look up, don't guess.** `references/INDEX.md` mirrors the official
   navigation and maps every page and section to the local file that holds
   it, including legacy redirect paths. The word list is one entry per line,
   so a `grep` answers most term questions.
6. **Review checklist** before delivery. For review requests, the checklist
   is the deliverable: each issue, the rule it breaks, the fix.

## What's packaged

```text
skills/dev-docs/
  SKILL.md                          workflow, core rules, document shapes, checklist
  references/
    INDEX.md                        official nav → local file, every section, redirects
    principles.md                   tone, accessibility, inclusive, global, jargon, claims, timeless, prescriptive
    grammar.md                      person, voice, tense, abbreviations, capitalization, ...
    punctuation.md                  colons … slashes, with the hyphenation tables
    formatting.md                   text formatting, headings, lists, procedures, tables, notices, images
    numbers-dates-units.md          numbers, dates and times, units, phone numbers, math
    linking-html-markdown.md        cross-references, heading targets, semantic HTML, Markdown
    code-and-ui.md                  code in text, samples, command syntax, placeholders, UI, API comments
    names-and-naming.md             product names, trademarks, example values, filenames
    word-list-a-l.md / word-list-m-z.md   the complete word list
  evals/trigger_evals.json
```

The references are adapted from the official guide under CC BY 4.0 and
mirror its section headings, so a local heading always corresponds to an
official anchor. The official site is canonical when they differ; the index
records which "What's new" entry the snapshot reflects.

## Example

> write a how-to for adding a webhook to our service, proper docs style

The agent reads the webhook handler and config, then produces a page titled
"Add a webhook", with an audience line, a "Before you begin" list, a numbered
procedure whose steps put the location before the action and the goal
before the click, a click-to-copy `curl` sample with `UPPER_SNAKE`
placeholders followed by "Replace the following:", an introduced output
block, and a "What's next" section. Then it runs the checklist and notes
anything it couldn't verify from the code.

---
name: dev-docs
description: >
  Write, rewrite, or review developer documentation to a complete, packaged
  technical-writing style guide: tone, grammar, punctuation, formatting,
  procedures, code samples, placeholders, UI text, linking, naming, and a
  word list of about 700 terms, plus an index of every rule. Use whenever the
  user asks for developer docs, technical docs, a README, API reference,
  quickstart, how-to, tutorial, concept page, release notes, docstrings or
  reference comments, or a docs style review, or wants docs that read like a
  major platform's documentation. Also use to check a draft against the style
  guide or to look up a term in the word list.
---

# Developer documentation style

You write developer documentation the way a professional technical-writing
team does: conversational but precise, in second person and active voice,
prescriptive rather than a menu of options, formatted so a reader in a hurry
can scan it, and accessible to a global audience. This skill packages the full
style guide under `references/` and tells you when to open which file.

The guide is a set of guidelines, not laws. Project-specific style comes first,
this guide second, then Merriam-Webster (spelling), *The Chicago Manual of
Style* (nontechnical style), and the Microsoft Writing Style Guide (technical
style). When you depart from the guide, do it deliberately and stay consistent
across the document.

## Workflow

1. **Establish the reader and the document type.** Decide who "you" is (an app
   developer, a platform admin, a data engineer) and say so near the top if it
   isn't obvious. Pick the page type: concept, quickstart, how-to, tutorial,
   reference, troubleshooting, release notes, or README. The type dictates the
   title form and structure (see [Document shapes](#document-shapes)).
2. **Check for project style first.** Look for a project style guide,
   glossary, existing docs, or a docs `CONTRIBUTING.md`. Their terms, product
   names, and exceptions override this guide. Mirror the existing docs' heading
   depth, notice syntax, and code-fence conventions.
3. **Gather the facts from the code, not from memory.** Read the source,
   command help, API schema, or config that the doc describes. Every command,
   flag, field, default, and error message in the doc must be real. Never
   invent a product name, URL, or version.
4. **Draft with the core rules below.** Write the whole page, not an outline,
   unless the user asked for an outline. Put the most important information
   first in every page, section, paragraph, and sentence.
5. **Look things up while drafting.** Any time you hesitate over a word, a
   hyphen, a capital letter, a list's punctuation, or how to show a command,
   open the relevant reference rather than guessing. `references/INDEX.md`
   maps the official guide to the local files; the word list is a
   grep-friendly lookup (`grep -i "^- \*\*term" references/word-list-*.md`).
6. **Run the review checklist** at the end of this file before you hand the
   doc over. When the user asks you to review or edit someone else's draft,
   the checklist is the deliverable: report each issue with the rule it
   breaks and the fix, or apply the fixes if asked.

## Core rules

These are the non-negotiables. The references hold the details, exceptions,
and edge cases.

### Voice and tone

- Conversational, friendly, respectful. Like a knowledgeable colleague, not a
  legal document and not a comedian. No slang, no jokes, no pop-culture
  references, no exclamation points.
- **Second person.** Address the reader as *you*; use the imperative for
  instructions ("Click **Save**"). Use *we* only for the organization that
  authored the doc, with a clear antecedent. Reserve *user* for the user of
  the reader's software.
- **Active voice**, present tense. Say who does what: "The server sends an
  acknowledgment", not "an acknowledgment is sent". Passive is OK to
  emphasize the object, to de-emphasize an actor, or when the actor doesn't
  matter ("The file is saved").
- **Prescriptive.** Recommend one path. Use *must* for requirements, *can* for
  options, *might* for possibilities, "We recommend" for recommendations.
  Avoid *should* (ambiguous), *may* (permission versus possibility), *could*,
  and *would*.
- **Conditions before instructions.** "To delete the document, click
  **Delete**", "If your app runs in one of the following regions, ..."; state
  the location before the action: "In the Cloud console, go to the
  **Monitoring** page".
- **Timeless.** Document the current version. Avoid *currently*, *now*, *new*,
  *latest*, *soon*, *as of this writing*, *in the future*, *existing*, *old*.
  Don't pre-announce or hint at unreleased features.
- **No filler and no judgments about difficulty.** Cut *please*, *simply*,
  *easily*, *just*, *quickly*, *note that*, *it's that simple*, *let's*,
  *in order to*, *at this time*. Don't say a task is easy.
- **No anthropomorphism.** Software doesn't *want*, *think*, *know*, or
  *see*. Say what it does: "The API returns an error", "The service detects".
- Standard American spelling. Contractions are fine (*it's*, *don't*,
  *isn't*), but don't invent ones like *browser's* for *browser is*, and
  don't stack three (*mightn't've*).
- Write for a global audience: short sentences, one idea each, consistent
  terminology, no idioms, no figurative language, no cultural references,
  spelled-out abbreviations, unambiguous dates, and *that* to introduce
  restrictive clauses ("the file that you downloaded").
- Inclusive language: no *master/slave*, *whitelist/blacklist*, *sanity
  check*, *grandfathered*, *man-hours*, *dummy variable*; use *primary* or
  *main* or *controller* with *replica* or *worker*, *allowlist/denylist*,
  *quick check* or *confidence check*, *legacy* or *exempt*, *person-hours*,
  *placeholder*. Use gender-neutral *they*. Don't use ableist words (*crazy*,
  *blind to*, *cripple*), don't use *native* for people, and don't describe
  people by disability without need. Use diverse example names and the
  reserved example domains.

### Words

- Consult `references/word-list-*.md` for any term you're unsure of. High
  frequency ones: *app* (not application, for end-user programs); *backend*,
  *frontend*, *codebase*, *dataset*, *username*, *login* (noun) versus *log
  in* (verb), *setup* (noun) versus *set up* (verb), *checkbox*, *email*,
  *filename*, *hostname*, *internet* (lowercase), *web*, *website*, *URL*
  (with *a*), *ID* (not *id*), *canceled* (Merriam-Webster's first form),
  *tap* (touch) versus *click* (mouse), *select* (options, checkboxes),
  *clear* (checkboxes), *enter* (text into fields), *sign in* rather than
  *log in*, *on-premises*, *regular expression* (not *regex*), *repository*
  (not *repo*), *CLI* only for a specific tool. For settings, use the label
  and action the UI shows; *enable* is fine when it doesn't refer to a
  person.
- Say *see* for links ("For more information, see ..."). Say *about*, not
  *on*, for topics. Say *for example* or *such as*, not *e.g.*; *that is*,
  not *i.e.*; avoid *etc.*, *and so forth*, and *and so on* (introduce the
  list as non-exhaustive instead). Say *because*, not *since* or *as*
  (causation); *after*, not *once*; *lets you*, not *allows you to*; *use*,
  not *utilize* or *leverage*; *want* or *need*, not *wish* or *desire*;
  *versus*, not *vs.*; never *via*. Keep helper words like *then* in
  "if ... then" sentences.
- Spell out an abbreviation on first use in a page with the abbreviation in
  parentheses: "virtual machine (VM)". Well-known ones (API, URL, HTTP, CPU,
  JSON, SDK, ID, UI, AI) don't need spelling out. No Latin abbreviations, no
  internet abbreviations (*tl;dr*, *FYI*), no *ain't*-style slang.
- Never use *above* or *below* for position; use *preceding* and
  *following*, or *earlier* and *later*, or link to the section. Don't use
  directional language (*left-hand*, *on the right*) for UI.

### Headings and structure

- **Sentence case** for every title and heading: capitalize the first word
  and proper nouns only. Keep code out of headings where possible, no links,
  no numbers as sequence markers, no end punctuation, no *-ing* first words.
- Task headings use a bare infinitive ("Create an instance"); concept
  headings use a noun phrase ("Migration to the cloud"). Optional sections
  and steps start with "Optional:".
- One unique H1 per page. Don't skip heading levels. Never leave a heading
  with no content under it. Every page gets an introduction before the first
  H2 that says what the page is about and who it's for.
- Paragraphs address one idea in as few sentences as possible; more than
  five or six sentences is a signal to split. Put the key point first.
- Group related subsections with "the following sections", never "this
  section" or "these sections".

### Lists, procedures, and tables

- Introduce every list and procedure with a complete sentence ending in a
  colon (or a period if a note intervenes). "To customize the buttons, do
  the following:" or "Customize the buttons:" but never a fragment that the
  items complete ("To customize the buttons:").
- Numbered lists for sequences; bulleted lists for everything else;
  description lists (or bulleted run-in headings, `- **Term**: description`)
  for term-and-definition pairs. A single item isn't a list: a one-step
  procedure is one bulleted sentence.
- Parallel structure across items. Capitalize each item. End an item with a
  period if it's a sentence or contains a verb; no period for single words,
  noun phrases, pure code, or link text. Be consistent within a list.
- Run-in headings: bold, ending with a colon (lowercase description follows,
  no period unless it contains a verb) or a period (capitalized sentence
  follows). Never a dash.
- Procedure steps: one action per step, imperative verb first, location
  before action, goal before action ("To start a new document, click **File
  > New > Document**"), result after action in the same paragraph, "Optional:"
  for optional steps, sub-steps lettered a, b, c. Combine menu clicks with
  `>`. Don't write "Run the following command"; say what the command does.
  Don't include keyboard shortcuts. Give only the best way, not alternatives.
- Complex step order: action, command, placeholder explanation, command
  explanation, output, result.
- Tables: introduce with a sentence, give every column a header, use
  sentence case in cells, and put the item the reader scans for in the
  first column. Use a list instead when there is only one dimension of
  information, and a table when items have several properties to compare.
  See `references/formatting.md` under "Tables" for the decision rules.
- Notices sparingly: **Note** (useful, skippable), **Caution** (proceed
  carefully), **Warning** (don't do this; data loss, money, security),
  **Success** (interactive content only). Never a note for prerequisites,
  cross-references, results, or a required step. Never two notices in a row.

### Code, commands, placeholders, and UI

- Code font (backticks) for anything that appears literally in code or on a
  terminal: filenames, paths, commands, flags, methods, classes, fields,
  values, HTTP status codes, ports, environment variables, console output,
  query strings, `true`/`false`, data types in code. Not for product names,
  general concepts, or UI labels. Treat code items as nouns and add a
  descriptive noun the first time ("the `gcloud compute` command", "the
  `Node` class").
- Bold for UI elements the reader interacts with, written exactly as the UI
  shows them: **Save**, the **Name** field, **File > New > Document**. Verbs
  by element: *click* buttons and links (desktop), *tap* on touch, *select*
  options and checkboxes, *clear* checkboxes, *enter* into fields, *choose*
  for generic UI-independent choices, *go to* pages, *open* menus, *turn on*
  settings. Don't say *hit*, *press* (except keys), or *click on*.
- Keyboard keys: *press* a key or combination; spell out modifier keys and
  join with plus signs, no spaces: Control+S, Command+S, Shift+Enter. Mark
  keys with the `kbd` element in HTML; in plain Markdown leave them as
  plain text, not bold. *Press* also covers mechanical buttons.
- Placeholders in `UPPERCASE_WITH_UNDERSCORES`, descriptive, no possessives
  (`PROJECT_ID`, never `YOUR_PROJECT_ID` or `xxxx`). Inline in Markdown as
  *`PLACEHOLDER`*; in fences as plain `PLACEHOLDER`. Explain every
  placeholder the first time: one placeholder gets "Replace `PLACEHOLDER`
  with ..."; two or more get "Replace the following:" and a bulleted list in
  order of appearance, `PLACEHOLDER`: lowercase description. Output
  placeholders get "This output includes the following values:".
- Code samples: introduce with a sentence ending in a colon, fenced with a
  language tag, wrapped at 80 characters, indented per the language's style
  guide (two spaces for most). Show omissions with a comment in the sample's
  language (`# ...` or `// ...`), never a literal ellipsis, and don't mark an
  abbreviated block copyable. Show output after "The output is similar to
  the following:". A `$` prompt is optional for one-line commands; if a
  page mixes one-line and multi-line commands, use the prompt on every
  line of input, consistently, and never show the current directory
  before it.
- Command syntax: `[OPTIONAL]` in square brackets, `{A|B}` for a required
  choice, `...` for repeatable arguments, `--flag=VALUE` form for flags in
  prose and samples, and a backslash to continue long command lines. Explain
  the pieces in a "Replace the following:" list or a flags table. Sample
  commands should be copy-pasteable for the most common case.
- Example values only from the reserved sets: `example.com`, `example.org`,
  `example.net`, the documentation IP ranges (`192.0.2.0/24`,
  `198.51.100.0/24`, `203.0.113.0/24`, `2001:db8::/32`), US phone numbers
  in the `800-555-0100` through `800-555-0199` range, and neutral invented
  names, never real people, real companies, or real credentials. See
  `references/names-and-naming.md` for the full lists.
- API reference comments and docstrings: start each with a short sentence
  fragment or sentence that describes the element, present tense, third
  person ("Returns the user's display name"), no "This method ...".
  Parameters describe their value, not "the X parameter". Booleans say what
  `true` means. State units, defaults, and constraints.

### Punctuation and numbers

- Serial (Oxford) comma always. Comma after an introductory phrase and
  between independent clauses. Punctuation goes outside link text and
  inside quotation marks (American style). One space after a period.
- Em dashes without spaces, sparingly (a comma, colon, or parentheses is
  usually clearer); never an en dash or a spaced hyphen in place of an em
  dash, and never a dash between a list item and its description (use a
  colon or a period). Number ranges take a hyphen with no spaces (`1-10`),
  not an en dash, or the word *to* in prose. Hyphenate compound
  modifiers before a noun ("real-time data") but not after (*in real time*),
  not adverbs in *-ly*, and not most prefixed words (*preinstall*,
  *autoscaling*, *nonessential*, *multiregion*, *coauthor*). Check
  `references/punctuation.md#hyphens` for the tables.
- Colons introduce lists and samples; lowercase the text after a colon
  unless it's a complete sentence or a proper noun. No ampersands in prose.
  No slashes for *or* (*and/or* is banned). Parentheses sparingly; never
  for a plural "(s)": use the plural or "one or more".
- Numbers: spell out zero through nine, numerals for 10 and greater, and
  always numerals with units, in version numbers, in dimensions, with
  percentages, and for technical quantities. Spell out ordinals (*first*,
  not *1st*). A number that starts a sentence is spelled out (four-digit
  years are tolerated). Use commas as thousands separators, decimals rather
  than fractions where possible, and `$` before US dollar amounts.
- Dates as "January 19, 2024" (full month name, four-digit year) or ISO
  8601 `2024-01-19` when a numeric form is needed; never `1/19/24`. Times on
  the 12-hour clock with a space before uppercase AM or PM ("3:45 PM",
  "3 PM"); avoid time zones unless necessary, and then spell out the region
  with the UTC offset. No seasons in a global document; say the month or
  quarter. Units: a space between number and unit (`10 MB`, `5 ms`), binary
  units as GiB/MiB when you mean powers of two, and a hyphen-free range like
  `10-20 GB` with the unit once. Phone numbers with dashes:
  `800-555-0100`.

### Links and images

- Descriptive link text: the exact page title ("see [Load balancing and
  scaling]") or a descriptive phrase, never *click here*, *this document*,
  *this link*, or a bare URL. Include the abbreviation in the link text:
  "[virtual private cloud (VPC)]". Introduce standalone cross-references
  with "For more information, see ..." or "For more information about X,
  see ...". No quotes around linked titles; quotes for unlinked section
  titles, italics for unlinked book titles.
- Link once per destination per page, at the most useful spot. Say when a
  link downloads a file, opens email, or goes to a different section of the
  same page ("see the Configure DNS section of this document", linked to the
  heading). Don't force new tabs; don't use external-link icons.
- Every image has alt text (a concise description; no "Image of" or
  "Photo of"; `alt=""` only for purely decorative images), a sentence
  introducing it, and no essential information that's only in the image.
  Don't use screenshots for things that are easier in text. Refer to figures
  as "the preceding" or "the following", never "above" or "below".

## Document shapes

Match the page to the job. Titles are sentence case; task titles start with
a verb.

- **Overview / concept** (`What is X`, `X overview`, `Data model`): opening
  paragraph that says what X is and what problem it solves, audience line,
  then noun-phrase sections. No procedures. End with "What's next" links.
- **Quickstart** (`Quickstart: Deploy a service`): the fastest path to one
  result. Sections: "Before you begin" (prerequisites as a numbered
  procedure or bulleted requirements), one or two task sections with
  numbered steps, "Clean up" (undo billing or resources), "What's next".
- **How-to guide** (`Create a bucket`, `Configure IAM roles`): one task, one
  recommended way. "Before you begin", then task sections, each a numbered
  procedure; a "Troubleshooting" section only if there are real failure
  modes; "What's next".
- **Tutorial** (`Tutorial: Build a chat app`): a learning path with a stated
  objective and cost estimate, "Objectives", "Costs", "Before you begin",
  numbered task sections, "Clean up", "What's next". Explain why between
  steps; a how-to doesn't.
- **Reference** (`gcloud alpha widgets create`, `Widget API`, config
  fields): a one-sentence description, syntax block, then tables or
  description lists for arguments, flags, fields, return values, errors, and
  an example. Third-person present tense ("Returns", "Specifies"). Complete
  and alphabetized where order doesn't matter.
- **Troubleshooting**: each entry is a symptom heading (the exact error text
  in code font where practical), then "Cause" and "Solution" run-in headings.
- **Release notes**: dated entries, newest first, each item starting with the
  change type (Feature, Changed, Fixed, Deprecated, Breaking change) and a
  short sentence; here *new* and dates are allowed.
- **README** for a repo: a one-sentence description, what it does, install,
  a minimal usage example, configuration table, contributing and license
  links. Same rules as any other page; sentence-case headings, no badges as
  the only content of a section.

Markdown conventions the guide asks for: ATX headings (`#`), `**bold**` (not
`__`), `_italic_` (underscores), fenced code blocks with a language,
four-space indentation for continuation content inside list items so the
content stays in the item, `-` bullets, `1.` for every numbered item (or
sequential numbers, consistently), one blank line between blocks, no hard
line breaks inside sentences, tables with a header row. Use the site's
standard notice syntax (for plain Markdown: `**Note:** ...` as its own
paragraph, or the site's admonition syntax if it has one).

## Review checklist

Run this on every doc before delivering. When the user asks for a review,
report against it.

- Reader and page type are clear from the title and the first paragraph.
- Second person, active voice, present tense, imperative steps; no *should*,
  *may*, *would*, *please*, *simply*, *easy*, *just*, *currently*, *new*,
  *above/below*, *click here*, *etc.*, *e.g.*, *i.e.*, *and/or*, *via*,
  *utilize*, *leverage*, *in order to*, *note that*, *once* for *after*,
  *wish*, *desire*, *vs.*, *hit*.
- Sentence case everywhere; task headings are verb-first; no skipped
  heading levels; no empty sections; no code or links in headings.
- Every list has an introductory sentence, parallel items, consistent end
  punctuation, and the right list type. One-step procedures are a bullet.
- Every step: one action, verb first, location then action, goal then
  action, result in the same paragraph, "Optional:" where applicable.
- Every code item is in code font; every UI element is bold and matches the
  UI; verbs match the element (*click*, *tap*, *select*, *enter*).
- Every placeholder is `UPPER_SNAKE`, descriptive, and explained on first
  use; every sample has an intro sentence, a language tag, and no `$`
  prompt; omissions are comments; output is introduced.
- Serial commas; hyphenation checked against the tables; numbers, dates,
  times, and units in the guide's forms; no ampersands or slashes in prose.
- Links have descriptive text, one per destination, "For more information,
  see"; images have alt text and an intro; no directional language.
- Terms checked against the word list and the project's glossary; inclusive
  language; abbreviations spelled out on first use; example values from the
  reserved sets; no real names, keys, or domains.
- Notices are few, correctly typed, and never carry required information.
- Nothing pre-announced, no time-anchored words, no excessive claims (*best*,
  *fastest*, *world-class*, *guaranteed*, *seamless*, *bulletproof*).

## References

Open the file for the topic; every file mirrors the official section
headings so you can jump from `INDEX.md` straight to the rule.

- `references/INDEX.md`: the official navigation with every page and section
  URL mapped to its local heading, plus legacy redirect paths and the intro
  pages (about, highlights, what's new, philosophy).
- `references/principles.md`: voice and tone, accessibility, inclusive
  language, global audience, jargon, excessive claims, future features,
  timeless documentation, prescriptive documentation, third-party content.
- `references/grammar.md`: second person, active voice, present tense,
  sentence structure, abbreviations, anthropomorphism, articles,
  capitalization, contractions, plurals, possessives, prepositions,
  pronouns, verbs in reference docs.
- `references/punctuation.md`: colons, commas, dashes, ellipses, hyphens
  (with the prefix and compound tables), parentheses, periods and end
  punctuation, quotation marks, semicolons, slashes.
- `references/formatting.md`: text-formatting summary, headings and titles,
  paragraphs, lists, procedures, tables, notices, examples, footnotes,
  italics for terms, figures and images.
- `references/numbers-dates-units.md`: numbers, dates and times, units of
  measurement, phone numbers, mathematical notation.
- `references/linking-html-markdown.md`: cross-references and link text,
  headings as link targets, semantic HTML, HTML formatting, Markdown versus
  HTML.
- `references/code-and-ui.md`: code in text, code samples, command-line
  syntax, placeholders, UI elements and interaction verbs, API reference
  code comments.
- `references/names-and-naming.md`: product names, trademarks, example
  domains, IP addresses, names, and filenames.
- `references/word-list-a-l.md` and `references/word-list-m-z.md`: the
  complete word list, one entry per line, with the spelling guidance and
  the numbers-and-symbols section at the top of the first file.

Content in `references/` is adapted from a published developer documentation
style guide under the Creative Commons Attribution 4.0 license; `INDEX.md`
names the source pages, which are canonical when the two differ.

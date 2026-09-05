# General principles

These guidelines are distilled from the Google developer documentation style guide.
Source pages are linked per section; content adapted under CC BY 4.0.

## Voice and tone

Source: https://developers.google.com/style/tone

Aim for a voice that's conversational, friendly, and respectful without slang or being overly colloquial or frivolous. Be casual, natural, and approachable, not pedantic or pushy. Sound like a knowledgeable friend who understands what the developer wants to do.

Don't write exactly the way you speak; speech is usually more colloquial and verbose than developer documentation should be. But aim for a conversational tone rather than a formal one.

Don't try to be super-entertaining, but don't be super-dry either. Be human, let your personality show, and be memorable. Remember that the document's primary purpose is to give information to someone who's looking for it and may be in a hurry.

Readers come from many cultures and have varying levels of ability reading English. Avoid culturally specific references as much as possible. Simple, consistent writing also makes documents easier to translate. See [Writing for a global audience](https://developers.google.com/style/translation).

Related pages:

- [Write accessible documentation](https://developers.google.com/style/accessibility)
- [Write inclusive documentation](https://developers.google.com/style/inclusive-documentation)

### Some things to avoid where possible

- Buzzwords or [technical jargon](https://developers.google.com/style/jargon).
- Being too cutesy.
- [Figurative language](https://developers.google.com/style/inclusive-documentation#figurative-language), including metaphors and ableist language.
- Placeholder phrases like _please note_ and _at this time_.
- Choppy or long-winded sentences.
- Starting all sentences with the same phrase (such as _You can_ or _To do_).
- Current pop-culture references.
- Exclamation marks. In general, avoid exclamation points; see [exclamation points](https://developers.google.com/style/periods#exclamation-points).
- Wackiness, zaniness, and goofiness.
- Phrasing that denigrates or insults any group of people.
- Phrasing in terms of _let's_ do something.
- Phrases like _simply_, _It's that simple_, _It's easy_, or _quickly_ in a procedure.
- Internet slang or other [internet abbreviations](https://developers.google.com/style/abbreviations#dont-use) such as _[tl;dr](https://developers.google.com/style/word-list#tldr)_ or _[ymmv](https://developers.google.com/style/word-list#ymmv)_.

### Some techniques and approaches to consider

- If you're having trouble expressing something, step back and ask, "What am I trying to say?" The answer often reveals what the document should say.
- If you're unsure about phrasing or tone, ask a colleague to take a look.
- Read parts of the document out loud, or mouth the words. Not every sentence has to sound natural when spoken, but if one is awkward or confusing aloud, consider making it more conversational.
- Use transitions between sentences. Phrases like _Though_ or _This way_ can make paragraphs less stilted. (Transitions like _However_ or _Nonetheless_ can sometimes make them more stilted.)
- Even if you can't hit the right tone, make sure you're communicating useful information clearly and directly; that's the most important part.

### Politeness and use of _please_

Being polite is good, but using _please_ in a set of instructions overdoes it.

- Recommended: To view the document, click **View**.
- Not recommended: To view the document, please click **View**.
- Recommended: For more information, see [link to other document].
- Not recommended: For more information, please see [link to other document].

### Examples

| Too informal | Just about right | Too formal |
| ---- | ---- | ---- |
| Dude! This API is totally awesome! | This API lets you collect data about what your users like. | The API documented by this page may enable the acquisition of information pertaining to user preferences. |
| Just like a certain pop star, this call gets your _telephone_ number. The easy way to ask for someone's digits! | To get the user's phone number, call `user.phoneNumber.get`. | The telephone number can be retrieved by the developer via the simple expedient of using the `get` method on the `user` object's `phoneNumber` property. |
| Then—BOOM—just garbage-collect, and you're golden. | To clean up, call the `collectGarbage` method. | Please note that completion of the task requires the following prerequisite: executing an automated memory management function. |

## Write accessible documentation

Source: https://developers.google.com/style/accessibility

Write developer documentation with accessibility in mind. This page isn't exhaustive; it gives general guidelines and examples of best practices. The [World Health Organization](https://www.who.int/en/news-room/fact-sheets/detail/disability-and-health) estimates that 15% of the world's population (more than 1 billion people) have an accessibility need. Writing accessibly improves the experience for all readers.

Related pages:

- [Write for a global audience](https://developers.google.com/style/translation)
- [Write inclusive documentation](https://developers.google.com/style/inclusive-documentation)
- [Voice and tone](https://developers.google.com/style/tone)

### General dos and don'ts

- Don't use ableist language. Avoid bias and harm when discussing disability and accessibility; see [Writing inclusive documentation](https://developers.google.com/style/inclusive-documentation).
- Ensure readers can reach all parts of the document (including tabs, form-submission buttons, and interactive elements) using only a keyboard, without a mouse or trackpad.
- Test your documentation with a screen reader. It surfaces accessibility issues and is a good way to self-edit. See [List of screen readers](https://wikipedia.org/wiki/List_of_screen_readers).
- In HTML, use [semantic tagging](https://developers.google.com/style/semantic-tagging). For example, use the `em` element only to indicate emphasis, not italics.
- In HTML, prefer [native elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) over custom styles.
- Avoid unnecessary font formatting. Screen readers explicitly describe text modifications.
- If a product includes specialized accessibility features, document them explicitly. For example, the Google Cloud CLI (`gcloud` CLI) includes togglable features such as percentage progress bars and ASCII box rendering.
- Don't force line breaks (hard returns) within sentences and paragraphs. They might not work well in resized windows or with enlarged text.
- Avoid [camel case](https://wikipedia.org/wiki/Camel_case) and [all caps](https://wikipedia.org/wiki/All_caps) when possible. Some screen readers read capitalized letters individually, and some languages are [unicase](https://wikipedia.org/wiki/Unicase). Follow [capitalization](https://developers.google.com/style/capitalization) guidelines.
- Depending on the screen reader or personal settings, not all punctuation marks are read. Make sure the meaning survives without punctuation. For that reason, avoid exclamation marks, question marks, and semicolons when possible.
- Don't use _&_ instead of _and_ in headings, text, navigation, or tables of contents. It's OK to use _&_ when referencing UI elements that use it, or in table headings and diagram labels where space requires abbreviation. Using `&` for technical purposes in code is fine.

### Ease of reading

- Break up walls of text for scannability: separate [paragraphs](https://developers.google.com/style/paragraph-structure), create [headings](https://developers.google.com/style/headings), and use [lists](https://developers.google.com/style/lists).
- Use shorter sentences. Try for fewer than 26 words per sentence.
- Define acronyms and abbreviations on first use and if they're used infrequently.
- Use parallel structures for similar things. For example, start each list in the same format.
- Put the distinguishing and important information of a paragraph in its first sentence.
- Use clear, direct language. Avoid double negatives and exceptions for exceptions.
  - Recommended: You can continue without a path.
  - Not recommended: A missing path won't prevent you from continuing.
- Left-align text. Don't center or full-justify it.

### Headings and titles

Use descriptive headings and titles; they help readers navigate the browser and the page. Unique headings and titles make it easier to jump between pages and sections.

- Use a heading hierarchy.
- Don't skip levels. For example, put an `h3` element only after an `h2` element.
- To change a heading's visual formatting, use CSS rather than a heading level that doesn't fit the hierarchy.
- Don't have empty headings or headings with no associated content.
- Tag headings with heading elements. In HTML: `h1`, `h2`, and so on. In Markdown: `#`, `##`, and so on.
- Use a level-1 heading for the page title or main content heading.

See [Headings and titles](https://developers.google.com/style/headings).

### Links

- Use [meaningful link text](https://developers.google.com/style/cross-references#descriptive-link-text). Links should make sense out of context.
- Don't use _click here_ or _read this document_. Some screen reader users jump from link to link to scan a page and need to understand what each link contains.
- Use _see_ to refer to links and cross-references. See [see](https://developers.google.com/style/word-list#see).
- When a link does something the reader might not expect, such as downloading a file, opening a new tab, or jumping to another section of the same page, explain that behavior. See [Explain unexpected link behavior](https://developers.google.com/style/cross-references#explain-behavior).
- When possible, avoid adjacent links. Put a character between them.

### Lists

- In a [procedure](https://developers.google.com/style/procedures), make each instruction a [list item](https://developers.google.com/style/lists).
- Use lists to make steps easier to follow.

### Images

- Give every image an alt attribute. For [alt text](https://developers.google.com/style/images#alt-text), summarize the intent of the image. If the image is purely decorative, use empty alt text.
- Don't present new information in images. Always provide an equivalent text explanation.
- Don't repeat images unless absolutely necessary.
- Don't use images of text, code samples, or terminal output. Use actual text.
- Use SVG instead of PNG if available. SVGs stay sharp when zoomed.

See [Text associated with images](https://developers.google.com/style/images#text-associated-with-images).

### Videos, recordings, and GIFs

- Provide captions, transcripts, or descriptions of audio and video content. For example, use the [autocaption feature](https://support.google.com/youtube/answer/6373554) in YouTube.
- Ensure captions can be translated into major languages.
- Don't use flickering or flashing elements. They can cause anything from motion sickness to a seizure.

### Buttons and icons

- For form-submission buttons, use the native HTML `button` element.
- An icon is a symbol or image that represents an object or a function. See [Buttons and icons](https://developers.google.com/style/ui-elements#buttons) on the "UI elements and interaction" page.

### UI navigation

When you use angle brackets (`>`) to document menu paths, add an [`aria-label` attribute](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html) so screen readers interpret the brackets as "and then" instead of "greater than" or "keyboard arrow right". See [Menu bar](https://developers.google.com/style/ui-elements#term-menus).

### Tables

- Introduce tables in the preceding text; not all screen readers preannounce tables.
- Use table headings for the first column and first row only, with the [`th` element](https://www.w3.org/TR/html4/struct/tables.html#edef-TH).
- If a table has both row and column headings, mark heading cells with the [`scope` attribute](https://www.w3.org/WAI/tutorials/tables/two-headers/).
- If a table has more than one row of column headings, use the [`headers` attribute](https://www.w3.org/WAI/tutorials/tables/multi-level/) and give the headings unique IDs.
- Avoid tables in the middle of a numbered procedure when possible.
- Don't merge cells. Don't use `colspan` or `rowspan` attributes.
- Don't use tables unless they're the best way to present the information; tables are challenging for screen readers. See [List or table](https://developers.google.com/style/tables#list-or-table).
- Don't present new information in tables through images or symbols alone; always provide a descriptive `alt` attribute. See [Alt text](https://developers.google.com/style/images#alt-text).

See [Tables](https://developers.google.com/style/tables).

### Interactive elements

Introduce an interactive element (such as a button that expands and collapses) in the text preceding it.

- Recommended if practical: To see a list of requirements, expand the **Requirements** section.
- Recommended: To see a list of requirements, click the expander arrow (arrow_right icon).

### Forms

- Label every input field with a `label` element.
- Place labels outside of fields.
- In form-validation error messages, clearly state what went wrong and how to fix it, for example: "Name is a required field."

### Custom CSS and JavaScript

Use your site's standard styles and JavaScript as much as possible. If you use custom styles or code, follow these guidelines:

- Pick colors that respect [accessible color contrast ratios](https://webaim.org/resources/contrastchecker/) (4.5:1 for text).
- Don't use `visibility:hidden` or `display:none`. Both hide information from screen readers.
- Avoid mouseover events when possible. If you use them, add alternate focus and blur events for keyboard users.
- Ensure that ordering and positioning defined in styles reflects the DOM and the page's reading order (such as left to right and top to bottom).

### Document rendering

Make sure the document conveys everything you intended when viewed in these contexts:

- Without sound
- Using only sound
- Without images, including animation
- [Without color](https://colororacle.org/)
- Using a keyboard
- With screen magnification
- Without punctuation

Don't use color, size, location, or other visual cues as the primary way of communicating information.

- If you use color, an icon, or outline thickness to convey state, also provide a secondary cue, such as a change in the text label.
- Refer to buttons and other elements by their label. For visual elements with no text, don't describe the element; use its [`aria-label`](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html) attribute if possible.
  - Recommended: Click **Save**.
  - Recommended: Click **Notifications**.
  - Not recommended: Click the bell icon.
- Don't use directional language such as _above_, _below_, or _right-hand side_ to orient the reader. It works poorly for accessibility and localization: what's on the right in left-to-right languages appears on the left in right-to-left languages.

  Don't use directional language to refer to a position in a document. Text isn't _below_ when a screen reader reads it. Use _earlier_, _preceding_, or _following_ instead.
  - Recommended: In the preceding diagram, clients run jobs on multi-team or single-team clusters.
  - Not recommended: In the diagram above, clients run jobs on multi-team or single-team clusters.

  If a [UI element](https://developers.google.com/style/ui-elements) is hard to find, [provide a screenshot](https://developers.google.com/style/images).
  - Recommended: Click **Menu** (menu icon).
  - Not recommended: In the left-side panel, click the button with three lines.

### More resources

- [Google's main accessibility page](https://www.google.com/accessibility/)
- [Web Content Accessibility Guidelines (WCAG) 2.0](https://www.w3.org/WAI/WCAG20/glance/)
- [Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/)
- [Using ARIA](https://www.w3.org/TR/using-aria/)
- [Web Accessibility Tutorials](https://www.w3.org/WAI/tutorials/)

## Write inclusive documentation

Source: https://developers.google.com/style/inclusive-documentation

**Note**: This section includes references to potentially disrespectful or offensive terms. They're listed to provide usage guidance and alternatives.

Writing with inclusivity and diversity in mind makes content more precise and clear for all readers. Avoid any idiomatic or figurative language that can be misinterpreted or distracting.

This page isn't exhaustive; it gives general guidelines and examples of best practices.

Related pages:

- [Write for a global audience](https://developers.google.com/style/translation)
- [Write accessible documentation](https://developers.google.com/style/accessibility)
- [Voice and tone](https://developers.google.com/style/tone)

### Avoid unnecessarily gendered language

Be mindful of the [pronouns](https://developers.google.com/style/pronouns#gender-neutral-pronouns) used in narrative examples, and watch for other sources of gendered language.

| Recommended | Not recommended |
| ---- | ---- |
| Equipment installation takes around 16 person-hours to complete. | Equipment installation takes around 16 man-hours to complete. |
| Build AI that benefits humanity. | Build AI that benefits mankind. |

### Avoid figurative language

Use simple language and terminology that's precise and clear for all audiences:

- Avoid idiomatic or figurative language that can be misunderstood, distracting, or difficult to translate.
- Avoid [jargon](https://developers.google.com/style/jargon).
- Use terms that are established industry standards and widely understood by the target audience.

When aiming for a [friendly and conversational tone](https://developers.google.com/style/tone), you might slip into figurative language, such as figures of speech and other turns of phrase. Be attentive to word choice, especially when writing informally.

Don't use metaphors, and don't use a term in a metaphorical sense ([use words in their primary sense](https://developers.google.com/style/translation#use-words-in-their-primary-sense)). For example, avoid the metaphor of _pets versus cattle_ when comparing on-premises or stateful systems with stateless cloud systems.

For specific terms, see the [Word list](https://developers.google.com/style/word-list).

#### Avoid ableist language

Ableist language includes words and phrases such as _crazy_, _insane_, _blind to_ or _blind eye to_, _cripple_, _dumb_, and others. Choose a more accurate or alternative word for the context.

| Recommended | Not recommended |
| ---- | ---- |
| Before launch, give everything a final check for completeness and clarity. | Before launch, give everything a final sanity-check. |
| There are some baffling outliers in the data. | There are some crazy outliers in the data. |
| It slows down the service, causing a poor user experience until the queue clears. | It cripples the service, causing a poor user experience until the queue clears. |
| Replace the placeholder in this example with the appropriate value. | Replace the [dummy variable](https://developers.google.com/style/word-list#dummy-variable) in this example with the appropriate value. |

#### Avoid graphic or metaphorical language

Avoid unnecessarily graphic or metaphorical language when a more precise term is available.

For example, instead of _[STONITH](https://developers.google.com/style/word-list#stonith)_, use specific terms to describe the process used to stop an errant node. If you must mention a term like _STONITH_, mention it once when you first explain the feature, phrased to de-emphasize the term.

- Recommended: This approach might require you to fence failed nodes.
- Sometimes okay: This approach might require you to fence failed nodes (sometimes referred to as _STONITH_).

Always use the most precise and well-understood terms for your context. Some industry-established terms have a specific technical meaning with no accurate synonym; see the word list entries for [terminate](https://developers.google.com/style/word-list#terminate) and [execute](https://developers.google.com/style/word-list#execute).

| Recommended | Not recommended |
| ---- | ---- |
| If the connection doesn't respond, check for errors. | If the connection hangs, check for errors. |
| Point to **File**, and then click **New**. | Hover over **File**, and hit **New**. |

For specific terms, see the [Word list](https://developers.google.com/style/word-list).

### Write diverse and inclusive examples

Write for a [global audience](https://developers.google.com/style/translation#be-inclusive). Use diverse names, genders, ages, and locations in examples:

- Follow the [gender-neutral pronoun](https://developers.google.com/style/pronouns#gender-neutral-pronouns) guidance.
- Avoid being too culturally specific to the US. Be mindful when referring to specific holidays (see [_the holidays_](https://developers.google.com/style/word-list#holiday)), cultural practices, sports, and figures of speech.
- In examples, [choose a diverse set of names](https://developers.google.com/style/examples#example-person-names) to reflect a global audience. For fictional people, see [Further notes about example people](https://developers.google.com/style/examples#further-notes-about-example-people).
- When writing about older adults, avoid terms such as _the elderly_, _the aged_, _seniors_, _senior citizens_, or _80 years young_. Use _older adults_ or _aging population_, or mention the person's relative age or relationship to others in the example when relevant.

### Write about features and users in inclusive ways

Avoid referring to people in divisive ways. For example, instead of _native speakers_ or _non-native speakers_ of English, consider whether the document needs to discuss this at all, and revise it to describe the feature in terms relevant to anyone regardless of what languages they know.

Avoid socially charged terms for technical concepts where possible. For example, avoid [blacklist](https://developers.google.com/style/word-list#blacklist) and [native](https://developers.google.com/style/word-list#native) feature, and don't use [first-class citizen](https://wikipedia.org/wiki/First-class_citizen), even though such terms might still be widely used.

#### Replace or write around non-inclusive terms

If a term is well established in the industry and replacing it could cause confusion, see "Replace established terms." If a term occurs in code samples or keywords, see "Write around non-inclusive code terms." For non-inclusive jargon, see [Jargon](https://developers.google.com/style/jargon).

##### Replace established terms

Many non-inclusive terms, such as _whitelist_, are in wide use. If replacing an established term could confuse readers, refer to the non-inclusive term on first use, in parentheses, and then use the inclusive replacement throughout the rest of the document.

- Recommended: To make sure that administrators get the notification, add them to an allowlist (sometimes called a _whitelist_). Anyone who isn't on the allowlist is blocked ...
- Recommended: In this model, a Jenkins controller (master) handles HTTP requests. The Jenkins controller is designed to ...
- Recommended: In cloud architecture, servers are treated as commodities (sometimes described by using the metaphor _cattle, not pets_).

Often, instead of replacing a word directly, you can rewrite the sentence for clarity. For example, instead of replacing the verb _whitelist_ with _allowlist_, rewrite.

- Recommended: You can allow requests from a range of IP addresses by entering a CIDR block instead of a single address in the field.
- Not recommended: You can allowlist a range of IP addresses by entering a CIDR block instead of a single address in the field.

##### Write around non-inclusive code terms

Sometimes non-inclusive terms are embedded in code (or similar) as names or keywords, and you can't ignore them. What you can do is _minimize_ your use of the term, so you don't propagate it as a term of art, while still documenting clearly. Don't use a non-inclusive name or keyword unless it's in code font.

Following are scenarios for writing around non-inclusive terms that occur in code and keywords.

One scenario is documenting an existing system in which an entity is already named with a non-inclusive term. For example, a configuration file might include the following cluster name:

```yaml
apiVersion: v1
kind: Config
preferences: {}

clusters:
- cluster:
  name: master
- cluster:
  name: replica-1
```

Another scenario is documentation that includes a non-inclusive term that's an established keyword, such as the keyword `SLAVE` in dialects of SQL:

```sql
START SLAVE UNTIL SQL_AFTER_MTS_GAPS;
```

The first time you refer to a code item that uses a non-inclusive term, you can refer to that term directly, in code font, and in parentheses if possible.

- Recommended: The configuration file helps you create a parent node (which is named `master` in the file).
- Recommended: Start the replica by using the `START SLAVE` statement.

In subsequent mentions, use the preferred term (_parent node_, _replica_). If you must refer to the entity name or keyword again, do so only in code formatting.

### Avoid bias and harm when discussing disability and accessibility

When documenting accessibility features, or writing about people with disabilities or about accessibility, work to eliminate unintentional bias and harm. Educate yourself about how the communities you write about prefer to be identified and described before writing about them.

- Don't describe people without disabilities as _normal_ or _healthy_. This implies that people with disabilities are abnormal or sick and contributes to othering. Use _nondisabled person_, _sighted person_, _hearing person_, _person without disabilities_, or _neurotypical person_.
- Research how the communities you write about prefer to be identified and use their preferred terms. In many cases, avoid terms that remove personhood or define people by their disability, such as _the disabled_ or _a quadriplegic_. Use _people with disabilities_ or _a quadriplegic person_.

  However, many members of some communities prefer _identity-first language_; that preference is common in autistic, blind, and Deaf communities. Capitalization of identities can also vary (see [Identity-First Language](https://autisticadvocacy.org/about-asan/identity-first-language/) and [Self-Identification in the Deaf Community](https://www.verywellhealth.com/deaf-culture-big-d-small-d-1046233)). Whenever possible, research and choose terms that respect how people in the communities identify.
- Use _see_ to refer to links and cross-references. See [see](https://developers.google.com/style/word-list#see).
- Avoid terms that project feelings or judgments about a disability, such as _victim of_, _suffering from_, or _wheelchair-bound_. Use neutral terms such as _experiencing_, _living with_, or _uses a wheelchair_.
- Avoid euphemisms or patronizing terms such as _physically challenged_, _special_, _differently abled_, or _handi-capable_.

## Write for a global audience

Source: https://developers.google.com/style/translation

Developer documentation is written in US English, but some of it is translated into other languages or read by developers for whom English isn't their primary language.

Write with localization, translation, and internationalization in mind:

- _Localization:_ Adapting a product and its documentation for a specific country. This involves more than translation, for example using local currencies or units of measurement.
- _Translation:_ Translating one language to another. This might involve localization, but the terms aren't synonymous.
- _Internationalization:_ Designing a product and its documentation to minimize localization effort, for example placing all UI strings in a separate file to simplify translation.

See [Language localization](https://wikipedia.org/wiki/Language_localisation).

Related pages:

- [Write accessible documentation](https://developers.google.com/style/accessibility)
- [Write inclusive documentation](https://developers.google.com/style/inclusive-documentation)
- [Voice and tone](https://developers.google.com/style/tone)

### Use clear, concise, and unambiguous language

Consider global audiences and translation, and write in a way that's clear, concise, and unambiguous.

#### Use simpler words and shorter sentences

- Use a simple word. Don't use _commence_ when you mean _start_ or _begin_, _consequently_ when you mean _so_, or _utilize_ or _leverage_ when you mean _use_. (These words are fine when conveying a special sense, for example, _Cloud Spanner utilizes up to 100% of the available CPU resources._)
- Use a single word when it conveys the same idea as a phrase. Don't use _a number of_ when you can use _some_ or _many_.
- Write shorter sentences. Shorter sentences are easier to translate. English sentences can be shorter than those of some languages, so an average-length English sentence might become a long translated one. Long sentences impair understanding, cause rendering issues on the page or in the product interface, lengthen translation time, and increase translation and review costs.

#### Avoid phrasal verbs

- Avoid phrasal verbs (also called compound verbs) when possible. A phrasal verb combines multiple words into a single verb phrase. Try a simpler verb first. There might not be a better verb; exceptions include _set up_, _log in_, and _sign in_.
  - Recommended: This document uses the following terms:
  - Not recommended: This document makes use of the following terms:

#### Use modifiers appropriately

- Don't use too many modifiers. In particular, don't use more than two nouns as modifiers of another noun.
  - Recommended: A cloud-native DevSecOps pipeline in a hybrid environment
  - Not recommended: A hybrid cloud-native DevSecOps pipeline
- Don't misplace modifiers. Place a word like _only_ immediately before the word or phrase it relates to. If the meaning is still ambiguous, rephrase.
  - Recommended: Request only one token.
  - Recommended: Request no more than one token.
  - Not recommended: Only request one token.

#### Use active voice and present tense

- Use [present tense](https://developers.google.com/style/tense) and avoid complex or uncommon verb forms.
- Use active voice. The subject of the sentence performs the action. With passive voice, it's often hard for readers to figure out who's supposed to do something. See [Active voice](https://developers.google.com/style/voice).
- Avoid participles and gerunds (that is, _verbing_) when possible. _Verbing_ can be less direct and ambiguous. Consider replacing _using_ with _by using_, _that use_ (or _that uses_), or _you use_ as appropriate. See the word list entry [using](https://developers.google.com/style/word-list#using).

| Recommended | Not recommended |
| ---- | ---- |
| You must configure the VPC firewall rules before you deploy the VM instance. | Configuring the VPC firewall rules is required before deploying the VM instance. |
| This guide describes how to set up database replication. | This guide describes setting up database replication. |

#### Use words in their primary sense

- Don't use the same word to mean different things. In particular, avoid using the same word as both a noun and a verb in close proximity. For words with multiple meanings, see the word list entries for [once](https://developers.google.com/style/word-list#once), [while](https://developers.google.com/style/word-list#while), [as](https://developers.google.com/style/word-list#as), and [since](https://developers.google.com/style/word-list#since).
- Avoid directional language (for example, _above_ or _below_) in procedural documentation. See [UI elements and interaction](https://developers.google.com/style/ui-elements#buttons).

#### Use helper words and optional words

- Use qualifying nouns for technical keywords. For example, call `example.yaml` the _`example.yaml` file_, not _`example.yaml`_ by itself. See [Grammatical treatment of code elements](https://developers.google.com/style/code-in-text#keywords).
- Repeat a word if the redundancy improves comprehension.

| Recommended | Not recommended |
| ---- | ---- |
| If the VM has started and if you're able to connect... | If the VM has started and you're able to connect... |
| The resource hierarchy design creates both IAM segmentation and network segmentation by default. | The resource hierarchy design creates both IAM and network segmentation by default. |
| An egress rule whose action is `allow`, whose destination is `0.0.0.0/0`, and whose priority is the lowest possible (`65535`). | An egress rule whose action is `allow`, destination is `0.0.0.0/0`, and priority is the lowest possible (`65535`). |

- Use helper words. Words such as _then_, _that_, and _of_ are often dropped in conversational English. Use them to avoid ambiguity.

| Recommended | Not recommended |
| ---- | ---- |
| If the attribute key is not found, then the default value is returned. | If the attribute key is not found, the default value is returned. |
| This document is intended for data engineers and assumes that you have the following knowledge: | This document is intended for data engineers and assumes you have the following knowledge: |
| Identify all of the datasets. | Identify all the datasets. |
| Start the profiler, and then run the app. | Start the profiler, then run the app. |

  See also [Optional pronouns](https://developers.google.com/style/pronouns#optional-pronouns).

- Don't omit relative pronouns. Use _that_ and _which_ for clarity and to avoid ambiguity. See [Relative pronouns](https://developers.google.com/style/pronouns#relative-pronouns).
  - Recommended: You can programmatically update the rules that you previously defined.
  - Not recommended: You can programmatically update the rules you previously defined.

#### Clarify abbreviations and pronouns

- Define abbreviations. They're confusing out of context and don't translate well. Spell things out whenever possible, at least on first use. See [Abbreviations](https://developers.google.com/style/abbreviations).
- Clarify antecedents. Pronouns get tricky when translators work with small, unconnected strings of text. If a pronoun is ambiguous, replace it with the appropriate noun.
  - Recommended: If you use the term _green beer_ in an ad, then make sure that the ad is targeted.
  - Not recommended: If you use the term _green beer_ in an ad, then make sure that it's targeted.

#### Use apostrophes appropriately

Be careful with plural and possessive forms. In general, don't form a plural with _'s_, don't use the plural or possessive form with trademarks of company, product, and feature names, and don't use uncommon contractions. See [Possessives](https://developers.google.com/style/possessives), [Pluralization](https://developers.google.com/style/pluralization), and [Contractions](https://developers.google.com/style/contractions).

### Address users and their needs directly

Address the user and their needs directly and avoid unnecessary information.

- Address the reader directly. Use _you_ instead of _the user_ or _they_, unless you're referring to someone who uses the software the reader is developing. See [Second person and first person](https://developers.google.com/style/person).
- Provide context. Don't assume the reader already knows what you're talking about.
- Avoid negative constructions when possible. Consider whether you need to tell the reader what they can't do instead of what they can.

### Be consistent

Use standard sentence structures, consistent terminology, and appropriate punctuation to avoid barriers to understanding, ambiguity, and mistranslations.

#### Use consistent terminology

If you use a particular term for a concept in one place, use that exact term elsewhere, including the same capitalization. Different names for the same thing make translators think you mean different concepts and may produce different translations. Inconsistent terminology and phrasing increase translation costs, especially when translation memory and machine translation are used as first steps.

#### Use standard sentence structures and formatting

- Use standardized phrases for frequently used sentences, introductory phrases, and other common tasks. See [introducing links](https://developers.google.com/style/cross-references#link-introductions), [introducing output](https://developers.google.com/style/placeholders#placeholders-in-output), and [introducing code samples](https://developers.google.com/style/code-samples#introductions).
- Use standard English word order: _subject + verb + object_.
- Keep the main subject and verb as close to the beginning of the sentence as possible.
- Put the conditional clause first. To tell the audience to do something in a particular circumstance, mention the circumstance before the instruction. See [Sentence structure](https://developers.google.com/style/sentence-structure).
- Make list items parallel in structure, with consistent capitalization and punctuation. See [Lists](https://developers.google.com/style/lists).

#### Use consistent text formatting

- Use consistent typographic formats. Use bold and italics consistently; don't switch from italics for emphasis to underlining. See [Text-formatting summary](https://developers.google.com/style/text-formatting).
- Use consistent capitalization. See [Capitalization](https://developers.google.com/style/capitalization).

### Be inclusive

You're not writing for your culture. See [Writing inclusive documentation](https://developers.google.com/style/inclusive-documentation).

- Write [dates and times](https://developers.google.com/style/dates-times) unambiguously.
- Don't be too culturally specific. Don't refer to specific holidays, cultural practices, or sports unless you're certain they're known worldwide.
- Use a diverse set of example names. If you need people's names (for example, as email addresses), use a diverse set. See [Example domains and names](https://developers.google.com/style/examples).
- Avoid colloquialisms, idioms, or slang. Phrases like _ballpark figure_, _back burner_, or _hang in there_ are confusing and hard to translate.
- Avoid humor. Most humor is hard to translate, and much of it is culturally specific.
- Avoid geographically specific references, like the seasons. August isn't summer in the southern hemisphere. See [Expressing divisions of the year](https://developers.google.com/style/dates-times#divisions-year).

### Consider accessibility for images

Use screenshots and text in figures sparingly. Images don't get translated. Convey new information through text, not in a figure or image. See [Figures and other images](https://developers.google.com/style/images).

## Jargon

Source: https://developers.google.com/style/jargon

Jargon is the specialized and often figurative terminology of a specific group for a larger concept, for example _camel case_, _swim lane_, _break-glass procedure_, or _out-of-the-box_. Jargon also includes vaguely defined or overloaded terms like _solution_, _support_, or _workload_.

Typically only the specific group understands the jargon. It hampers content that's clear, that reaches a [global audience](https://developers.google.com/style/translation) in multiple languages, that serves readers at various levels of product knowledge, and that's inclusive of different groups and cultures. See [Write inclusive documentation](https://developers.google.com/style/inclusive-documentation).

However, some jargon is widely understood and accepted by the industry or by a document's audience, and it can be valuable when readers search for those terms. If you're going to use jargon, consider these questions:

- **Can you write around the term?** If you don't need it for search engine optimization (SEO), try writing around it. Instead of _Hold a post-mortem_, write _When the project is finished, review what processes worked or didn't work_. Instead of _Create a back-of-the-envelope design_, write _Use an informal design process_.
- **Can you replace the term with a different, more specific term?** The [word list](https://developers.google.com/style/word-list) offers replacements such as _affected area_ or _spatial impact_ (for _blast radius_), _import_ or _load_ (for _ingest_), and _ready-made_ or _pre-built_ (for _off-the-shelf_). When a word list term is marked "Don't use" (some jargon is offensive, violent, or not inclusive), replace it or write around it.
- **Are you using the term only once in your document?** If so, describe it in plain language and refer to it in parentheses, or link to a trusted definition.
  - Recommended: You then move the task to an earlier part of the process (also known as _shifting left_).
  - Recommended: A [split-brain](https://en.wikipedia.org/wiki/Split-brain_(computing)) situation can develop.
- **Are you using the term throughout your document?** If so, briefly describe it in parentheses on first reference, or link to a trusted definition.
  - Recommended: The application is in the same state as a _cold standby_ (a backup or redundant system that's identical to a primary system).
  - Recommended: A better approach is to use a pattern called a [_dead letter queue_](https://en.wikipedia.org/wiki/Dead_letter_queue).
- **Is the term used in a command or code sample?** If so, use the words only in direct reference to the code items ([formatted as code](https://developers.google.com/style/code-in-text)), and make it clear what you're referring to.
  - Recommended: Add a user to the allowlist (`whitelist`) by entering the following: `whitelist adduser EMAIL_ADDRESS`.
  - Not recommended: Add a user to the whitelist by entering the following: `whitelist adduser EMAIL_ADDRESS`.

## Avoid excessive claims

Source: https://developers.google.com/style/excessive-claims

Don't make excessive claims in documentation. An _excessive claim_ is an assertion that does any of the following:

- Makes a statement about performance or cost that isn't easily verifiable with data available to the reader.
- Makes a statement about security that would be invalidated by a security incident.
- Makes a statement that might be interpreted as subjective or even disparaging, especially about third-party products.

When assessing whether text makes an excessive claim, consider not just what's true today about a product's performance, cost, security, or functionality, but what might be true in the future.

Guidelines:

- When describing products, avoid superlatives like _best_, _simplest_, _fastest_, _never_, and _always_. Be careful with _ensure_ and _guarantee_; use them only when something can truly be ensured or guaranteed.
- If you make specific performance claims (how fast a product is, how much storage it requires, and so on), reference the source of the information.
- If documentation claims a product is secure, it becomes invalid and not credible if someone compromises the product. It's safer to say a feature "helps with security" or "is designed for security"; those statements stay true even after a security incident.
- A statement about a competitive product might be untrue if you misinterpret how the product works, or become untrue when the other company ships a new release.

The safest approach is always to write factually and objectively, limiting what you say to verifiable information that will be true over the lifespan of the documentation.

- Recommended: Our product distributes datasets and computation in memory across a cluster, and therefore it can be faster for this scenario than ExampleCorporation's product. For more information, see [Performance comparison](https://www.google.com/).
- Not recommended: Our product is faster than ExampleCorp's product.
- Recommended: Using our security product is part of an overall strategy that helps prevent account takeovers from phishing attacks.
- Not recommended: Our security product prevents account takeovers from phishing attacks.

## Future features

Source: https://developers.google.com/style/future

Avoid documenting future features or products, even in innocuous ways. Don't pre-announce anything in documentation unless it has been approved by your legal counsel.

See also [Present tense](https://developers.google.com/style/tense) and [Timeless documentation](https://developers.google.com/style/timeless-documentation).

## Timeless documentation

Source: https://developers.google.com/style/timeless-documentation

Timeless documentation avoids words and phrases that anchor the documentation to a point in time or assume knowledge of prior or future products and features. In general, document the current version of a product or feature.

Timelessness matters most for technical documents that might be read long after they're written. Words like _now_, _new_, and _currently_ can make such documentation inaccurate, outdated, or meaningless. Timeless documentation focuses on how the product works right now, not on how it changed from previous versions or how it might change in the future.

| Recommended | Not recommended |
| ---- | ---- |
| These subcommands let you interact with HTTP load balancing. | These new subcommands let you interact with HTTP load balancing. |
| The following command-line options aren't supported: | The following command-line options aren't currently supported: |
| The emulator supports the following filters: | The emulator now supports the following filters: |

In procedural or time-stamped content such as press releases, blog posts, or release notes, time-based words are okay. _New_ is fine in a blog post announcing updates: _Dataflow includes several new features._ _Soon_ is fine in procedural content to emphasize a change in state after a step: _The VM goes offline soon after you send the shutdown command._ But these words can become outdated or incorrect when product documentation uses them for a product's features and capabilities, so avoid them in that context.

Timeless product documentation has the following value:

- It reduces the maintenance needed to keep documentation up to date.
- It avoids assuming the reader knows earlier versions of the product.

### Words and phrases to avoid

The following can undermine timelessness:

- **Words and phrases that make promises or project plans and strategies**. When describing product or feature capabilities, words such as _at present_, _as of this writing_, or _eventually_ can prematurely disclose plans or inappropriately imply that a product or feature might change. Don't use them in those cases. See [Documenting future features](https://developers.google.com/style/future).
- **Words and phrases that are implied**. Documentation is assumed current unless a specific release version is specified, so _currently_ and _as of this writing_ are implied by the documentation's existence.
- **Words and phrases that become outdated soon after publication**. Words such as _soon_ and _latest_ quickly become irrelevant.
- **Words and phrases that assume prior knowledge of a product or feature**. If you must use words like _new_, give a reference point such as a date or version release number, for example, _The January 14, 2021 release of BigQuery includes a new resource panel._

When describing product or feature capabilities in product and reference documentation, avoid:

- as of this writing
- currently
- does not yet
- eventually
- existing
- future, in the future
- latest
- new, newer
- now
- old, older
- presently, at present
- soon

## Prescriptive documentation

Source: https://developers.google.com/style/prescriptive-documentation

Write prescriptive documentation.

_Prescriptive_ (or _opinionated_) documentation recommends a way to achieve tasks and accomplish goals. It tells the reader what to do instead of listing options to choose from. When a goal or task is complex and involves multiple approaches or products, prescriptive documentation recommends a path.

Prescriptive writing affects several aspects of documentation:

- **The purpose and structure of a document**. Prescriptive documentation states a clear, specific purpose. Headings and content serve that purpose.
- **Example scenarios and procedures**. Scenarios and procedures reflect the use cases most likely relevant to readers.
- **Sample commands**. Prescriptive documentation provides commands and arguments that accomplish the task for the most common use case. See [Optional arguments in click-to-copy commands](https://developers.google.com/style/code-syntax#click-to-copy-commands).

Best practice documents are typically prescriptive. For an example, see [Operations best practices](https://cloud.google.com/architecture/security-foundations/operation-best-practices).

### Word choice for recommendations and requirements

To indicate required or optional user actions or the outcomes of a process, select an appropriate auxiliary verb such as _must_, _can_, or _might_. Generally avoid _should_. It creates ambiguity and uncertainty and is thus problematic for prescriptive documentation. When telling the reader what to do, _should_ implies the action is recommended but optional, leaving the reader unsure what to do.

To clarify, determine whether an action is _required_ versus _optional_, an outcome is _expected_ versus _possible_, or a state is _actual_ versus _recommended_.

- **If an action is required**: use _must_, or rephrase as a clear imperative such as "Do the following before you continue."
- **If an action is recommended**: use _We recommend ..._ or _Google recommends ..._. You can use _should_ if a recommended action is generally recognized, for example, "You should use a strong password ..." or "You should follow the principle of least privilege ...."
- **If an action is optional**: use _can_. For example, "You can also use approach B to solve the same problem."
- **If an outcome is expected**: describe what is expected. For example: "The process returns 10 items."
- **If an outcome is possible**: use _might_ or _can_. For example, "The process can take about 30 minutes."
- **If a state is actual**: when describing the state of something, such as a variable's value, avoid "The value should be true." Clarify which you mean:
  - "You must set the value to true."
  - "The server sets the value to true."
  - "If the value is false, follow these steps to change it to true."

  To clarify who's performing an action, see [Active voice](https://developers.google.com/style/voice).

Examples:

- Recommended: Ensure that the Classroom Share Button conforms to our min-max size guidelines and related color/button templates.
- Recommended: The column of the data table that the filter operates on.
- Recommended: Whether it's a brand new project or an existing one, perform the following steps.
- Not recommended: The Classroom Share Button should conform to our min-max size guidelines and related color and button templates.
- Not recommended: The column of the data table that the filter should operate on.
- Not recommended: Whether it's a brand new project or an existing one, here's what you should do.

### More resources

- See also [can](https://developers.google.com/style/word-list#can), [could](https://developers.google.com/style/word-list#could), [may](https://developers.google.com/style/word-list#may), [might](https://developers.google.com/style/word-list#might), [must](https://developers.google.com/style/word-list#must), and [would](https://developers.google.com/style/word-list#would) in the word list.

## Third-party content

Source: https://developers.google.com/style/other-sources

Don't copy content from another source; it might violate copyright. Paraphrase and link to their content instead.

Content includes text, images, code, logos, and speech.

- Recommended: A [recovery point objective (RPO)](https://en.wikipedia.org/wiki/Disaster_recovery#Recovery_Point_Objective), which is the maximum acceptable length of time during which data might be lost from your app due to a major incident.
- Not recommended: Recovery Point Objective (RPO): "RPO is the maximum targeted period in which data (transactions) might be lost from an IT service due to a major incident" (<https://en.wikipedia.org/wiki/Disaster_recovery#Recovery_Point_Objective>).

### Avoid third-party content

Unless you're sure your company owns the assets, avoid copying from these sources:

- Third-party sources: documentation, websites, books, blogs, videos, images, podcasts, and more.
- Reference sources: dictionaries, encyclopedias, and Wikipedia.
- Open source product documentation: open source software (OSS) licenses range from no reuse without attribution to complete freedom to use the material. Don't assume you can reuse the content freely. When in doubt, don't use it.
- GitHub content: different GitHub users adopt different licenses. Don't assume you can reuse the content freely. When in doubt, don't use it.

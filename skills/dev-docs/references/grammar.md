# Language and grammar

These rules are distilled from the Google developer documentation style guide.
Source pages are linked per section; content adapted under CC BY 4.0.

## Second person and first person

Source: https://developers.google.com/style/person

### Address the reader as _you_

Address the reader in the second person: use _you_ or _your_ instead of _we_, _our_, or _us_. Assume the reader is the person doing the tasks or making the decisions. Use the word _user_ only for the user of the software your reader is developing.

| Recommended | Not recommended |
| ---- | ---- |
| The following sections describe how you can create a website. | The following sections describe how we can create a website. |
| Consider adding a description to your table. | Let's add a description to our table. |
| This document shows you how to develop an app for your organization. | This document shows the user how to develop an app for their organization. |

When telling the reader to do something, use the imperative (the _you_ is implied).

- Recommended: Click **Submit**.

The imperative is fine in running text after you establish who is being addressed, but consider whether imperative text should instead be formatted as a procedure.

- Recommended: You can obtain the IP address for the appliance from your network administrator. Store the address in a variable for future use in the runbook.
- Not recommended: To hold the backup data, create a storage bucket. In the Google Cloud console, go to the **Buckets** page. Click **Create bucket**.

Sometimes _you_ isn't accurate. Use the second person for what the reader does, but the third person for what the software or an end user does. In API documentation, for example, state facts about programming elements in the third person, but address the reader as _you_ when telling them what to do with those elements.

### Use first-person plural pronouns carefully

First-person plural pronouns (_we_, _our_, _us_) are acceptable when referring to the organization presented as the document's author, as long as the antecedent is clear.

- Recommended: Example Organization provides A and B, but we don't provide C and D.
- Recommended: For more information, contact our sales organization.
- Recommended: The example.org support team regularly reviews tickets. Expect to hear from us in 2-3 business days.

### Address your audience consistently

Identify who the _you_ is (a developer? a sysadmin? someone else?) and stay consistent. Make clear who you expect the reader to be, sometimes with an explicit audience sentence near the beginning of the document.

## Active voice

Source: https://developers.google.com/style/voice

Use active voice (the grammatical subject performs the action) rather than passive voice (the subject is acted upon), with some exceptions. Make clear who's performing the action.

In passive voice it's easy to omit who or what performs an action, so readers can't tell who is supposed to do something (the reader, the computer, the server, an end user, a visitor to a web page).

- Recommended: Send a query to the service. The server sends an acknowledgment.
- Not recommended: The service is queried, and an acknowledgment is sent.

You can name the actor in passive voice with _by_, but the result is generally worse than recasting in active voice. Whenever possible, make the doer the subject.

- Recommended: Send a query to the service. The server sends an acknowledgment.
- Not recommended: The service is queried by you, and an acknowledgment is sent by the server.

For more information, see [Active voice vs. passive voice](https://developers.google.com/tech-writing/one/active-voice) in Google's Technical Writing One guide.

### Exceptions

Passive voice can be okay in these cases:

- To emphasize an object over an action.
  - Recommended: The file is saved.
- To de-emphasize a subject or actor.
  - Recommended: Over 50 conflicts were found in the file.
  - Not recommended: You created over 50 conflicts in the file.
- When readers don't need to know who's responsible for the action.
  - Recommended: The database was purged in January.

## Present tense

Source: https://developers.google.com/style/tense

Use present tense for statements describing general behavior not tied to a particular time.

- Recommended: Send a query to the service. The server sends an acknowledgment.
- Not recommended: Send a query to the service. The server will send an acknowledgment.

Future tense (_will_) is fine to distinguish an action that will occur in the future.

- Recommended: Add the filename to the backup list. The file will be archived the next time the backup process runs.

Future tense is appropriate in the next example because Pub/Sub sends messages asynchronously; subscribers don't receive them immediately.

- Recommended: A message is sent that will notify any Pub/Sub subscribers.
- Not recommended: A message is sent that notifies any Pub/Sub subscribers.

Don't use future tense to describe how a product or feature will work after the next release or update. See [Document future features](https://developers.google.com/style/future).

Avoid the hypothetical future _would_.

- Recommended: If you send an unsubscribe message, the server removes you from the mailing list.
- Not recommended: You can send an unsubscribe message. The server would then remove you from the mailing list.

## Sentence structure

Source: https://developers.google.com/style/sentence-structure

When telling the reader to do something, mention the circumstance, conditions, or goal before the instruction. Stating the circumstance first lets the reader skip instructions that don't apply. For procedural instructions, see [Procedures](https://developers.google.com/style/procedures).

| Recommended | Not recommended |
| ---- | ---- |
| For more information, see [link to other document]. | See [link to other document] for more information. |
| To delete the entire document, click **Delete**. | Click **Delete** if you want to delete the entire document. |
| If your app is located in one of the following regions, using custom domains might add noticeable latency to responses: | Using custom domains might add noticeable latency to responses if your app is located in one of the following regions: |

## Abbreviations

Source: https://developers.google.com/style/abbreviations

Abbreviations include acronyms, initialisms, shortened words, and contractions. In most contexts the distinction between acronyms and initialisms isn't relevant; it's fine to use _acronym_ for both.

- An acronym is formed from the first letters of words in a phrase and pronounced as a word: _NATO_ for _North Atlantic Treaty Organization_; _scuba_ for _self-contained underwater breathing apparatus_.
- An initialism is also formed from first letters, but each letter is pronounced separately: _CIA_ for _Central Intelligence Agency_; _FYI_ for _For Your Information_; _PR_ for _Public Relations_.
- A shortened word is part of a word or phrase, sometimes with a period at the end: _Dr._ for _doctor_; _etc._ for _et cetera_; _min_ for _minutes_; _CA_ for _California_.
- [Contractions](https://developers.google.com/style/contractions) are covered on a separate page.

### Long and short versions of a word

Some words have a long and a short version: _application_ and _app_, _demonstration_ and _demo_, _synchronize_ and _sync_. The short versions are not abbreviations, and they take no period.

If you're not sure whether a word is an abbreviation or a short version, check the [editorial resources](https://developers.google.com/style#editorial-resources). If that doesn't settle it, use the speaking test: if you speak the short version as a word (_This is a demo version of the product_), treat it as a word, not an abbreviation.

### When to use abbreviations

Abbreviations save the writer and reader time. If the reader has to think about an abbreviation, it slows comprehension.

#### General dos and don'ts

- Use standard acronyms and initialisms that save the reader time.
- Spell out abbreviations on first reference. See [When to spell out a term](https://developers.google.com/style/abbreviations#spelling-out).
- Avoid abbreviations for terms unrelated to the document's main topic. In the following examples the topic is the internet of things, so _low Earth orbit_ should not be abbreviated.
  - Recommended: The internet of things (IoT) service can even be used for connecting to sensors in low Earth orbit.
  - Not recommended: The IoT (internet of things) service can even be used for connecting to sensors in LEO (low Earth orbit).
- Be wary of specialized abbreviations your readers might not understand. See [Jargon](https://developers.google.com/style/jargon).

### When to spell out a term

When an abbreviation is likely unfamiliar to the audience, spell it out on first mention and put the abbreviation in parentheses immediately after.

- Recommended: _Border Gateway Protocol_ (_BGP_)

For all later mentions, use the abbreviation alone. If you use a term only once, include the abbreviation only if it's as commonly used as the spelled-out term; otherwise omit it.

If the first mention is in a [heading or title](https://developers.google.com/style/headings), you can use the abbreviation there and spell it out in the first paragraph after the heading.

Consider your audience. If the document will be translated, spelling out a term gives context for human and machine translation, and it helps readers less familiar with English. If most of the audience will recognize the term, don't spell it out: developer documentation that references an API needn't spell out _application programming interface_, but an explanation of APIs for someone with no programming experience might.

Sometimes spelling out doesn't help: _portable document format_ doesn't clarify what a _PDF_ is. In those cases, don't spell it out.

These abbreviations rarely need to be spelled out:

- AI
- API
- DVD
- File formats such as PDF or XML
- HTML
- PC
- RAM
- REST
- [Units of measurement](https://developers.google.com/style/units-of-measure#byte-units) such as MB, MiB, GB, or GiB
- URL
- USB

#### Format abbreviation introductions

When you spell out a term with its abbreviation in parentheses:

- Italicize both the spelled-out term and the abbreviation. The only difference in these examples is the italicization of _BGP_:
  - Recommended: Establish _Border Gateway Protocol_ (_BGP_) sessions using a router on the peer network.
  - Not recommended: Establish _Border Gateway Protocol_ (BGP) sessions using a router on the peer network.
- Capitalize the spelled-out version only if the long form is a proper noun or conventionally capitalized. Don't capitalize it just because the abbreviation uses capital letters.
  - Recommended: data manipulation language (DML)
  - Not recommended: Data Manipulation Language (DML)
- Include the abbreviation in [link text](https://developers.google.com/style/cross-references#abbreviations).

### Abbreviations not to use

Don't use _i.e._ or _e.g._; use _that is_ or _for example_. See [e.g.](https://developers.google.com/style/word-list#eg) and [i.e.](https://developers.google.com/style/word-list#ie)

It's [okay to use _etc._ in some circumstances](https://developers.google.com/style/word-list#etc), but different phrasing is usually better in lists. See [Comma-separated lists](https://developers.google.com/style/lists#comma-separated-lists).

Don't use internet slang abbreviations such as [_tl;dr_](https://developers.google.com/style/word-list#tldr), [_ymmv_](https://developers.google.com/style/word-list#ymmv), [_RTFM_](https://developers.google.com/style/word-list#rtfm), or others. Write out what you mean non-figuratively.

Use the most common form of a word. If the spelled-out word is common and easily understood, use it rather than abbreviating: write _approximately_, not _approx._

Spell out shortened words or common symbols that substitute for words.

- Recommended: Updating the software made throughput 10 times faster.
- Not recommended: Updating the software made throughput 10x faster.

### Periods with abbreviations

- Don't use periods with acronyms or initialisms.
- Put a period at the end of a shortened word, except for [date and time](https://developers.google.com/style/dates) abbreviations.
- If you write or say an abbreviation as a word (_app_, _sync_), don't put a period after it.
- Don't use a period with an abbreviation for a country, US state, or the District of Columbia (DC).

### Plural abbreviations

See [Pluralization](https://developers.google.com/style/pluralization#making-abbreviations-plural).

### Abbreviations as verbs

Don't use acronyms, initialisms, or shortened words as verbs.

- Recommended: Use SSH to log in to your remote shell.
- Not recommended: Then ssh into your remote shell.

### Indefinite articles before abbreviations

Whether to use _a_ or _an_ depends on pronunciation: _a_ before a consonant sound, _an_ before a vowel sound. Pronunciation of abbreviations varies, so base the choice on the pronunciation most common for your audience.

The word list prefers "[a SQL](https://developers.google.com/style/word-list#sql)", "[a FHIR](https://developers.google.com/style/word-list#fhir)", and "[an SAP](https://developers.google.com/style/word-list#sap)".

See also [Articles](https://developers.google.com/style/articles).

## Anthropomorphism

Source: https://developers.google.com/style/anthropomorphism

Don't attribute human qualities to software or hardware.

Anthropomorphism is figurative language, which is less precise and often harder to understand and translate than direct language. See [Write for a global audience](https://developers.google.com/style/translation).

- Recommended: A Delimiter object specifies where to split a string.
- Not recommended: A Delimiter object tells the splitter where a string should be broken.
- Recommended: The PC detects a new device.
- Not recommended: The PC sees a new device.

## Articles (a, an, the)

Source: https://developers.google.com/style/articles

For ease of comprehension and translation, include definite and indefinite articles (_a_, _an_, _the_). Don't skip articles for brevity, including in headings and titles.

- Recommended: Create a VM instance
- Not recommended: Create VM instance

Related guidance:

- Standard English word order and writing for a global audience: [Write for a global audience](https://developers.google.com/style/translation).
- Clear headings and titles: [Headings and titles](https://developers.google.com/style/headings).
- Articles before product names: [Articles before product names](https://developers.google.com/style/product-names#the-with-names).
- _A_ or _an_ before an abbreviation whose pronunciation varies: [Indefinite articles before abbreviations](https://developers.google.com/style/abbreviations#articles).

## Capitalization

Source: https://developers.google.com/style/capitalization

Follow the standard [capitalization rules](https://owl.purdue.edu/owl/general_writing/mechanics/help_with_capitals.html) for American English. Additionally:

- Don't use unnecessary capitalization; before capitalizing a word, think about why (and whether) it should be capitalized.
- Don't rely on a difference in capitalization to convey meaning. Kubernetes users may know that a capitalized _Pod_ is a Kubernetes unit and a lowercase _pod_ is any other pod, but that distinction is lost on casual readers and newcomers.
- Don't use all-uppercase, except in official names, in [abbreviations](https://developers.google.com/style/abbreviations) always written in all-caps, or when referring to code that uses all-caps.
- Don't use [camel case](https://en.wikipedia.org/wiki/Camel_case), except in official names or when referring to code that uses camel case.

For specific words, see the [word list](https://developers.google.com/style/word-list).

### Capitalize product names

See [Product names](https://developers.google.com/style/product-names).

### Capitalization in titles and headings

In [document titles and headings](https://developers.google.com/style/headings), use sentence case: capitalize only the first word of the title, the first word of a subheading after a colon, and proper nouns or other terms always capitalized a certain way.

Don't put a period at the end of a title or heading.

#### Capitalization in references to titles and headings

When referencing a title or heading from a document that follows this guide, use sentence case even if the title itself uses title case, so the reference matches once the title is updated.

When referencing the title of a work or source that doesn't follow this guide, retain the original capitalization.

See [Cross-references and linking](https://developers.google.com/style/cross-references) and, for formatting references to third-party sources, [HTML and semantic tagging](https://developers.google.com/style/semantic-tagging).

### Capitalization and colons

Lowercase the first word after a colon, unless the text is:

- A proper noun (_Open source software: Hadoop_)
- A heading; see [Capitalization in titles and headings](https://developers.google.com/style/capitalization#capitalization-in-titles-and-headings)
- A quotation (_Arthurian wit: "Bring me yon sworde"_)
- Text following a label such as _Caution_ or _Note_

### Capitalization and figures

Use sentence case for captions, and for labels, callouts, and other text in images and diagrams.

### Capitalization in glossaries and indexes

Use lowercase for glossary and index terms unless the term is a proper noun or otherwise requires capitalization. Use sentence case for glossary definitions.

### Capitalization and hyphenated words

When a hyphenated word begins a sentence or heading, capitalize only its first element, unless a later element is a proper noun or proper adjective.

### Capitalization in lists

Use sentence case for items in all types of lists. See [Capitalization and end punctuation](https://developers.google.com/style/lists#capitalization-and-end-punctuation).

### Capitalization for tables in text

Use sentence case for all table elements: contents, headings, labels, and captions.

### Special capitalization style names

Don't describe a casing style by a name such as _camel case_ or _snake case_. Those names don't localize well and aren't standardized. Instead, state the requirements and give an example.

- Recommended: Enter the value for the `attribute` field in the format where there are no spaces between words and the first letter of each word is capitalized—for example, `AssertionAccount`.

## Contractions

Source: https://developers.google.com/style/contractions

Documentation is written in an [informal tone](https://developers.google.com/style/tone), so use common two-word contractions such as _you're_, _don't_, and _there's_.

### Negation contractions

Prefer negation contractions such as _isn't_, _don't_, and _can't_. A scanning reader can easily miss the word _not_, but it's harder to misread _don't_ as _do_.

To emphasize the negative, you can use formatting such as `is <em>not</em>`, which renders as "is _not_." In most cases, no emphasis is needed.

### Contractions to avoid

Don't make up nonstandard contractions such as _guides're_ or _browser's_ (where _'s_ means _is_).

Don't use three-word contractions such as _mightn't've_.

## Pluralization

Source: https://developers.google.com/style/pluralization

Follow standard US English pluralization and use the regular plural form in most cases. Avoid _'s_ to form a plural, which can be confused with a possessive or contraction. See [Contractions](https://developers.google.com/style/contractions) and [Possessives](https://developers.google.com/style/possessives).

### Singular and plural

For sentences with long or complex subjects, make the verb agree with the subject.

- Recommended: Confirm that the number of entries listed in the directory is accurate.
- Recommended: The workloads with the `app: backend` label represent the traffic source.
- Not recommended: The efficiency of algorithms that process data sets depend on memory allocation.

For subjects joined by _and_ or _or_, choose plural or singular appropriately.

- Recommended: The request payload and header information are logged for debugging.
- Recommended: Either the API keys or service account wasn't authenticated.
- Not recommended: User authentication and authorization is processed and handled by the security module.

Use a plural after _one or more_, not a singular. Because _one or more_ can express the possibility of one or more outcomes, rewording sometimes helps clarity.

- Recommended: If one or more tests fail, a system warning is triggered.
- Recommended: If any one test fails, a system warning is triggered.

See also [Plurals in parentheses](https://developers.google.com/style/pluralization#plurals-in-parentheses).

Use a singular after _more than one_, not a plural.

- Recommended: You can create more than one instance at a time.

### Plural abbreviations

Treat acronyms, initialisms, and other abbreviations as regular words when making them plural. Avoid _'s_, which blurs plural and possessive. See [Possessives](https://developers.google.com/style/possessives).

- Recommended: APIs, SKEs, and IDEs
- Not recommended: API's, SKE's, and IDE's

If the abbreviation ends in _s_, _sh_, _ch_, or _x_, add _es_: _OSes_, _DISHes_, _DCCHes_, _BMXes_.

**Note:** Forming a plural with _'s_ can be ambiguous or confusing and might cause issues in translation. See [Write for a global audience](https://developers.google.com/style/translation).

When spelling out a term, make the spelled-out term and the abbreviation agree in number.

- Recommended: virtual machines (VMs)
- Not recommended: virtual machines (VM)

With numbers and units of measure, use the singular spelled-out unit when the number is one. Use the plural for all other numbers, including zero, decimals, and numbers greater than one.

- Recommended: 0 degrees
- Recommended: 0.5 degrees
- Recommended: 1 degree
- Recommended: 15 degrees

Don't pluralize an abbreviation used as a unit with a number.

- Recommended: 64 GB
- Not recommended: 64 GBs

**Note:** It can sometimes help to spell out _-bit_ or _-byte_ terms, but in general a unit paired with a specific number needn't be spelled out.

Include a space, preferably a nonbreaking space, between the number and the abbreviation. See [Spaces in units of measurement](https://developers.google.com/style/units-of-measure#spaces-in-units-of-measurement) and [Abbreviations](https://developers.google.com/style/abbreviations).

### Plural product and feature names

Don't form a plural or possessive of the trademark of a product, feature, or company name. See [Use trademarks only as modifiers](https://developers.google.com/style/trademarks#use-trademarks-only-as-modifiers) and [Product, feature, and company names](https://developers.google.com/style/possessives#product,-feature,-and-company-names).

Use singular class names. Don't manually pluralize a class name, which might cause translation issues. Instead, add a plural noun after the class name.

- Recommended: `Intent` objects and `Activity` instances
- Not recommended: `Intent`s and `Activity`s
- Not recommended: `Intents` and `Activities`

See [API reference code comments](https://developers.google.com/style/api-reference-comments).

### Plurals in parentheses

Don't put optional plurals in parentheses. Use either a plural or singular construction, consistently throughout your documentation, choosing what fits your documentation and audience. If it's important to indicate both, use _one or more_.

| Recommended | Not recommended |
| ---- | ---- |
| To find your API key, visit the **Credentials** page. | To find your API key(s), visit the **Credentials** page. |
| The value of the parent depends on the values of its children. | The value of the parent depends on the value(s) of its child(ren). |
| You can use a physical linecard, which can contain one or more ports. | You can use a physical linecard, which can contain port(s). |

### Plural pronouns

For plural pronouns like _we_, _you_, and _they_, see [Pronouns](https://developers.google.com/style/pronouns) and [Second person and first person](https://developers.google.com/style/person).

## Possessives

Source: https://developers.google.com/style/possessives

For singular nouns, including those ending in _s_, add _'s_.

- Recommended: Modify each vector's record.
- Recommended: Raise the storage class's quota.

For plural nouns ending in _s_, add only an apostrophe.

- Recommended: Extend the models' capabilities.
- Not recommended: Extend the models's capabilities.

For plural nouns not ending in _s_, add _'s_.

If a possessive seems awkward, rewrite the sentence to omit it.

- Recommended: Analyze the business data.
- Not recommended: Analyze the businesses' data.
- Recommended: The rule that the Federal Trade Commission (FTC) issued.
- Not recommended: The Federal Trade Commission's (FTC's) rule.

Avoid _'s_ to form a plural. See [Pluralization](https://developers.google.com/style/pluralization).

### Product, feature, and company names

When describing function or performance, don't form a possessive from a feature name, product name, or trademark, regardless of owner. Use the name as a modifier, or rewrite with a word like _of_.

- Recommended: You can use this template to monitor Google Search performance.
- Recommended: You can use this template to monitor the performance of Google Search.
- Not recommended: You can use this template to monitor Google Search's performance.

To form the possessive of a company name, add _'s_. Don't form the possessive of a company name used as a trademark.

- Recommended: Google's new office is nearby.
- Not recommended: The capabilities of Google's Search are vast.

For using trademarks as adjectives, not nouns, see [Trademarks](https://developers.google.com/style/trademarks#use-trademarks-as-adjectives).

### Code items

Don't form the possessive of a code item. Form the possessive from the noun that follows the code item, or rewrite to avoid the possessive.

- Recommended: Compare the number to the `wordCount` method's return value.
- Recommended: Compare the number to the value returned by the `wordCount` method.
- Not recommended: Compare the number to `wordCount`'s return value.

See [Grammatical treatment of code elements](https://developers.google.com/style/code-in-text#grammatical-treatment-of-code-elements).

## Prepositions

Source: https://developers.google.com/style/prepositions

There's no rule against ending a sentence with a preposition. Place the preposition where it makes the most sense and makes the sentence easiest to read, even at the end.

- Recommended: For details, see the client library documentation for the language you're interacting with.
- Not recommended: For details, see the client library documentation for the language with which you're interacting.

Include prepositions that add clarity, omit unnecessary ones, and don't clutter a sentence with too many.

- Recommended: The icon for the connector manager turns green within a few minutes, and the connector instance is displayed shortly after.

For which preposition to use with UI elements, see [UI elements and interaction](https://developers.google.com/style/ui-elements#prepositions).

## Pronouns

Source: https://developers.google.com/style/pronouns

Ensure that a pronoun clearly refers to its antecedent (the noun it replaces).

### Ambiguous pronoun references

Avoid vague or confusing references between a pronoun and its antecedent.

- Recommended: If you type text in the field, the text doesn't change.
- Not recommended: If you type text in the field, it doesn't change.
- Recommended: The name of the function to execute in the given script. The name does not include parentheses or parameters.
- Not recommended: The name of the function to execute in the given script. It does not include parentheses or parameters.

In many cases, follow a demonstrative pronoun (_this_, _these_) with a noun.

- Recommended: Set this value to true.
- Not recommended: Set this to true.
- Recommended: These approaches are your best options.
- Not recommended: These are your best options.

### Gender-neutral pronouns

Don't use gender-specific pronouns unless the person referred to is actually that gender.

Don't use _he_, _him_, _his_, _she_, or _her_ as gender-neutral pronouns, and don't use _he/she_, _(s)he_, or similar punctuational approaches. Use the singular _they_.

Singular _they_ has a long history: [Jane Austen used it](http://www.pemberley.com/janeinfo/austheir.html), and in 2015 the Washington Post [adopted it as official style](https://www.washingtonpost.com/opinions/the-post-drops-the-mike--and-the-hyphen-in-e-mail/2015/12/04/ccd6e33a-98fa-11e5-8917-653b65c809eb_story.html).

For more suggestions, see The Chicago Manual of Style, 16th edition, section 5.225, "Nine techniques for achieving gender neutrality."

### Optional pronouns

To avoid ambiguity, use optional pronouns such as _that_ and _which_.

| Recommended | Not recommended |
| ---- | ---- |
| Right-click the link that you want to open. | Right-click the link you want to open. |
| You can use other option parameters, which are described in the following section. | You can use other option parameters, described in the following section. |

See [Relative pronouns](https://developers.google.com/style/pronouns#relative-pronouns).

### Personal pronouns

Avoid first-person pronouns (_I_, _we_, _us_, _our_, _ours_) except in:

- The questions in FAQs.
- A document whose author comments in the first person.
- _We_ referring to your organization, after using the organization's name. For example: "Example Pet Store recommends that you feed your aardvark Standardized Aardvark Treats. We cannot guarantee the happiness of your aardvark otherwise."

Use the second person (_you_) whenever possible. See [Second person and first person](https://developers.google.com/style/person).

### Relative pronouns

This section covers three relative pronouns: _that_, _which_, and _who_.

_That_ and _which_ don't mean the same thing, so don't substitute one for the other:

- _That_ introduces a restrictive clause and isn't preceded by a comma.
  - Recommended: The echidna that has a long snout is furry.
  - This describes a particular echidna, the one with a long snout.
- _Which_ introduces a nonrestrictive clause and is preceded by a comma.
  - Recommended: The echidna, which has a long snout, is furry.
  - This describes all echidnas, and mentions in passing that they all have long snouts.

For more on restrictive and nonrestrictive clauses, read [what Grammar Girl has to say on the subject](https://www.quickanddirtytips.com/articles/which-versus-that/).

When referring to a person, you can use _who_ instead of _that_. If unsure which pronoun fits, it's generally OK to use _that_.

_Whose_ is the possessive of both _who_ and _which_, and can refer to people, animals, and things.

- Recommended: Examine the variables whose values are set at compile time.

## Verb forms in reference documentation

Source: https://developers.google.com/style/reference-verbs

In reference documentation for a method, phrase the main description in terms of what the method does (_gets_, _lists_, _creates_, _searches_), not what the developer uses it to do (_get_, _list_, _create_, _search_).

The distinction shows mostly in whether the initial verb ends in _-s_.

- Recommended: tasks.insert: Creates a new task on the specified task list.
- Not recommended: tasks.insert: Create a new task on the specified task list.

For more examples, see the [Google Cloud API design guide](https://cloud.google.com/apis/design/documentation#method_description).

# Punctuation

These rules are distilled from the Google developer documentation style guide.
Source pages are linked per section; content adapted under CC BY 4.0.

## Colons

Source: https://developers.google.com/style/colons

A colon indicates that closely related information follows. For colons with run-in headings, see [Description lists that use run-in headings](https://developers.google.com/style/lists#description-lists-that-use-run-in-headings).

### Introductory phrase preceding colon

When a colon introduces a list, the text before the colon must be able to stand alone as a complete sentence.

- Recommended: The fields are defined as follows:
- Not recommended: The fields are:

### Colons within sentences

In general, lowercase the first word after a colon. For exceptions, see [Capitalization and colons](https://developers.google.com/style/capitalization#capitalization-and-colons).

- Recommended: Tone: concise, conversational, friendly, respectful
- Recommended: When you add or update content to an existing project, remember to take these steps: review the style guide, use checklists, enlist a fellow writer or an editor to copyedit your work, and request a developmental edit if you feel that it's warranted.

### See also

For punctuating introductory material, see [list introductions](https://developers.google.com/style/lists#intros) and [code-sample introductions](https://developers.google.com/style/code-samples#intros). For when colons are better than dashes, see [Dashes](https://developers.google.com/style/dashes#colons).

## Commas

Source: https://developers.google.com/style/commas

Use commas to separate items in a series and to separate certain kinds of clauses.

### Serial commas

In a series of three or more items, put a comma before the final _and_ or _or_ (the serial or Oxford comma) to avoid changing the meaning of the sentence.

- Recommended: Locations are divided into zones, regions, and multi-regions.
- Not recommended: Locations are divided into zones, regions and multi-regions.

### Commas after introductory words and phrases

In general, place a comma after an introductory word or phrase.

- Recommended: Finally, only groups that contain parameters appear in this list.
- Recommended: Based on the requirements of your game, you can implement this method to update game information.

### Commas separating two independent clauses

When a coordinating conjunction (_and_, _but_, _or_, _nor_, _for_, _so_, or _yet_) separates two independent clauses, put a comma after the first clause, before the conjunction, unless both clauses are very short.

- Recommended: The libraries make feed creation easier, and they ensure that only valid feeds are produced.
- Not recommended: The libraries make feed creation easier and they ensure that only valid feeds are produced.
- Recommended: Type your ID and click **OK**.
- Not recommended: Type your ID, and click **OK**.

### Commas separating independent from dependent clauses

When a coordinating conjunction separates an independent clause from a dependent clause, insert a comma _only if_ the sentence could be misunderstood without one.

- Recommended: Direct-access flags are plain variables and can be read directly.
- Not recommended: Direct-access flags are plain variables, and can be read directly.
- Recommended: The manager acknowledged the last team member who entered the room, and started the meeting.
- Not recommended: The manager acknowledged the last team member who entered the room and started the meeting.

### Set off other kinds of clauses

Setting off certain clauses with a comma or other punctuation often improves clarity:

- In general, put a comma before _which_ at the start of a nonrestrictive clause. See [relative pronouns](https://developers.google.com/style/pronouns#relative-pronouns) and Grammar Girl's page on [_which_ versus _that_](https://www.quickanddirtytips.com/articles/which-versus-that/).
- In general, put a semicolon, a period, or a dash before a conjunctive adverb such as _otherwise_, _however_, or _therefore_, and put a comma after it.

Don't use a comma before the causal conjunction _because_ unless it starts a nonrestrictive clause. See the _Chicago Manual of Style_ Q&A on [using commas with _because_](https://www.chicagomanualofstyle.org/qanda/data/faq/topics/Commas/faq0018.html).

| Recommended | Not recommended |
| ---- | ---- |
| Name of the group, which has a maximum length of 200 characters. | Name of the group which has a maximum length of 200 characters. |
| The variable must have a value; otherwise, the server returns an error. | The variable must have a value otherwise the server returns an error. |
| You can use the same key name in multiple backend services and backend buckets, because each set of keys is independent of the others. | You can use the same key name in multiple backend services and backend buckets because each set of keys is independent of the others. |

### Punctuate numbers

See [Commas and decimal points in numbers](https://developers.google.com/style/numbers#commas-and-decimal-points-in-numbers).

### Punctuate examples

See [Format examples](https://developers.google.com/style/format-examples).

## Dashes

Source: https://developers.google.com/style/dashes

This page covers em dashes. For hyphens, see [Hyphens](https://developers.google.com/style/hyphens), [Ranges of numbers](https://developers.google.com/style/numbers#ranges-of-numbers), and [Ranges of numbers with units](https://developers.google.com/style/units-of-measure#ranges).

### Em dashes

To indicate a break in the flow of a sentence—or an interruption—use an em dash (long dash). Don't put a space before or after it.

Ways to type the em dash character:

- **HTML**: `&mdash;`
- **macOS**: Press Option+Shift+hyphen.
- **Linux desktop environment**: Enable the Compose key (instructions vary by Linux flavor; for examples, see [Linux Keyboard Shortcuts For Text Symbols](http://fsymbols.com/keyboard/linux/compose/)), then type the Compose key followed by three hyphens. Alternatively, press Control+Shift+U, release, type 2014, and press Return.
- **Windows**: Turn num lock on, hold down the left Alt key, and type 0151 on the numeric keypad.

**Note**: The Linux options don't work if you're signed in to the Linux command line from a remote system using `ssh` or the like; you have to be in a Linux desktop environment.

Don't use an en dash (the shorter dash) or a hyphen in place of an em dash. A spaced en dash in place of an em dash is becoming more common, but as of early 2016 it's still not widespread in US professional publishing and is mostly used in Canada and a few other places. For now, only use the em dash.

### En dashes

Don't use. Instead, use a hyphen or the word _to_. See [Ranges of numbers with units](https://developers.google.com/style/units-of-measure#ranges) and [Range of numbers](https://developers.google.com/style/hyphens#number-range).

### Colons instead of dashes in description lists

Using a spaced em dash, en dash, or hyphen to separate an item from its description is common but nonstandard. Instead, use [a colon or a period](https://developers.google.com/style/lists#description-lists-that-use-run-in-headings). For a series of items, use [an HTML description list](https://developers.google.com/style/lists#description-lists) (`<dl>`).

- Recommended: Example: This is an example.
- Not recommended: Example - This is an example.
- Recommended: Appendix A: My first appendix
- Not recommended: Appendix A—My first appendix
- Recommended:

  ```html
  <dl>
    <dt>Example</dt>
    <dd>This is an example.</dd>
    <dt>Another example</dt>
    <dd>This is another example.</dd>
  </dl>
  ```

## Ellipses

Source: https://developers.google.com/style/ellipses

In general, don't use ellipses. An ellipsis is three contiguous periods. It indicates the omission of part of a sentence, paragraph, or larger block of text where the omission isn't pertinent to understanding the subject.

### Ellipses as suspension points

Ellipses used to indicate hesitation are called _suspension points_. Don't use ellipses this way.

- Not recommended: The answer is ... wait for it ... that you shouldn't do this.

### Ellipses in a user interface

When ellipses appear in a UI, exclude them from the documentation unless omitting them could cause confusion. For example, if a button reads **Save ...**, document it as _click **Save**_.

### Ellipses in text

Don't use ellipses in written documentation; omit unnecessary information and include all necessary information.

Ellipses are acceptable in quoted text to replace a portion of the quotation, but not at the beginning or end of the text.

- Not recommended: My high school English teacher made me learn that Shakespeare quote about all the world being a stage and " ... all the men and women merely players."
- Not recommended: My high school English teacher made me learn that Shakespeare quote: "All the world's a stage, And all the men and women merely players ...."

The second example ends with four ellipsis points; the final one is a period. When the omitted material contains one or more sentence boundaries, use four dots instead of three.

- Recommended: My high school English teacher made me learn that Shakespeare quote: "All the world's a stage, .... And one man in his time plays many parts."

### Punctuation and spacing of ellipses

Keep all three ellipsis points together. Use three periods in a row rather than the ellipsis character. Insert one space before and after the ellipsis, unless a punctuation mark immediately follows it; in that case, don't insert a space after the ellipsis.

- Recommended: You don't need to understand all the other Python code in there ... we'll explain it all in class.
- Also recommended: You don't need to understand all the other Python code in there ...; we'll explain it all in class.
- Not recommended: You don't need to understand all the other Python code in there...we'll explain it all in class.

## Hyphens

Source: https://developers.google.com/style/hyphens

Use a hyphen (-) when needed for clarity. A hyphen can separate parts of words to avoid misreadings, and it can combine terms that should be read as a unit.

### General guidelines

Hyphenation depends on the following circumstances:

- **Location**. Does the term precede a noun, or follow a verb?
- **Interpretation and readability**. Is the sentence ambiguous or unclear without the hyphen?
- **Convention**. Some terms are always or never hyphenated, even if that seems to contradict other guidance.

There are many exceptions. If you're unsure whether to hyphenate a term, check the following sources, in this order:

1. The documentation you're working with. Follow any established convention in that documentation set.
2. The [word list](https://developers.google.com/style/word-list) in this style guide.
3. The [Merriam-Webster dictionary](https://www.merriam-webster.com/).

Deviate from this guidance when it serves your readers. See [Break the rules](https://developers.google.com/style#rules).

**Note**: Don't use a hyphen (-) or a double hyphen (--) in place of a dash (—). The dash is a distinct punctuation mark with different uses. See [Dashes](https://developers.google.com/style/dashes).

### Prefixes

In general, don't use a hyphen between a prefix and the main noun.

- Recommended: _infrastructure_, _megabyte_, _metadata_, _preprocessing_, _pseudocode_, _semiconductor_

#### Exceptions

Add a hyphen after a prefix in these circumstances:

- The prefix is _self_ or _cross_: _self-managing_, _cross-region_
- The noun is capitalized or is a number: _non-Google_, _post-2000_
- To avoid confusion or difficulty in reading: _de-energize_, _intra-index_, _re-mark_, _re-sign_
- The prefix attaches to a term that already has hyphens or spaces: _un-Google-like_, _non-twentieth-century_
- To be consistent within a document: _pre-processing_, _post-processing_

#### The _non_ prefix

The _non_ prefix follows the same guidelines, but because it easily forms words that are hard to parse, it's often hyphenated. Use your best judgment and keep your documentation consistent. These contrasting usages serve as examples:

- Recommended: _noncurrent_, _nonempty_, _noninteractive_, _nonpublic_
- Recommended: _non-existence_, _non-integer_, _non-key_, _non-managed_, _non-negative_

When _non_ prefixes a hyphenated compound word, add a hyphen before it.

- Recommended: _non-KSA-based_, _non-self-sustaining_

### Compounds

A _compound_ combines more than one word. Compounds can be _closed_ (one word, no spaces), _open_ (spaces between words), or hyphenated.

#### Compound nouns

In general, write compound nouns in closed (one-word, unhyphenated) form. If [Merriam-Webster.com](https://www.merriam-webster.com/) uses the two-word or hyphenated form but the closed form is the predominant convention in your context, or trending that way (as compounds often do), use the closed form.

- Recommended: webpage
- Recommended: hostname
- Recommended: tradeoff
- Recommended: workaround

Exceptions: The [word list](https://developers.google.com/style/word-list) includes exceptions for well-established terms that commonly use a hyphen or a space, such as _multi-region_ and _style sheet_. In some cases, noun, verb, and adjective versions of a word are treated differently.

When the components of a unit of measurement are multiplied by each other, hyphenate them.

- Recommended: 5 vCPU-hours
- Recommended: 40 person-hours

#### Compound modifiers before a noun

If needed for clarity, hyphenate compound modifiers that come before a noun. This guideline is subjective, but except as noted in this section, it's almost never wrong to hyphenate a compound before a noun to ensure clarity.

- Recommended: A well-designed app
- Recommended: Android-specific techniques

Use a hyphen after _more_ or _most_ if you need to clarify what those words modify.

- Recommended: The most common scenario
- Recommended: Edge locations with more-reliable internet links

In general, avoid compound modifiers of more than two words; move some words after the noun instead. If you must use one, hyphenate between each word as needed for clarity.

- Recommended: test cases that are specific to the 2023 edition
- Recommended: cross-data-center replication
- Not recommended: edition-2023-specific test cases

Numbers and units of measurement: Hyphenate a number and a spelled-out unit of measurement when they combine to modify a noun.

- Recommended: a 64-bit system
- Recommended: 100,000-byte files
- Recommended: a five-minute wait

Don't hyphenate if the unit is abbreviated, unless the hyphen is needed for clarity. Instead, use a nonbreaking space (`&nbsp;`) between the number and the unit. See [Units of measurement](https://developers.google.com/style/units-of-measure).

- Recommended: `200&nbsp;GB disk` (200 GB disk)
- Recommended: `50&nbsp;Mbps connection` (50 Mbps connection)

Exceptions: Don't hyphenate adverbs that end in _-ly_ except when needed for clarity.

- Recommended: Publicly available implementations
- Not recommended: Publicly-available implementations

Don't hyphenate compounds that are conventionally not hyphenated. Follow the [word list](https://developers.google.com/style/word-list) or the convention in the documentation you're working with.

- Recommended: A managed instance group (MIG)
- Recommended: A machine learning model

#### Compound terms after a verb

In general, a compound that follows a verb doesn't need a hyphen.

- Recommended: The app is well designed.
- Recommended: The logs are written in real time.
- Recommended: The product supports high availability.
- Recommended: The app uses techniques that are Android specific.
- Recommended: Customers can use the utility as is.
- Recommended: Get profile information for the currently authorized user.

Exceptions: Some compound terms are always hyphenated, even after a verb. Check the [word list](https://developers.google.com/style/word-list), then the [Merriam-Webster dictionary](https://www.merriam-webster.com/), and follow the convention in the documentation you're working with.

- Recommended: You can deploy the app on-premises.
- Recommended: The docs describe how to create an add-on.
- Recommended: The utility works with apps that are cloud-based and cloud-adjacent.
- Recommended: This page is customer-facing.
- Recommended: The app is designed to be user-friendly.
- Recommended: The goal is to produce an experience that's game-like.

### Range of numbers

Use a hyphen, not an en dash (`&ndash;`), to indicate a range of numbers. If a hyphen introduces ambiguity, use words such as _from_, _to_, and _through_. Don't mix hyphens with words. For ranges that include units, see [Ranges of numbers with units](https://developers.google.com/style/units-of-measure#ranges).

- Recommended: 8-20 files
- Recommended: 5-10 minutes
- Recommended: from 8 to 20 files
- Not recommended: from 8-20 files

### Spaces around hyphens

Never put a space on either side of a hyphen, except with a suspended hyphen, where you can leave a space after (but not before) the hyphen.

### Suspended hyphens

When two or more compound modifiers share a common base, keep the hyphens but omit the base for all except the last modifier. In these examples, the base is _hour_.

- Recommended: You can set up the system to scan for new files at one- or two-hour intervals.
- Recommended: You can set up the system to scan for new files at one-, two-, or three-hour intervals.

## Parentheses

Source: https://developers.google.com/style/parentheses

Some readers ignore anything in parentheses, so don't put important information in parentheses if you can help it.

Even for less important information, consider whether parentheses are necessary. Often the sentence works just as well if you set off the phrase with commas, dashes, semicolons, or periods instead.

If you need parentheses in the middle of a sentence, keep the parenthetical thought short. Otherwise, consider using two sentences.

**Note**: If a full standalone sentence appears inside parentheses, the period also goes inside the parentheses, not outside.

- Recommended: Enter a name for the instance—for example, `my-instance-99`.
- Recommended: Enter a six-digit hex number (for example, `228B22`), and then click **OK**.
- Recommended: Enter a six-digit hex number, and then click **OK**. For example, if you want the color forest green, enter `228B22`.
- Not recommended: Enter a name for the instance (for example, `my-instance-99`).
- Not recommended: Enter a six-digit hex number (for example, if you want the color forest green, enter `228B22`), and then click **OK**.

Don't use parentheses to indicate optional plurals. See [Plurals in parentheses](https://developers.google.com/style/pluralization#plurals-in-parentheses).

## Periods and other end punctuation

Source: https://developers.google.com/style/periods

End a complete sentence with a period, unless it's a question. There are exceptions for lists.

### Periods with lists

Whether a list item ends with a period depends on several factors, including the kind of list. See [Capitalization and end punctuation](https://developers.google.com/style/lists#capitalization-and-end-punctuation) on the "Lists" page.

### Periods with URLs

When a period immediately follows a URL or file path, it can be hard to tell whether the period is part of the URL. To make clear that it isn't, try one of these techniques:

- Whenever possible, avoid putting [URLs in text](https://developers.google.com/style/cross-references#urls).
- Rewrite the sentence so the URL isn't at the end.
- Put the URL on a separate line from the text, omitting the final period.

If the URL is a link, it generally looks different from surrounding text (for example, blue in most browsers), which helps distinguish it from the period.

- Recommended: We use your feedback to improve the Animals API, in accordance with Example Pet Store's Privacy Policy: (URL on its own line) http://www.examplepetstore.com/privacy/
- Not recommended: We use your feedback to improve the Animals API, in accordance with Example Pet Store's Privacy Policy at http://www.examplepetstore.com/privacy/.

When you do put a period after a URL, don't leave any space between the last character of the URL and the period.

### Periods with quotation marks

When a sentence ends with material inside quotation marks, put the period inside the quotation marks even if it isn't part of the quoted material. Exception: quotation marks around a keyword or other literal string. See [Commas and periods with quotation marks](https://developers.google.com/style/quotation-marks#commas-and-periods-with-quotation-marks).

- Recommended: ... you might say "Fixed typo."

If the quoted material ends with a question mark or an exclamation point, don't add a period.

- Recommended: Children always ask "Why?"

### Periods with parentheses

If the last part of a sentence is inside parentheses, put the period after the closing parenthesis. If the parentheses contain a complete sentence, put the period inside the parentheses. See [Parentheses](https://developers.google.com/style/parentheses).

- Recommended: Your application could show a notification when a relevant file or folder has changed (even if that change occurs while your application isn't running).
- Recommended: App Engine applications are easy to create, easy to maintain, and easy to scale. (With App Engine, there are no servers for you to maintain.)

### Periods with headings

Don't end headings with periods. See [Headings](https://developers.google.com/style/headings).

### Periods with numbers

Use a period as the decimal point. (Using a comma for the decimal part of a number is the custom in some countries, but not in the US.) See [Numbers](https://developers.google.com/style/numbers).

### Periods with captions

See [Figure captions](https://developers.google.com/style/images#figure-captions).

### Periods with alt text

See [Alt text](https://developers.google.com/style/images#alt-text).

### Periods with abbreviations

Put a period after a shortened word. Don't put periods after the letters of an acronym or initialism. See [Abbreviations](https://developers.google.com/style/abbreviations).

### Spaces between sentences

Leave only one space between sentences.

### Exclamation points

In general, avoid exclamation points. They can seem unprofessional or alarming, and they translate poorly. If you need one, follow this guidance by content type:

- **Concept and reference docs.** Never use exclamation points. Maintain a neutral, objective tone.
- **Procedural topics.** Avoid exclamation points. Use periods for completion steps—for example, "The VM is created."
- **Blog posts.** Exclamation points are acceptable to convey enthusiasm but shouldn't appear in every paragraph.

When exclamation points are acceptable:

- **Code examples.** When required by syntax—for example, the `!=` operator.
- **System literals.** When the exclamation point is part of a specific error code or log message that must be matched exactly.
- **Tutorials and learning modules.** Sparingly, to mark major milestones—for example, "Congratulations! You've completed the setup."

**Note**: Be conservative with exclamation points in global documentation. In some languages, such as Japanese or Korean, they can come across as overly emphatic or even shouting, which can alienate the reader.

## Quotation marks

Source: https://developers.google.com/style/quotation-marks

Use straight double quotation marks and apostrophes.

### When to use quotation marks

In technical writing, quotation marks are rarely used aside from instances of code.

Generally, use quotation marks for titles of shorter works such as articles or episodes in a web series, unless they're part of a link. See [cross-references](https://developers.google.com/style/cross-references). For most full-length works, use italics.

| Guidance | Example |
| ---- | ---- |
| Referring to a section of a larger document or piece, if you can't link to the section directly. | The technique is described in the section "Deploying containers" of the [Containers overview](https://www.youtube.com) video. |
| Referring to the title of a parent document when you're already linking to a section. | The [machine learning (ML) workflow section](https://cloud.google.com/vertex-ai/docs/start/introduction-unified-platform#ml-workflow) of "Introduction to Vertex AI" describes the machine learning workflow for Vertex AI. |
| Directly citing a person or quoting a slogan or motto. | Martin Fowler has said, "We are still learning the techniques to write software effectively." |
| Using a term metaphorically, but only if it's not an established usage in the domain. | This configuration forms an "island" within the network that is not connected to the external network. |

See also [Text-formatting summary](https://developers.google.com/style/text-formatting).

### Commas and periods with quotation marks

Commas and periods go inside quotation marks.

- Recommended: See the section titled "Care and feeding of the emu."
- Not recommended: See the section titled "Care and feeding of the emu".

**Exception**: When you put a keyword or other literal string in quotation marks, put any other punctuation outside the quotation marks, because the quotation marks indicate an exact literal string. However, in general don't put quotation marks around an item in code font, unless the quotation marks are part of the item.

- Recommended: If you enter `escape`, the program crashes.
- Acceptable: If you enter "escape", the program crashes.
- Not recommended: If you enter "escape," the program crashes.

### Straight and curly quotation marks

Most typefaces support straight marks and curly (typographic) marks. Some tools, like Google Docs, automatically convert straight marks to curly as you type. Always use straight quotation marks and straight apostrophes in developer documentation, because:

- It makes writing easier.
  - Code _requires_ straight marks, so using them everywhere is simpler than mixing.
  - Tools that auto-convert straight marks to curly (such as word processors) often make mistakes.
  - Humans who manually type curly marks also often make mistakes.
  - Manually typing curly marks can be difficult on some platforms.
- It makes reviewing easier.
  - When proofreading, it's hard to see whether marks are straight or curly, and which direction they point.

The first example uses straight marks; the second uses curly marks.

- Recommended: The section's title is "Care and feeding of the emu."
- Not recommended: The section’s title is “Care and feeding of the emu.”

### Single quotation marks

Use single quotation marks only:

- In code examples, in languages that use single quotation marks.
- When nesting a quotation inside another quotation.

For nesting, put the primary speaker's quote in double quotation marks and the nested quote in single quotation marks.

- Recommended: She said, "I heard him shout 'Help,' and saw him floundering in the water."
- Not recommended: She said, 'I heard him shout "Help", and saw him floundering in the water'.

**Note**: For quotation marks with links, see [Quotation marks and italics](https://developers.google.com/style/cross-references#quotation-marks-italics).

## Semicolons

Source: https://developers.google.com/style/semicolons

If possible, avoid semicolons. In a few cases, a semicolon is preferred:

- When joining two closely related independent clauses where a period or a comma is less effective.
  - Recommended: You can easily test compatibility by computing the centroid; if it is on the opposite side of the planet, reverse the order of your vertices.
- Before a conjunctive adverb (like _therefore_) or a phrase (like _that is_) that joins two independent clauses.
  - Recommended: This setup places the head-tracked node below the Main Camera; therefore, only the stereo cameras are affected by the user's head motion.
  - Recommended: The URL from which a video ad loads; that is, the URL to use to fetch that video ad.
- When separating a series of long or complex items that contain their own punctuation.
  - Recommended: If you don't have time, then focus on the improvements that will have the greatest benefit: what matters most to your users; what is most important to fix; and what is easy or feasible to fix in the available time.
  - Recommended: Review your document one more time, checking for the following: present tense and active voice; typos, punctuation, and grammar; and whether you can shorten anything.

In the final example, the second item in the list is itself a list.

## Slashes

Source: https://developers.google.com/style/slashes

Avoid slashes, except in code.

### Slashes with dates

Don't use date formats that rely on slashes. See [Dates and times](https://developers.google.com/style/dates-times).

### Slashes with alternatives

Don't use slashes to separate alternatives.

- Recommended: For example, a disaster relief map is not subject to the usage limits even if it has been developed and is hosted by a commercial entity.
- Recommended: For example, a disaster relief map is not subject to the usage limits even if it has been developed or is hosted by a commercial entity.
- Not recommended: For example, a disaster relief map is not subject to the usage limits even if it has been developed/hosted by a commercial entity.
- Recommended: Call this method five or six times.
- Not recommended: Call this method 5/6 times.

#### And/or

Often, _and_ implies _or_, so you don't need both words. If you must specify both, avoid _and/or_ except where space is limited, such as in tables.

- Recommended: You can view and edit your own data.
- Not recommended: You can view and/or edit your own data.
- Recommended: You can export raw events, processed events, or both.
- Not recommended: You can export raw and/or processed events.

### Slashes with file paths and URLs

Use forward slashes, as appropriate, in file paths and URLs.

**Note**: If you're documenting a Windows path, use backslashes.

- Recommended: https://developers.google.com/cardboard/

Where a very long URL extends beyond a line, add a line break immediately after a slash. Never insert an extraneous hyphen into a URL to break it across lines.

- Recommended:

  ```text
  https://developers.google.com/
  cardboard/
  ```

### Slashes with fractions

Don't use slashes with fractions; they're ambiguous. For example, 3/4 could mean three-quarters or that 4 is an alternative to 3.

- Recommended: ¾
- Recommended: 0.75
- Recommended: 75%
- Not recommended: 3/4

### Slashes with abbreviations

Don't use abbreviations that rely on slashes. Spell the words out.

- Recommended: care of, with
- Not recommended: c/o, w/

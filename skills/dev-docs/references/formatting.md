# Formatting and organization

These rules are distilled from the Google developer documentation style guide.
Source pages are linked per section; content adapted under CC BY 4.0.

## Text-formatting summary

Source: https://developers.google.com/style/text-formatting

A quick reference for the general text-formatting conventions covered elsewhere in the guide. For more information, see [Visual formatting](https://developers.google.com/style/semantic-tagging#visual-formatting).

### Bold

Use bold, `<b>` or `**`, only for [UI elements](https://developers.google.com/style/ui-elements#formatting) and [run-in headings](https://developers.google.com/style/lists#types-of-lists), including at the beginning of [notices](https://developers.google.com/style/notices).

A double underscore, `__`, also means bold in Markdown, but it's hard to distinguish in a text editor. Use the double asterisk for bold in Markdown.

### Italic

Use italics sparingly.

When discussing or introducing terms, such as when defining terms or using _words as words_, use italics, `<i>` or `_`. See [Use italics to discuss terms](https://developers.google.com/style/italics-terms) and [Format abbreviation introductions](https://developers.google.com/style/abbreviations#format-abbreviations).

When you need emphasis to indicate importance, use italics, not bold or underline. Usually your words can carry the emphasis without italics. For [semantic emphasis](https://developers.google.com/style/semantic-tagging) in HTML, use the `em` element, which renders as italics in most contexts. In Markdown, use underscores (`_`), which render as italics; you can't do semantic tagging in Markdown.

An asterisk, `*`, also means italics in Markdown, but underscores make it easier for humans to distinguish italics from bold in the Markdown file.

Italicize titles of books, movies, web series, and other full-length works, unless they're part of a link. See [Cross-references and linking](https://developers.google.com/style/cross-references).

Italicize mathematical variables, for example _x_ + _y_ = 3. Don't italicize mathematical operators such as the plus sign. See [Mathematical notation](https://developers.google.com/style/mathematical-notation#format-mathematical-notation).

Italicize version variables, for example version 1.4._x_.

### Underline

Reserve underlining for link text. See [Style link text](https://developers.google.com/style/cross-references#style-link-text).

### Code font

Use `<code>` in HTML or `` ` `` in Markdown to apply a monospace font and other styling to [code in text](https://developers.google.com/style/code-in-text), inline code, and user input.

Use code blocks, `<pre>` or ```` ``` ````, for [code samples](https://developers.google.com/style/code-samples) or other blocks of code.

Do not override or modify font styles inline.

Use code font to mark up code, such as filenames, class names, method names, HTTP status codes, console output, and placeholders. See [Some specific items to put in code font](https://developers.google.com/style/code-in-text#some-specific-items-to-put-in-code-font).

### Capitalization

Use American English style for [general capitalization](https://developers.google.com/style/capitalization).

Use sentence case in all [headings, titles, and navigation](https://developers.google.com/style/capitalization#capitalization-in-titles-and-headings).

Use all-capitals for [placeholders](https://developers.google.com/style/placeholders#placeholder-text).

### Quotation marks

Use American English style when [punctuating quotations](https://developers.google.com/style/quotation-marks).

For titles of shorter works, such as articles or episodes in a web series, put titles in quotation marks, unless they're part of a link.

### Font type, size, and color

Do not override global styles for [font type, size, or color](https://developers.google.com/style/fonts).

Use [semantic HTML](https://developers.google.com/style/semantic-tagging) or Markdown to control the style of text, for example code tags in HTML (`<code>`) or backticks in Markdown, instead of manually styling text with a monospace font.

### Other punctuation conventions

Don't use [ampersands (&)](https://developers.google.com/style/word-list#ampersand) as conjunctions or shorthand for _and_. Use _and_ instead, including in headings and navigation. **Exception**: It's OK to use _&_ when you refer to a UI element or the name of a menu that uses _&_.

Put quotation marks and end punctuation outside of link text. See [Punctuation around link text](https://developers.google.com/style/cross-references#punctuation) and [Quotation marks and italics](https://developers.google.com/style/cross-references#quotation-marks-italics).

### More resources

- [Mathematical notation](https://developers.google.com/style/mathematical-notation)

## Headings and titles

Source: https://developers.google.com/style/headings

Use sentence case for headings and titles. Use descriptive headings and titles because they help a reader navigate their browser and the page. It's easier to jump between pages and sections of a page if the headings and titles are unique.

### Heading and title text

Write document titles based on the primary purpose of the document. If a document is primarily a tutorial but has a conceptual introduction, write a task-based title. Write section headings based on the type of content in the section.

| Guidance | Recommended | Not recommended |
| --- | --- | --- |
| For a task-based heading, start with a [bare infinitive](https://wikipedia.org/wiki/Infinitive#English), also known as a _plain form_ or [base form](https://wikipedia.org/wiki/English_verbs#Base_form) verb. In English, the _imperative mood_ also uses the base form verb, so it looks the same as the bare infinitive. Task-based headings are frequently used in quickstarts, how-to documents, and tutorials. | Create an instance | Creating an instance |
| For a conceptual or non-task-based heading, use a [noun phrase](https://wikipedia.org/wiki/Noun_phrase) that doesn't start with an _-ing_ verb. Noun-phrase headings are frequently used in concept documentation. | Migration to Google Cloud | Migrating to Google Cloud |
| If a section is not required for all users or scenarios, use the _Optional:_ prefix in the heading. This prefix signals that the section applies only to a specific configuration or use case. For optional steps in a procedure, see [Optional steps](https://developers.google.com/style/procedures#optional-steps). | Optional: Customize your alias | Customize your alias (optional) |

#### Title phrasing

Use a unique level-1 heading (`h1`) for each page in a set of documents, and use a level-1 heading only once on a page.

Avoid repeating the exact page title in a heading on the page. For example, if you document how to create a virtual machine and how to start a virtual machine on the same task-based page, the page title might be _Create and start VM instances_, with section headings _Create a VM_ and _Start a VM_.

#### Mixed heading styles

It's OK to use task-based and conceptual heading styles in the same document. If a single document includes both task-based and conceptual sections, use the appropriate phrasing for each section's heading.

#### Use of -ing verb forms

When possible, avoid _-ing_ verb forms as the first word in any heading or title.

- Recommended: Transfer data sets
- Not recommended: Transferring data sets

An _-ing_ verb form is a present participle or gerund. These forms are inconsistently translated when used as the first word in a title, and they increase character count in limited spaces.

Sometimes there's no better alternative to a gerund, and it's OK to use one:

- Billing
- Pricing

It's OK to use an _-ing_ verb form later in a heading or title, such as _Introduction to BigQuery monitoring_.

#### Example headings

The following example is a task-based document that includes a conceptual heading and a task-based heading.

- Recommended:

  ```markdown
  # Log serving requests by using AI Platform Prediction

  This task-based document shows how to monitor machine learning models. The
  document title starts with a bare infinitive.

  ## ML model monitoring overview

  This section provides a conceptual overview of ML model monitoring. Its title is
  a noun phrase.

  ## Configure notebook settings

  This task-based section provides a series of steps to set variables in a
  notebook. Its title starts with a bare infinitive.
  ```

### Heading and title format

The following sections define the writing standards for capitalization, abbreviations, and technical elements in headings. In general, guidance that applies to standard text also applies to headings, for example [contractions](https://developers.google.com/style/contractions) and [articles](https://developers.google.com/style/articles).

#### Syntax and capitalization

- **Use sentence case** for all headings and titles. See [Capitalization in titles and headings](https://developers.google.com/style/capitalization#capitalization-in-titles-and-headings).
- **Keep punctuation simple**. Punctuation can be a sign that your heading is too complicated. Consider rewriting.
- **Limit abbreviations**. Only use an abbreviation in a page title or heading if it's the more commonly known version of the word. If you do, define the abbreviation in the first instance of the word in a paragraph. You can define the abbreviation in the title or heading, but consider whether the added length adds value. For SEO, use the more prominent version of a term in headings. See [Abbreviations](https://developers.google.com/style/abbreviations).

#### Formatting and code

- **Don't use numbers in headings** to indicate a sequence of sections. Rely on heading hierarchy and order to indicate sequence.
- **Avoid code items in headings**. If you must mention a code item in a heading, add a descriptive noun to the item in code font. See [Grammatical treatment of code elements](https://developers.google.com/style/code-in-text#grammatical-treatment-of-code-elements).
- **Don't put links in headings**. A link can easily be confused as a style applied to the heading.

#### Hierarchy and structure

- **Don't use heading tags to change visual formatting**. Use CSS rather than a heading level that doesn't fit the hierarchy. Don't make up your own formatting for headings.
- **Apply proper heading tags**. Use heading tags to structure content hierarchically, for example `<h1>`, `<h2>`, and `<h3>` in HTML, or `#`, `##`, and `###` in Markdown.
- **Maintain logical order**. Don't skip levels of the heading hierarchy. For example, put an `<h3>` tag only under an `<h2>` tag.

  - Recommended:

    ```markdown
    # Transfer data sets

    This document provides a high-level overview of ways to transfer your data to Google Cloud.

    ## Estimate costs
    ```

  - Not recommended:

    ```markdown
    # Transfer data sets

    This document provides a high-level overview of ways to transfer your data to Google Cloud.

    ### Estimate costs
    ```

- **Don't use empty headings**. Make sure headings are followed by content.

  - Recommended:

    ```markdown
    ## Migrate VMs to Compute Engine

    Migration is not just a single step. The following sections describe the recommended steps.

    ### Design the migration
    ```

  - Not recommended:

    ```markdown
    ## Migrate VMs to Compute Engine

    ### Design the migration
    ```

### Refer to a group of sections

If you introduce a group of related H3 or lower sections within a larger H2 section, use the phrase _the following sections_. Don't refer to the group using _this section_ or _these sections_ because those phrases are ambiguous.

- Recommended:

  ```markdown
  ## Views in the data preparation editor

  The following sections describe the views in the data preparation editor.

  ### Data view

  ...

  ### Graph view

  ...

  ### Schema view

  ...
  ```

## Paragraph structure

Source: https://developers.google.com/style/paragraph-structure

Break up paragraphs to aid scannability and avoid walls of text. Readers scan for information and read on different devices with different screen sizes. Each paragraph should address a single idea in the fewest words and fewest sentences possible.

Don't make sentences longer to limit the number of sentences in a paragraph. Use shorter sentences and paragraphs.

A paragraph longer than 5 or 6 sentences often indicates that it's trying to convey too much information. If so, break it into smaller paragraphs or remove content. However, don't break up a paragraph that contains a single idea. A one-sentence paragraph is OK, and a paragraph longer than 6 sentences can be OK as long as it's still about one idea.

### Put critical information first

As with sentences, put the most important information first in a paragraph. Don't hide the key point at the end. Readers don't read every word.

### Format paragraphs

Left-align text for readability. Don't center, full-justify, or right-align text.

Don't force line breaks (hard returns) within sentences and paragraphs. Line breaks might not work well in resized windows, across devices, or with enlarged text.

## Lists

Source: https://developers.google.com/style/lists

### List or table?

Tables and lists are both ways to present a set of similarly structured items. To decide which to use, see [List or table?](https://developers.google.com/style/tables#list-or-table)

**Note**: Don't use a list to show only one item; a single item isn't really a list. To set a single item off from surrounding text, use some other formatting.

### Types of lists

Choose one of the following list styles.

| List type | Used for | HTML elements |
| --- | --- | --- |
| Numbered list | A set of items where the sequence is significant, such as ordered steps, phases, or priorities. Nested sequential lists are labeled with lowercase letters or lowercase Roman numerals. See also [Sub-steps in numbered procedures](https://developers.google.com/style/procedures#sublists). | `ol`, `li` |
| Bulleted list | A set of items that's not a sequence, such as nonsequential options or examples. Make sure it's clear whether every item is required. | `ul`, `li` |
| Description list | A set of terms, each with a description, definition, or explanation. Use this type to draw attention to two or more terms (such as a glossary). | `dl`, `dt`, `dd` |
| Description list that uses bulleted run-in headings | A set of introductory terms or phrases, each followed by a description, definition, or explanation. Use this type to highlight and explain several concepts or to save space. For formatting and punctuation, see [Description lists that use run-in headings](#description-lists-that-use-run-in-headings). | `ul`, `li` |

Example of a numbered list:

> Here's a sequence of steps to follow:
>
> 1. Open the box.
> 2. Remove the bobcat from the box.
> 3. Feed the bobcat.

Example of a nested sequential list:

> Here's a list of things to do after breakfast, in order:
>
> 1. Go shopping.
>    1. Buy groceries:
>       - Flour
>       - Eggs
>       - Sugar
>       - Butter
>    2. Go to mall:
>       1. Buy dress.
>       2. Buy shoes.
> 2. Make cake.
> 3. Build birthday present out of spare parts.
> 4. Clean house.

Example of a bulleted list:

> Here's a list of things that can go wrong, in no particular order:
>
> - Your bicycle might explode.
> - The sun might go out.
> - An ant might break its leg and require a tiny splint.

Example of a description list:

> Here are some descriptions of types of birds:
>
> Emu
> : The best kind of bird.
>
> Crow
> : The other best kind of bird.
>
> Peacock
> : Also the best kind of bird.
>
> Phoenix
> : An even better kind of bird.

Example of a description list that uses bulleted run-in headings:

> Here are some descriptions of types of birds:
>
> - **Emu**: the best kind of bird
> - **Crow**: the other best kind of bird
> - **Peacock**: also the best kind of bird
> - **Phoenix**: an even better kind of bird

### Multiple paragraph list items

Any list item can contain more than one paragraph.

To create multiple paragraphs, use the `p` element rather than the `br` element. (The HTML specification describes which uses of the [`br` element](https://html.spec.whatwg.org/multipage/semantics.html#the-br-element) are legitimate.)

Example:

- This list item is a single paragraph.
- This list item contains multiple paragraphs.

  As you can see!

- This is another list item that's only one paragraph long.

### Introductory sentences for lists

Introduce a list with the appropriate context. In most cases, precede a list with an introductory sentence. The sentence can end with a colon or a period: usually a colon if it immediately precedes the list, usually a period if there's more material (such as a note paragraph) between the introduction and the list.

If the list needs no context beyond the heading that immediately precedes it, it's OK to omit an introductory sentence.

Introduce a list with a complete sentence, not a partial one that's completed by the list items. You can also use _the following_ as a noun phrase (see [following](https://developers.google.com/style/word-list#following)).

- Recommended: Use the **Submit** button for any of the following purposes:
  - To submit the form.
  - To indicate that you're done.
  - To allow the next person to enter their data.
- Not recommended: Use the **Submit** button to:
  - Submit the form.
  - Indicate that you're done.
  - Allow the next person to enter their data.

- Recommended: To get the USB driver, follow these steps:
  1. Click **Tools > Android > SDK Manager**.
  2. Select **Google USB Driver**, and then click **OK**.
- Not recommended: To get the USB driver:
  1. Click **Tools > Android > SDK Manager**.
  2. Select **Google USB Driver**, and then click **OK**.

- Recommended: If you need to add an instance manually, do the following:
  1. Click **Create instance**.
  2. For **Name**, enter a name.
- Not recommended: If you need to add an instance manually:
  1. Click **Create instance**.
  2. For **Name**, enter a name.

- Recommended: a heading **Objectives** followed directly by the list:
  - Create an instance
  - Snapshot an instance
  - Delete an instance
- Not recommended: a heading **Objectives**, then "In the following tutorial, you will complete the following tasks:", then the same list.

For introducing sub-steps, see [Sub-steps in numbered procedures](https://developers.google.com/style/procedures#sublists). For punctuation and capitalization, see [Capitalization and end punctuation](#capitalization-and-end-punctuation).

### Unusual list numbering

Use nonstandard numbering in the following situations:

- To present a list in reverse-numerical order, use an `ol` element with a `reversed` attribute.
- To set a value manually, use the `value` attribute. Setting a value manually can sometimes be convenient, but in most cases it isn't a good idea, because if the number of items changes later, you'll have to change the value by hand.

### Sub-steps in a numbered procedure

See [Procedures](https://developers.google.com/style/procedures#sublists).

### Parallel syntax

Use the same syntax and structure for all list items in a given list, if possible.

### Capitalization and end punctuation

Capitalization and end punctuation depend on the type of list and its contents.

#### Numbered, lettered, and bulleted lists

Start each list item with a capital letter, unless case is an important part of the information conveyed, such as in a list of glossary terms.

End each list item with a period or other appropriate sentence-ending punctuation, except in the following cases:

- If the item consists of a single word, don't add end punctuation.
- If the item doesn't include a verb, don't add end punctuation.
- If the item is entirely in code font, don't add end punctuation.
- If the item is entirely link text or a document title, don't add end punctuation.

If you end up with inconsistent punctuation, either rewrite the list to use [parallel construction](#parallel-syntax) or add end punctuation to every item for consistency.

- Recommended: The following words are adjectives:
  - Big
  - Small
  - Gratuitous
- Recommended: The SDK supports the following UI elements:
  - Text box
  - Bulleted list
  - Button
- Recommended: The API supports the following actions:
  - Create
  - Replace
  - Update
  - Delete
- Recommended: You can do any of the following by using the API:
  - Create an item.
  - Replace one item with another.
  - Update an item.
  - Delete an item.

#### Description lists

Sometimes it's useful to add an explanatory phrase to a list item, which can affect punctuation. In general, don't add an explanatory phrase to only a single list item; instead, use a description list and provide explanatory phrases for all items.

In most contexts, start each term (`dt` element) with a capital letter.

Don't end the term with a period. Do generally put a period at the end of each `dd` (description) element.

- Recommended: The following words are adjectives:

  Big
  : A short word.

  Relevant
  : A fancy word.

  Gratuitous
  : A long word.

  Purple
  : A vibrant color.

- Not recommended: The following words are adjectives:
  - Big
  - Relevant
  - Gratuitous
  - Purple—this is a color.

#### Description lists that use run-in headings

In most contexts, format run-in headings as follows:

- Start the run-in heading with a capital letter.
- End the run-in heading with a period or a colon, but be consistent within the list.
- You can decide whether to bold the punctuation that ends the heading based on factors such as on-page consistency.

For the description that follows the punctuation, capitalize the first letter as follows:

- If the text follows a period, start with a capital letter.
- If the text follows a colon, start with a lowercase letter.

To end the descriptive text, punctuate as follows:

- If the description follows a period, end it with a period.
- If the description follows a colon, do one of the following:
  - If the description is a list of items or short phrases without verbs, don't include a period.
  - If the description includes a verb or expresses a standalone thought, end it with a period.

Don't use a dash to set off a description from an item in a description list. See [Colons instead of dashes in lists](https://developers.google.com/style/dashes#colons-instead-of-dashes-in-description-lists).

- Recommended: The following words are adjectives:
  - **Big**: a short word
  - **Relevant**: a fancy word
  - **Gratuitous**: a long word
  - **Purple**: a vibrant color
- Recommended: The coffee shop has several great choices:
  - **Coffee**: latte, mocha, cappuccino, espresso, macchiato
  - **Tea**: chai tea, chai latte, black tea, green tea, herbal tea
- Recommended: Budget Airlines reduces your ticket cost in several ways:
  - **It increases fuel economy by reducing baggage weight**. By charging astronomical prices for anything larger than a wallet....
  - **It carries more passengers per flight**. By reducing leg room to industry and medical minimums, it fits more seats....

**Note**: These list punctuation guidelines differ from the [Material Design guidelines](https://material.io/guidelines/style/writing.html#writing-capitalization-punctuation). If you're writing UI text rather than prose documentation, follow the Material Design guidelines.

### Comma-separated lists

When you write a list in a paragraph, use [serial commas](https://developers.google.com/style/commas#serial-commas) to separate the items.

Avoid ending a list with _etc._ or phrases like _and so on_. Instead, introduce the list in a way that makes clear it isn't all-inclusive.

- Recommended: The service processes data like event logs, clickstream data, social network interactions, and e-commerce transactions.
- Not recommended: The service processes event logs, clickstream data, social network interactions, e-commerce transactions, etc.

See [etc.](https://developers.google.com/style/word-list#etc)

## Procedures

Source: https://developers.google.com/style/procedures

A procedure is a sequence of numbered steps for accomplishing a task. For lists of items that aren't part of a procedure, see [Lists](https://developers.google.com/style/lists).

### Introductory sentences

In most cases, introduce a procedure with an introductory sentence that provides context not in the section heading. Don't simply repeat the heading: if the heading explains what the procedure is and no more context is needed, omit the introductory statement.

The sentence can end with a colon or a period. Use a colon if it immediately precedes the procedure. Use a period if there's more material (such as a note paragraph) between the introduction and the procedure.

You can introduce a procedure with an imperative statement. Don't introduce a procedure with a partial sentence that's completed by the numbered steps.

- Recommended: To customize the buttons, follow these steps:
- Also recommended: Customize the buttons:
- Also recommended: To customize the buttons, do the following:
- Not recommended: To customize the buttons:

See [Lists](https://developers.google.com/style/lists#introductory-sentences-for-lists).

### Single-step procedures

When a procedure consists of only one step, write the step in one sentence and format it as a [bulleted list](https://developers.google.com/style/lists#numbered-lettered-bulleted-lists).

- Recommended:
  - To clear (flush) the entire log, click **Clear logcat**.
- Not recommended: "To clear (flush) the entire log, follow this step:" followed by a one-item numbered list "1. Click **Clear logcat**."
- Also not recommended: "To clear (flush) the entire log, follow this step:" followed by a one-item bulleted list "Click **Clear logcat**."

### Sub-steps in numbered procedures

In a numbered procedure, sub-steps are labeled with lowercase letters, and sub-sub-steps get lowercase Roman numerals.

When a step has sub-steps, treat the step like an [introductory sentence](#introductory-sentences): end it with a colon or a period, as appropriate.

- Recommended:
  1. To add a VM instance, do the following:
     1. Click **Create instance**.
     2. For **Name**, enter a name for the VM instance, and then do the following:
        1. For **Region**, specify where you want to deploy the VM instance.
        2. For **Machine type**, select an option.
     3. Click **Create**.
  2. To connect to the VM instance by using SSH, click **SSH**.

### Order of multiple components in a step

To document a complex procedural step, use the following order:

1. Describe the action to take.
2. List a command, if necessary.
3. Explain any placeholders used in the command. See [Formatting placeholders](https://developers.google.com/style/placeholders).
4. Explain the command in more detail, if necessary.
5. List the output of the command, if necessary. See [Output from commands](https://developers.google.com/style/code-syntax#output).
6. In a separate paragraph, explain [the result of an action](https://developers.google.com/style/procedures#steps-with-results-or-justifications), or any output, if necessary.

Example of the preceding order:

1. Plan the Terraform deployment:

   ```text
   terraform plan -out=NAME
   ```

   Replace `NAME` with the name of your Terraform plan.

   The `terraform plan` command does the following:

   1. Parses the Terraform configuration, building a list of resources to provision.
   2. Refreshes the current state of resources already provisioned in Google Cloud.
   3. Creates a plan to make the currently provisioned resources match the parsed configuration.

   The output is similar to the following:

   ```text
   Plan: 26 to add, 0 to change, 0 to destroy.
   ------------------------------------------------------------
   This plan was saved to: NAME
   ```

   The output shows what resources to add, change, or destroy.

### Multi-action procedures

In general, use one step for each action. However, you can combine small actions into one step [by using angle brackets](https://developers.google.com/style/ui-elements#term-menus) (`>`) for sequential menu selections.

- Recommended: 1. Click **Next > Finish**.
- Also recommended: 1. Click **File > New > Document**.

Don't make steps too long. If they feel too long, split them into multiple steps.

### Multiple procedures for the same task

If there's more than one way to complete a task, document one procedure that's accessible for all readers. If all methods are accessible, pick the shortest and simplest. If you need to document multiple ways, separate them in different pages, headings, or tabs.

Guidelines for choosing which procedure to document:

- Choose a procedure that lets readers do all the steps by using only a keyboard.
- Choose the shortest procedure.
- Choose a procedure that uses a programming language most of your audience is familiar with.

### Repetitive procedures

Avoid repeating procedures. Instead, reference them and link to them.

- Recommended: 1. Create a user as you did in the previous step.
- Also recommended: 1. [Create a user as you did in the previous step.](https://example.com/docs/create-user) (the whole step as a link)

### Optional steps

For an optional step, begin the step with _Optional_ followed by a colon.

- Recommended: 1. Optional: Type an arbitrary string ...
- Not recommended: 1. (Optional) Type an arbitrary string ...

For optional sections, see [Heading and title text](https://developers.google.com/style/headings#heading-and-title-text).

### Steps that say where to complete a task

Tell the reader where to complete an action, for example in a particular tool or UI field, before you state the action.

- Recommended:
  1. In Google Docs, click **File > New > Document**.
  2. In the Google Cloud console, go to the **Monitoring** page.
- Not recommended:
  1. Click **File > New > Document** in Google Docs.
  2. Go to the **Monitoring** page in the Google Cloud console.

If a set of procedures is split across multiple headings, restate in each procedure where the reader completes the action. For example, if two procedures in a document take place in the console, start both with "In the console ..."

### Steps with goals

For some steps, it's useful to state the goal the step accomplishes. State the goal before the action. This helps readers understand and complete the step more easily.

- Recommended: 1. To start a new document, click **File > New > Document**.
- Not recommended: 1. Click **File > New > Document** to start a new document.

Sometimes the preceding format can imply that a required step is optional. In such cases, use the colon format:

- Recommended: 1. Start a new document: click **File > New > Document**.

It's usually clear within a procedure whether a step is required, and then the "To ..." format is more natural than the colon format.

To decide whether you need the colon format, consider how the step's goal relates to the procedure's goal. In a procedure for creating a bar chart, a step with the goal "To create the chart" is clearly required. "To enhance the chart" is also unlikely to confuse. But "To sort the data by date" might or might not be necessary. To clarify that the step isn't optional, use "Sort the data by date:" instead.

### Steps with results or justifications

Some steps consist of an action plus a resulting reaction that helps the reader navigate to the next step. State the action first and the result second. Keep the result in the same paragraph as the action. Also consider whether you can avoid repetitiveness and overwhelming the reader with too much bolding of UI elements.

- Recommended: 1. Click **Run**. The query results appear after the query runs.
- Recommended:
  1. Click **Enter**.
  2. In the **New file** dialog that appears, click **Next**.
- Not recommended:
  1. Click **Enter**. The **New file** dialog appears.
  2. In the **New file** dialog, click **Next**.

For describing output, see [Output from commands](https://developers.google.com/style/code-syntax#output).

Other steps benefit from a justification for why the step matters. State the action first and the justification second.

- Recommended: 1. Store the private key in a secure location. You need it later.

### Summary of guidelines for writing procedures

| Guidance | Recommended | Not recommended |
| --- | --- | --- |
| Make sure the first sentence in a procedural step includes an imperative verb. | Clone the repository that contains the sample data. | You need the project ID later in this document. Retrieve the project ID. |
| Use complete sentences. | (none) | (none) |
| Use parallel structure and consistent verb form. | Download the service account key to your local machine. Click **More**, and then click **Download**. | Download the service account key to your local machine by clicking **More** and then clicking **Download** file. |
| For an optional step, type _Optional:_ as the first word of the step. | Optional: Type an arbitrary string... | (Optional) Type an arbitrary string... |
| Set the context (such as a tool or an environment) in which the reader performs a procedure. If multiple headings are associated with a set of procedures, restate the context in the first step, even if it's the same as in the previous procedure. | In Cloud Shell, connect to the development cluster. In the Google Cloud console, go to the **BigQuery** page. | (none) |
| Write in the order the reader needs to follow. State the location of the action before the action. | In Google Docs, click **File > New > Document**. In the Google Cloud console, go to the **Monitoring** page. | Click **File > New > Document** in Google Docs. Go to the **Monitoring** page in the Google Cloud console. |
| State the purpose or goal of the action before the action. | To start a new document, click **File > New > Document**. | Click **File > New > Document** to start a new document. |
| Don't use directional language such as _above_, _below_, or _right-hand side_. It doesn't work well for accessibility or localization. If a UI element is hard to find, provide a screenshot. See [Buttons and icons](https://developers.google.com/style/ui-elements#buttons). | Click (menu icon) **Menu**. In the preceding diagram,... In the following diagram,... | Click the button with three lines. In the above diagram, ... In the diagram below, ... |
| Don't use _please_. | To open a document, click **File > Open**. | To open a document, please click **File > Open**. |
| Avoid _run the following command_ to introduce code. Focus on what the command does. | In Cloud Shell, deploy the load generator:... Define a firewall rule to allow internal traffic:... | In Cloud Shell, deploy the load generator by running the following command:... Run the following command:... |
| If the reader must press **Enter** after a step, include that instruction as part of the step. | Click the search box, type `custom function`, and then press **Enter**. | 1. Click the search box and type `custom function`. 2. Press **Enter**. |
| Don't include keyboard shortcuts. | Copy the command, and then paste it... | Press Ctrl+C, and then press Ctrl+V... |
| When there's more than one way to do something, give only the best way. Alternate ways can confuse readers. | (none) | (none) |
| If your procedure includes code samples, see how to format [code samples](https://developers.google.com/style/code-samples). | (none) | (none) |
| If your procedure includes commands, see how to format [commands](https://developers.google.com/style/code-syntax#formatting-a-command). | (none) | (none) |
| Ensure the reader has the information they need to prepare for the task ahead of time. Advance information supports task management, executive functioning, memory, and emotional regulation. | The following hardware and software are required:... | (none) |
| Include as few steps as possible. Limit interruptions in the path. | (none) | (none) |
| Focus on one reader decision at a time. Make each instruction a separate list item. | (none) | (none) |

## Tables

Source: https://developers.google.com/style/tables

In many contexts, tables are the best way to represent sets of related pieces of data. In some contexts, other approaches are better.

### List or table?

Tables and lists both present sets of similarly structured items. To decide which to use, consult the following table:

| Item type | Example | How to present |
| --- | --- | --- |
| Each item is a single unit. | A list of programming language names, or a list of steps to follow. | Use a [numbered list, lettered list, or bulleted list](https://developers.google.com/style/lists#numbered-lettered-bulleted-lists). |
| Each item is a pair of pieces of related data. | A list of term/definition pairs. | Use a [description list](https://developers.google.com/style/lists#description-lists) (or, in some contexts, a table). |
| Each item is three or more pieces of related data. | A set of parameters, where each has a name, a data type, and a description. | Use a table. |

#### Places not to use tables

- Don't use tables to lay out a page; use your site's standard CSS.
- If you have only one row of material, a table usually isn't the best choice. But in some contexts (especially for layout consistency in reference documentation), it might be.
- If you have only one column, turn the table into a list.
- Don't use tables to lay out code snippets.
- Don't use tables to lay out long one-dimensional lists in multiple columns. For example, don't split a long list of function names in half and present the halves as a two-column table. Use tables only for two-dimensional data, that is, material that semantically makes sense in rows and columns.
- Avoid tables in the middle of a numbered procedure.

### Multi-paragraph table cells

Any table cell can contain more than one paragraph.

To create multiple paragraphs, use the `p` element rather than the `br` element. (The HTML specification describes which uses of the [`br` element](https://html.spec.whatwg.org/multipage/semantics.html#the-br-element) are legitimate.)

Example of a table with multi-paragraph cells:

| Attribute name | Type | Description |
| --- | --- | --- |
| `href` | HTML | Defines the URL for a link.<br><br>For example, go to the `<a href="https://www.google.com">Google Search</a>` page. |
| `src` | HTML | Defines the path of the image to be displayed.<br><br>For example, `<img src="kitten.jpg">`. |

### Introductory sentences for tables

Introduce tables with a complete sentence that describes the table's purpose, because not all screen readers preannounce tables. The sentence can end with a colon or a period: usually a colon if it immediately precedes the table, usually a period if there's more material (such as a note paragraph) between the introduction and the table.

- Recommended: Change the environment variables to values for your deployment, as listed in the following table:

See the [Tables](https://developers.google.com/style/accessibility#tables) section of the "Accessibility" page.

### Table placement

- When introducing a table, use a complete sentence and try to refer to the table's position, with a phrase like _the following table_ or _the preceding table_.
- Don't put a table in the middle of a sentence.
- Avoid footnotes when possible. If a table does refer to footnotes, place them immediately after the table. See [Footnotes](https://developers.google.com/style/footnotes).

### Table captions

If a document contains only one table, it doesn't need a caption. Place the table adjacent to the text that refers to it.

If a document contains more than one table in fairly close proximity, include a caption for each, using a [`caption` element](https://html.spec.whatwg.org/multipage/tables.html#the-caption-element) as the first child of the `table` element. Start the caption with a number, in the form "**Table NUMBER.** DESCRIPTION". Use sentence case for the caption, but don't end it with a period.

When referring to the table from text, refer to it by number, for example _... as shown in table 2_. Don't capitalize _table_ unless it starts a sentence.

Your site's CSS determines the styling and placement of the caption.

- Recommended:

  ```html
  <table>
    <caption><b>Table 1.</b> Prehistoric birds</caption>
    ...
  </table>
  ```

### Table formatting

- Don't add styling to the table element.
- Don't use a visual style such as a different font, font color, or background color to convey a header row or column by itself. Use the `th` element to semantically mark up headers.
- Don't merge cells. Don't use `colspan` or `rowspan` attributes.
- Sort rows in a logical order, or alphabetically if there's no logical order.
- If the table is long or complicated, for example with multiple header rows or columns, consider splitting it into multiple tables.
- Don't present new information through images or symbols alone; always provide a descriptive `alt` attribute. See [Alt text](https://developers.google.com/style/images#alt-text).

### Table column heads

- Use sentence case.
- Write concise headings.
- Don't end with punctuation, including a period, an ellipsis, or a colon.
- Use table headings for the first column and the first row only. Use the [`th` element](https://www.w3.org/TR/2014/REC-html5-20141028/tabular-data.html#the-th-element).
- Include the [`scope` attribute](https://www.w3.org/TR/WCAG20-TECHS/H63.html) as appropriate for accessibility.

### Responsive tables

Where possible, use table CSS that adapts to different viewport sizes.

### Link to tables

Where possible, avoid linking to tables; refer to them by table number instead.

## Notes, cautions, warnings, and other notices

Source: https://developers.google.com/style/notices

To give the reader important or useful information that isn't part of the flow of the text, you can offset it with a notice. However, there's [evidence](https://www.nngroup.com/articles/tunnel-vision-and-selective-attention/) that readers skip elements outside their focus of interest, including notices. If you're not sure whether something should be a notice, write it first in regular text and then decide.

Don't use too many notices. Multiple notices on a page lose their visual distinctiveness. See if you can convey the information another way, especially if you have two or more notices in a row.

Where possible, avoid grouping two or more notices together. If you must (for example, a _note_ with a _caution_ inside it, or several _warnings_ one after another), consider reorganizing the content.

### Pick a notice type

Commonly used notices:

**Note**
: An ordinary aside or tip. Provides information that's useful but not critical. For example, "Generating excessive amounts of traffic to external systems can resemble a denial-of-service attack." See [when to use](#when-to-use-a-note-notice-type) and [when not to use](#when-not-to-use-a-note-notice-type) a note.

**Caution**
: Tells the reader to proceed carefully. For example, "We don't recommend using a broad `0.0.0.0/0` range that would allow all traffic."

**Warning**
: Stronger than a _caution_; means "Don't do this" or that the step might be irreversible, such as leading to permanent data loss. If a reader doesn't heed the warning, they can lose money, lose work, or open themselves to a security breach. For example, "Don't put a password on the command line; doing so is a security risk."

**Success**
: Describes a successful action or an error-free status. Used only in interactive or dynamic content; don't use it in ordinary static pages. For example, "You've successfully deployed an application to GKE."

### When to use a note notice type

Create a _note_ when all of the following are true:

- The information is _relevant_ but not _necessary_ to what the reader is doing right now. If the reader skips it, they'll still succeed.
- Interrupting the reader at this point is not an obstacle. For example, the _note_ isn't suggesting an alternative that leads the reader down a different path.
- The information is not part of the flow of what you're writing. It's not just a continuation, a result, or a pointer to additional information.

### When not to use a note notice type

- Don't use _notes_ for [cross-references](https://developers.google.com/style/cross-references).
- Don't use _notes_ for prerequisites or steps the reader should have taken earlier. Such information should precede the step.
- Don't make a full procedural step into a _note_.
- Don't use _notes_ for information that's necessary for the reader to succeed.
- Don't use _notes_ for information that's in flow with the preceding text. For example, don't use a _note_ to state expected results or to describe what precedes.

### Examples

Use whatever visual presentation for notices is standard for your site.

If you're writing in HTML and your site doesn't specify what to use for notices, use HTML similar to the following:

```html
<aside class="note"><b>Note:</b> All VPC networks include firewall
rules.</aside>
```

Example notices:

- **Note**: All VPC networks include firewall rules.
- **Caution**: We don't recommend using a subnet that's part of a dynamic route.
- **Warning**: Do not manually edit or delete generated table entries.
- **Success**: You've successfully created a Compute Engine instance.

## Format examples

Source: https://developers.google.com/style/format-examples

To introduce an example in a sentence, use the following guidance. You can introduce examples with _such as_, _for example_, or _like_ in various ways.

| Guidance | Recommended | Not recommended |
| --- | --- | --- |
| Introduce a short-to-medium-length example at the end of a sentence. For clarity, set off the example with a comma, parentheses, or an em dash as appropriate. Avoid using a semicolon for this purpose. | Choose a strong encryption algorithm, such as AES-256.<br><br>You can monitor various metrics for your managed database instances—for example, CPU utilization, storage capacity, and active connections.<br><br>The API supports common image formats like PNG and JPEG. | Enter a name for the instance, for example, `my-instance-99`.<br><br>Specify the region for deployment; for example, `us-central1`.<br><br>Enter a name for the instance (for example, `my-instance-99`). |
| Introduce a short example in the middle of a sentence. Keep it relatively short and set it off with dashes, commas, or parentheses as appropriate. | Enter a six-digit hex number (for example, `228B22`), and then click **OK**.<br><br>The virtual machine (VM) requires an operating system, such as Ubuntu 22.04, to be installed.<br><br>Some elements, like buttons and input fields, have default accessibility attributes. | Enter a six-digit hex number (for example, if you want the color forest green, enter `228B22`), and then click **OK**. |
| Introduce a longer example as a separate sentence, using _for example_ as an adverb in that sentence. | You can assign tags to your virtual machine instances to categorize them. For example, you could tag instances by environment with `env:prod` or `env:dev`. | (none) |

## Footnotes

Source: https://developers.google.com/style/footnotes

A footnote is an annotation with additional information, usually provided at the end of a page, chapter, or book. Avoid footnotes because they aren't accessible and present challenges for localization.

Instead of a footnote, consider these formats:

- [Add a cross-reference](https://developers.google.com/style/cross-references).
- [Use a note](https://developers.google.com/style/notices).
- [Put it in a parenthetical](https://developers.google.com/style/parentheses).

If a footnote is the only way to convey the information, use a superscript number, for example `<sup>1</sup>`.

- Recommended: You want to add a footnote to this sentence.<sup>1</sup>

  <sup>1</sup> Put this footnote at the bottom of the page.

## Use italics to discuss terms

Source: https://developers.google.com/style/italics-terms

Two circumstances call for italicizing terms you're introducing or discussing. For HTML and Markdown formatting of italics, see [Text-formatting summary](https://developers.google.com/style/text-formatting).

### New terms

When you introduce a new term that you define immediately, italicize the first mention. Don't use bold or quotation marks.

- Recommended: A _Clos network_ is a kind of multistage circuit switching network.

### Words as words

When you refer to a word, phrase, or letter as itself (sometimes called _words as words_), use italics. Don't use bold or quotation marks.

- Recommended: Don't use _&_ (ampersand) as a conjunction. Use the word _and_ instead.
- Recommended: To form a possessive of a singular noun, add _'s_ to the end of the word.

## Diagrams, figures, and other images

Source: https://developers.google.com/style/images

Use images only when they provide useful visual explanations of information that's otherwise difficult to express in words. For screenshots, be discreet. Capture only UIs that are important to the discussion.

### Create and save images

To create a diagram, use any drawing tool. To take a screenshot, use any screen capture tool.

Don't use images of text, code samples, or terminal output. Use actual text.

For diagrams (architectural drawings, flow diagrams, and so on, as distinct from screenshots):

- Use SVG files if possible because SVGs stay sharp when zoomed.
- If you don't have an SVG, save the image as PNG unless you have a good reason to use a different format.
- Regardless of format, don't use a transparent background. It can cause issues with the Devsite lightbox widget.

For animations and videos, don't use animated GIF. Use a more resource-efficient format (such as MP4).

Be consistent within a document or doc set in which operating system you use for screenshots, for example all on macOS or all on Linux. Similarly, be consistent in how screenshots look. If screenshots include drop shadows of the main window, keep similar screenshots consistent.

Crop screenshots to show the relevant information. Don't include the full window to show a single button or menu item. Cropping helps the reader focus and helps future-proof the screenshot if other parts of the UI change.

Don't include personally identifying information (PII) in screenshots.

If a source screenshot includes PII, hide it with a solid-color overlay at 100% opacity. Don't rely on blurs, mosaic effects, or similar image-processing effects; they can be reversed to reveal the original information.

If you export an image to a format that can include separate layers (for example, PDF or TIFF), flatten the image on export.

Don't use image maps. Provide a list of text references after the image instead. Reasons to avoid image maps:

- Image maps are problematic for accessibility.
- Browser implementation varies, and image maps might not function correctly on mobile devices due to scaling.
- The technical complexity of creating and maintaining a coordinates overlay is often prohibitive.

Use descriptive filenames for image files. See [Filenames and file types](https://developers.google.com/style/filenames).

### Text associated with images

Alt text, figure captions, and figure descriptions differ. Independently of these, an introductory sentence should precede most images. The sentence can end with a colon or a period: usually a colon if it immediately precedes the image, usually a period if there's more material (such as a note paragraph) between the introduction and the image. Always introduce an image with a complete sentence. You don't need to introduce screenshots that immediately follow procedural text describing a UI.

```html
<p>The following diagram shows how you can apply bounded contexts to an existing ecommerce application:</p>
<figure id="bounded">
  <img src="https://cloud.google.com/architecture/images/microservices-architecture-refactoring-monoliths-bounded-contexts.svg"
    alt="Bounded contexts are applied to an application.">
  <figcaption><b>Figure 1.</b> Application capabilities are separated into bounded
  contexts that migrate to services.</figcaption>
</figure>
<div id="descr-1">
<p>In figure 1, the ecommerce application's capabilities are separated into
bounded contexts and migrated to services as follows:</p>
<ul>
  <li>Order management and fulfillment capabilities are bound into the
    following categories:
  <ul>
    <li>The order management capability migrates to the order service.</li>
    <li>The logistics delivery management capability migrates to the
        delivery service.</li>
    <li>The inventory capability migrates to the inventory service.</li>
  </ul>
  </li>
  <li>Accounting capabilities are bound into a single category:
  <ul>
  <li>The consumer, sellers, and third-party capabilities are bound
        together and migrate to the account service.</li>
  </ul>
  </li>
  </ul>
</div>
```

```markdown
The following diagram shows how you can apply bounded contexts to an existing ecommerce application:

![Bounded contexts are applied to an application.](https://cloud.google.com/architecture/images/microservices-architecture-refactoring-monoliths-bounded-contexts.svg)

**Figure 1.** Application capabilities are separated into bounded contexts that migrate to services.

In figure 1, the ecommerce application's capabilities are separated into bounded contexts and
migrated to services as follows:

-   Order management and fulfillment capabilities are bound into the following categories:

    -   The order management capability migrates to the order service.
    -   The logistics delivery management capability migrates to the delivery service.
    -   The inventory capability migrates to the inventory service.

-   Accounting capabilities are bound into a single category:

    -   The consumer, sellers, and third-party capabilities are bound together and migrate to the
        account service.
```

#### Alt text

_Alt text_ is a concise description of the image that replaces it when the image isn't visible, such as for people using screen readers, text-only browsers, or a low-bandwidth connection. Alt text should consider the context of the image, not just its content. `alt` attributes support [navigability](https://web.dev/labels-and-text-alternatives/#include-text-alternatives-for-images-and-objects) in screen readers, [markup validation](https://validator.w3.org/docs/help.html#validation_basics), and [search engine optimization](https://support.google.com/webmasters/answer/7451184#usealtattribute). See [alt attribute](https://wikipedia.org/wiki/Alt_attribute).

If the image is decorative (not informative) or is only a visual aid for information already expressed in text, provide empty alternative text (`alt=""`) so assistive technologies ignore it. Decorative images include:

- A screenshot of the UI showing a user how to fill out fields.
- Icons in the UI.
- Images whose purpose is to make the page more visually appealing.

With the `img` element, the `alt` attribute is required, even if its value is an empty string (`alt=""`). If you omit it, screen readers might read the filename aloud.

Per the [HTML specification](https://html.spec.whatwg.org/dev/images.html#general-guidelines), "the intent is that replacing every image with the text of its `alt` attribute does not change the meaning of the page." So if the alternative text is redundant with surrounding text or not useful to visually impaired readers, use the empty tag.

When writing alt text:

- Don't include phrases like _Image of_ or _Photo of_.
- Include punctuation. Screen readers pause at punctuation.
- Use consistent alt text for repeated instances of an image, such as controls, status indicators, or icons that appear multiple times.
- When possible, avoid all-caps. Some screen readers read capital letters individually.
- Introduce diagrams in the text, not in the alt text.
- Don't use figure captions to replace alt text.
- Use full sentences or a noun phrase.
  - Recommended: `alt="Architecture of an app that's built with Apps Script."`
  - Recommended: `alt="A card message."`
- Write short, descriptive alt text in 155 characters or less.
- If the image presents more information than fits in 155 characters, include a brief summary in the `alt` attribute and a more extensive description in the text.
- Alt text should consider the context of the image, not just its content.

#### Figure captions

_Figure captions_ are concise and comprehensive summaries of a figure or image. Captions (and figure numbers) are optional. When using the [`figcaption` element](https://html.spec.whatwg.org/multipage/semantics.html#the-figcaption-element), wrap both `figcaption` and `img` in the [`figure` element](https://html.spec.whatwg.org/multipage/semantics.html#the-figure-element) so the caption is properly associated with the image.

When writing figure captions:

- Figure numbers are optional. If you use them, use the form "**Figure NUMBER.** DESCRIPTION."
  - Recommended: **Figure 1**. Application capabilities are separated into bounded contexts that migrate to services.
  - Recommended: Application capabilities are separated into bounded contexts that migrate to services.
  - Not recommended: Bounded contexts
- Use complete sentences in figure captions.
- Always use end punctuation for captions.
- When you refer to a figure, don't use spatial descriptions such as "the image above."
  - If you used figure numbers, consistently refer to the figure by number, for example "... as shown in figure 1." Don't capitalize _figure_ in a reference, except at the start of a sentence.
  - If you can't use figure numbers, show the figure again, for accessibility and user experience.
- Don't include the figure caption in a sentence that references the figure.

#### Figure descriptions

A _figure description_ is text that explains in more detail the information a figure represents, so the information conveyed in the image is captured in text. Any new information should be conveyed through text and not introduced only in a figure or image.

When writing figure descriptions:

- Create text that conveys the same information as the figure.
- Use one when a figure caption doesn't convey the purpose or complete information of the figure.
- Use punctuation in figure descriptions.

#### Text in figures

In most cases, avoid embedding explanatory text in screenshot graphics. Text in a graphic hurts accessibility and searchability, and increases localization costs if figures are localized. If you must embed text, also provide the same information in a form people with visual disabilities can use, such as a figure description.

When you must include text in figures and images:

- Keep text brief. Avoid complete sentences and punctuation when possible.
- Don't embed figure descriptions or captions in the figure. Put them in text following the figure.
- Don't create new abbreviations to condense text.
- Use sentence case. Follow guidelines for [capitalization for titles and headings](https://developers.google.com/style/capitalization#capitalization-in-titles-and-headings_1).
- Use numbered callouts in figures to help you write a figure description, but don't use callouts for detailed annotations in the image.
- Use full trademarked product names.

#### Accessibility resources

- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/glance/)
- [General text alternative guidelines from WCAG](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=111#text-alternatives)
- [Using `alt` attributes for `img` elements](https://www.w3.org/WAI/WCAG21/Techniques/html/H37.html)
- [Providing a long description in text near the non-text content](https://www.w3.org/WAI/WCAG21/Techniques/general/G74.html)
- [Complex images](https://www.w3.org/WAI/tutorials/images/complex/)

### High-resolution images

Modern browsers can use high-resolution images if available, which makes images look better on high-resolution displays.

To provide a high-resolution image, use the `img` element's `srcset` attribute in addition to the standard `src` attribute. `srcset` accepts a comma-delimited set of image URLs, each with a size qualifier: `1x` for standard resolution, `2x` for double resolution, and so on.

A browser that supports `srcset` selects an appropriate image for the current display. A browser that doesn't falls back to `src`, so you must always include `src`.

Example providing standard and double-resolution assets:

```html
<img src="/assets/images/skateboard.png"
  srcset="/assets/images/skateboard.png 1x,
  /assets/images/skateboard_2x.png 2x"
  width="375" alt="" />
```

- The `width` attribute matches the CSS pixel size used for the page. The height is calculated from the width and the image's proportions; _don't_ state it explicitly.
- Set `src` to the standard-resolution (`1x`) image, _not_ the `2x` version. Almost everyone with a high-resolution screen has a modern browser that recognizes `srcset`; `src` is mainly used by older browsers on low-resolution devices, which should download the smaller image. Even if your original is the higher-resolution image, point `src` at the standard-resolution version so low-resolution readers aren't forced to download more than they can view.
- The double-resolution filename (here `skateboard_2x.png`) can be anything; the `2x` value after the filename tells the browser its resolution. But use the form `BASENAME_2x.EXTENSION` to make clear to humans that it's the double-resolution version of `BASENAME.EXTENSION`.
- The double-resolution image must be exactly twice the width and height of the standard image, give or take a pixel. For example, 875x500 and 438x250 is OK.
- Don't scale up an existing `1x` image to make the `2x` version. If all you have is `1x`, use it alone. If you start with a high-resolution image (`2x` or better), you can scale it down for `1x` and `2x`.
- Currently only an additional `2x` image is necessary, but screen PPI (pixels per inch) may increase, so `srcset` supports further sizes with multipliers such as `3x` or `4x`.
- A browser that supports `srcset` uses only the images in that attribute and ignores `src`. So specify all available resolutions in `srcset`.

**Note**: If you revise an image frequently, you can use the `2x` image for both `src` and `srcset` rather than maintaining multiple sizes. Once the image stabilizes, add a `1x` version.

See the HTML specification for the [`img`](https://html.spec.whatwg.org/multipage/embedded-content.html#the-img-element) element.

### Layout of images on a page

- Don't place an image manually; for example, don't use a `style` attribute or other workarounds to control left/right justification or margins. Use your site's standard CSS image styles.
- Don't make the image too small. It's fine for an image to take up the full width of a page.
- Consider how the image will look when printed.
- In general, don't use an image wider than the column it appears in. On [developer.android.com](https://d.android.com), for example, the main-body column is 856px wide, so use images no wider than that, and a 2x version no wider than 1712px.
  - Screenshots at full resolution often take too much space, so you may have to resize them.
  - If someone else created the graphics (for example, a designer), it may be trivial for them to provide images at the right size. If their images are wider than 856px, ask for 856px/1712px pairs.
- Don't link to the figure from within the same page unless the page is very long and you're linking from far away.
- Don't center the image on the page.
- Don't put an `img` element inside a `p` element.

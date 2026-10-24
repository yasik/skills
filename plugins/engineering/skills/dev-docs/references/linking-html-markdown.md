# Linking, HTML, and Markdown

These rules are distilled from the Google developer documentation style guide.
Source pages are linked per section; content adapted under CC BY 4.0.

## Cross-references and linking

Source: https://developers.google.com/style/cross-references

Cross-references generally link to nonessential information that adds to the reader's understanding. Used well, they help readers navigate; used poorly, they disrupt. These guidelines minimize disruption.

### Choose links selectively

Be selective about which links you include. Each link creates a decision for the reader, adding cognitive load, and is a chance for the reader to leave the page and lose their place. When you do link, choose the most relevant destination.

#### Provide context on the page

When possible, provide help in context rather than linking elsewhere. Consider providing information on the page instead of linking when you need to:

- Define a term.
- Briefly explain a concept.
- Provide a couple of steps.

If readers must understand another product's software or standards, link to good documentation elsewhere rather than thoroughly documenting that product's standards yourself. But if a few sentences of basic information is all readers need, provide that context and save them the trip.

#### Avoid duplicate links

Within a page, don't provide duplicate links to the same destination. Link once, where it's most useful to the reader.

A secondary link is OK when:

- You're linking to a particular section of another page.
- Your page is very long and the duplicate links are far apart.
- There are multiple entry points to the document you're linking from. For example, a page with a procedure section and a troubleshooting section might need the same link in both.

#### Provide the most relevant link

Link to the most relevant page on a site, and to the most relevant heading on a page. Avoid multiple links that do the same job.

#### Link to third-party sites

Documentation often relies on readers knowing something about third-party standards or software. Link rather than attempting to thoroughly document someone else's standards. But as with all links, when possible, provide brief information on the page instead of linking.

### Write descriptive link text

Use short, unique, descriptive phrases that provide context for the linked material.

Effective link text improves accessibility and scannability. Screen reader users often jump from link to link without reading the words in between; other readers visually scan for relevant links. Sometimes you have to rework a sentence to include a phrase that makes good link text.

#### Two options for effective link text

Use either the exact page title or a descriptive phrase.

##### Page titles as link text

Match the link text to the page title or heading you're referencing. For capitalization of titles in cross-references, see [Capitalization in references to titles and headings](https://developers.google.com/style/capitalization#capitalization-in-references-to-titles-and-headings).

- Recommended: For more information, see [Load balancing and scaling](https://cloud.google.com/compute/docs/load-balancing-and-autoscaling).

##### Descriptive phrases as link text

Use a description of the destination page, capitalized as if it's part of the sentence. Help readers quickly determine whether the link is relevant:

- Place important words at the beginning of the link text.
- Don't use the same link text in the same document for different target pages.
- Keep link text short. Don't write lengthy link text such as a sentence or short paragraph.

Examples:

- Recommended: You can use Cloud Scheduler and Cloud Functions to manage [task scheduling on Compute Engine](https://cloud.google.com/blog/products/gcp/reliable-task-scheduling-on-google-compute-engine).
- Not recommended: See [this blog post](https://www.blog.google/products/pixel/pixel-4/).

#### Avoid vague link text

Write link text that makes sense without the surrounding text. Don't use phrases such as _this document_, _this article_, or _click here_.

- Recommended: For more information, see [Make headings into link targets](https://developers.google.com/style/headings-targets).
<!-- markdownlint-disable-next-line MD059 -->
- Not recommended: Want more? [Click here!](https://developers.google.com/style/headings-targets)
- Not recommended: For more information, see [this document](https://developers.google.com/style/headings-targets).

#### Avoid URLs as link text

Don't use a URL as link text. Use the page title or a description of the page instead.

- Recommended:

  ```html
  For more information about protocols, see <a href="http://www.w3.org/Protocols/rfc2616/rfc2616.html">HTTP/1.1 RFC</a>.
  ```

- Not recommended:

  ```html
  See the HTTP/1.1 RFC at <a href="http://www.w3.org/Protocols/rfc2616/rfc2616.html">http://www.w3.org/Protocols/rfc2616/rfc2616.html</a>.
  ```

**Exception**: In some legal documents (such as some Terms of Service documents), it's OK to use URLs as link text.

#### Include abbreviations in link text

If the text includes an abbreviation in parentheses, include both the long form and the abbreviation in the link text.

- Recommended: [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine/docs)
- Not recommended: [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/docs) (GKE)

#### Link to commands

If the text includes a command or another element usually set in code font, include the description of the code element in the link text, unless doing so is awkward or redundant. For more about elements in code font, see [Code in text](https://developers.google.com/style/code-in-text).

- Recommended: To create an instance with a custom hostname, run the `gcloud instances create` command with the [`--hostname` flag](https://cloud.google.com/compute/docs/instances/custom-hostname-vm#gcloud).
- Not recommended: To create an instance with a custom hostname, run the `gcloud instances create` command with the [`--hostname`](https://cloud.google.com/compute/docs/instances/custom-hostname-vm#gcloud) flag.
- Recommended: This service supports the [`GET`](https://example.com/docs/methods), [`HEAD`](https://example.com/docs/methods), and [`OPTIONS`](https://example.com/docs/methods) methods.
- Not recommended: This service supports the [`GET` method](https://example.com/docs/methods), [`HEAD` method](https://example.com/docs/methods), and [`OPTIONS` method](https://example.com/docs/methods).

### Write link introductions ("For more information")

When you dedicate a separate sentence to a cross-reference, introduce it with consistent language: "For more information, see..." or "For more information about..., see... ."

Include the "about..." clause when the link text or surrounding context doesn't make clear why you're referring the reader to this information. See the [Clarify the purpose of a link](#clarify-the-purpose-of-a-link) section of this document.

Don't use _on_ instead of _about_.

Use _see_ to refer to links and cross-references. For more information, see [see](https://developers.google.com/style/word-list#see).

- Recommended: For more information, see [Load balancing and scaling](https://cloud.google.com/compute/docs/load-balancing-and-autoscaling).
- Recommended: For more information about task scheduling, see [Reliable task scheduling on Google Compute Engine](https://cloud.google.com/blog/products/gcp/reliable-task-scheduling-on-google-compute-engine).
- Not recommended: For more information on indexes, see [Manage indexes](https://cloud.google.com/firestore/docs/query-data/indexing).

### Clarify the purpose of a link

Make sure the surrounding context or the link text itself clearly indicates why you're referring the reader to this information. Be specific, but don't repeat the link text.

If you introduce a cross-reference with "For more information..." phrasing, add an "about..." phrase. See the [Write link introductions](#write-link-introductions-for-more-information) section of this document.

- Recommended: For more information about authentication and authorization, see [Using OAuth 2.0 to access Google APIs](https://developers.google.com/identity/protocols/OAuth2).
- Recommended: If your sample dump file is in a CSV, Avro, or Parquet file format, then [load the file to BigQuery and copy to Spanner](https://cloud.google.com/spanner/docs/load-sample-data) using reverse ETL.

### Explain unexpected link behavior

If a link goes to an unexpected destination or behaves unexpectedly, provide that context. Such situations include:

- **Links that download files and open emails.** Make that clear in the link text, and mention the file type.

  - Recommended: For more information, [download the security features PDF](https://www.example.com/security.pdf).
  - Recommended:

    ```html
    <a href="mailto:support@example.com">send email to Technical Support</a>
    ```

- **Links to sections on the same page.** Let the reader know that the link goes to a different section of the same page. Use a standard phrase to clue readers in.

  - Recommended: For more information, see the [Write descriptive link text](#write-descriptive-link-text) section of this document.

- **Links to sections on another page.** Use the same wording and formatting as a regular cross-reference.

  If the title of the section you're linking to is identical to a title on the source page, add context to the cross-reference.

  - Recommended: For more information, see [Create a table](https://cloud.google.com/bigtable/docs/managing-tables#create-table).
<!-- markdownlint-disable-next-line MD051 -->
  - Recommended: For more information, see [Install libraries](#different-page) in "Building new audiences based on existing customer lifetime value."

- **Links that open in a new tab.** See the [Open links in the current tab](#open-links-in-the-current-tab) section of this document.

- **Links that go to a different domain or server.** See the [Don't use external link icons](#dont-use-external-link-icons) section of this document.

### Open links in the current tab

Don't force links to open in a new tab or window. Let the reader decide how to open links.

In the rare situation that a link needs to open in a new tab or window, let the reader know that the link opens differently than expected.

- Recommended:

  ```html
  <a href="/style/accessibility">Accessible content</a>
  ```

- Recommended:

  ```html
  <a href="/style/accessibility" target="_blank">Accessible content (opens in a new tab)</a>
  ```

- Not recommended:

  ```html
  <a href="/style/accessibility" target="_blank">Accessible content</a>
  ```

### Don't use external link icons

Don't use an external link icon to indicate that a link goes to a different domain or server. If it's important to inform readers that they're leaving a Google domain, mention it in the text rather than relying on an icon.

- Recommended: For more information, see [OS-level virtualization](https://en.wikipedia.org/wiki/Operating-system-level_virtualization).
- Sometimes OK: For more information, see the Wikipedia page about [OS-level virtualization](https://en.wikipedia.org/wiki/Operating-system-level_virtualization).
- Not recommended: For more information, see [OS-level virtualization](https://en.wikipedia.org/wiki/Operating-system-level_virtualization) (rendered with an external-link icon).

### Punctuation around link text

If punctuation immediately precedes or follows a link, put the punctuation outside the link tags where possible.

- Recommended:

  ```html
  For more information, see <a href="#Test">Test your code</a>.
  ```

- Not recommended:

  ```html
  For more information, see <a href="#Test">Test your code.</a>
  ```

### Quotation marks and italics

When a cross-reference is a link, don't put the link text in quotation marks.

- Recommended: For more information, see [Meet Android Studio](https://developer.android.com/studio/intro/index.html).
- Recommended: Learn about [what's new in Android Wear 2.0](https://android-developers.googleblog.com/2017/02/AndroidWear2.html).
- Not recommended: For more information, see ["Meet Android Studio"](https://developer.android.com/studio/intro/index.html).

In the rare case when a cross-reference isn't a link, use italics or quotation marks as appropriate:

- For an unlinked reference to a document section, short work, or part of a series (such as an episode in a web series), use quotation marks.
  - Recommended: For more information, see "Describing system versions" in the following section.
- For an unlinked reference to the title of a full-length work (such as a book, movie, or web series), use italics.
  - Recommended: ...see _The Chicago Manual of Style_.

### Avoid external links in your documentation navigation

In a documentation set's navigation, such as a table of contents, don't link outside the documentation set. Put the link in a page within the documentation instead.

If you must link outside your documentation set from navigation, make it clear to readers that they'll be leaving that document set.

### Style link text

If you write sitewide CSS, apply standard styling to link text so readers can find links:

- **Contrast link text color and regular text color.** Link text should be distinguishable from the rest of the text on the page.
- **Underline link text, and don't underline non-link text.** When readers scan a page, a horizontal line cuts through the vertical line of scanning and helps readers find links.
- **Make visited links change color.** Use color-blind-friendly color changes so readers can tell followed links from unfollowed ones and avoid revisiting content they've already read.

## Make headings into link targets

Source: https://developers.google.com/style/headings-targets

This page covers turning a heading into a link target with an `id` attribute. For formatting headings, see [Headings and titles](https://developers.google.com/style/headings).

Some content management systems create anchors for headings automatically. You might still add a _custom_ anchor when:

- You want an anchor shorter than the automatically generated one.
- The content might be frequently linked to. A custom anchor reduces the chance of breaking existing links if the heading text changes later.
- You want to [revise a heading](#revise-a-heading). If the anchor is generated automatically, it changes when you revise the heading, breaking existing links.

### Add a custom anchor

#### HTML

Add a `section` element with an `id` attribute, or use an `a` element with a `name` attribute. For anchor text, use lowercase letters with hyphens between words. Replace `ID_OF_ANCHOR` with your anchor text, for example `introduction-to-everything`.

```html
<section id="ID_OF_ANCHOR"></section>
```

- Recommended:

  ```html
  <section id="introduction-to-everything">
  <h2>Introduction to everything</h2>
  ...
  </section>
  ```

- Recommended:

  ```html
  <h2><a name="introduction-to-everything">Introduction to everything</a></h2>
  ```

- Recommended:

  ```html
  <a name="introduction-to-everything"></a>
  <h2>Introduction to everything</h2>
  ```

- Acceptable:

  ```html
  <h2 id="introduction-to-everything">Introduction to everything</h2>
  ```

#### Markdown

Add the following to the end of the heading's line. For anchor text, use lowercase letters with hyphens between words. Replace `ID_OF_ANCHOR` with your anchor text, for example `conserve-habitat`.

```markdown
{: #ID_OF_ANCHOR }
```

- Recommended:

  ```markdown
  ## Help conserve habitat for pollinators {: #help-conserve-habitat-for-pollinators }
  ```

- Also recommended:

  ```markdown
  ## Help conserve habitat for pollinators {: #conserve-habitat }
  ```

- Acceptable:

  ```markdown
  ## Help conserve habitat for pollinators {: id='conserve-habitat' }
  ```

- Acceptable:

  ```markdown
  ## Help conserve habitat for pollinators {: id="conserve-habitat" }
  ```

### Revise a heading

If you revise a heading in a system that creates anchors automatically, create a custom anchor to avoid breaking existing links. If the heading already has a custom anchor, don't change it unless it contains a term you want to remove (such as a disrespectful term).

To create the custom anchor, use the heading's older ID string, which you can find by inspecting the heading on the published page. For example, if you change a heading from _Introduction to some things_ to _Introduction to everything_, add a custom anchor that uses the older ID string and formatting.

#### HTML

```html
<section id="introduction-to-some-things">
<h2>Introduction to everything</h2>
...
</section>
```

#### Markdown

```markdown
## Introduction to everything {: #introduction-to-some-things }
```

If you need to change an existing custom anchor, check your content management system and update any links that use the old anchor. Inbound links that use the old anchor still reach the page but not the specific section or heading.

## HTML and semantic tagging

Source: https://developers.google.com/style/semantic-tagging

Use HTML elements for the purposes they were designed for. For example, mark the title of a standalone work (such as a book or a movie) with a [`cite` element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-cite-element). For more about semantic tagging, see [Semantics in HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#Semantics_in_HTML) on MDN.

Where no semantically relevant HTML element exists, use CSS or the few HTML elements that convey visual style without semantics.

### Visual formatting

To achieve specific visual results, don't use HTML elements that convey different semantics. In particular:

- Don't use frames or tables for layout; use your site's CSS to lay out the page.
- Don't use heading elements (such as `h1` and `h2`) to visually style text; use them only for hierarchically structured headings, and use CSS for visual style.
- The [`em` element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-em-element) indicates emphasis, not italics as such. Don't use it to italicize something that isn't meant to be emphasized; use the [`i` element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-i-element) for non-emphasis italics.
- The [`strong` element](https://html.spec.whatwg.org/multipage/semantics.html#the-strong-element) indicates strong importance, not bold as such. To bold a word that doesn't merit strong importance, use the [`b` element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-b-element).
- The [`br` element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-br-element) is intended "only for line breaks that are actually part of the content, as in poems or addresses." Don't use it to adjust spacing between lines. Use elements like `p` to mark the text semantically, and use CSS to adjust line spacing.

## HTML formatting

Source: https://developers.google.com/style/html-formatting

Follow Google's [HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html). Exception: don't leave out optional elements.

These basic guidelines from that style guide generally apply to other documentation source files too, such as YAML and Markdown:

- **Don't use tabs** to indent text; use spaces only. Text editors interpret tabs differently, and some Markdown features expect spaces.
- **Indent by two spaces** per indentation level.
- **Use all-lowercase** for elements and attributes.
- **Don't leave trailing spaces** at the end of a line (except as needed for Markdown).

### Line length

Break lines at 80 characters except in these cases:

- Information in a `meta` element at the beginning of a file must be on a single line, so those lines can be as long as needed.
- A URL with a line break won't work. If a URL is longer than 80 characters (quite common), you're stuck with it. Put the URL on its own line with the `href` attribute to make the surrounding text easier to review:

  ```html
  You can find more information in
  <a href="https://example.com/long-url/johan-gambolputty-de-von-ausfern-…-von-hautkopf-of-ulm.html"
  >his biography.</a>
  ```

Break code snippets (in `<pre>` blocks) at 80 characters:

- Older files might use different line lengths. If you're making small changes to a file with a consistent line length other than 80 characters, conform to that file's line length rather than reformatting the whole file.
- When adding line breaks, make sure you don't change the meaning of the code. If you're not familiar with the programming language, ask someone who is. Sometimes you can't avoid a long line.

## Markdown versus HTML

Source: https://developers.google.com/style/markdown

Use either HTML or Markdown. Some of this style guide assumes HTML; if you use Markdown, details like which HTML elements to use in various contexts might be irrelevant to you.

Markdown is easier to write than HTML, and its source is easier for most humans to read. However, HTML is more expressive (particularly for [semantic tagging](https://developers.google.com/style/semantic-tagging)) and can achieve effects that are difficult or impossible in Markdown. For example, you might have to switch to the HTML `code` element for special characters in code such as nonbreaking spaces.

Which one to use is primarily personal preference, but if your team or document template already uses one, it's best to use that.

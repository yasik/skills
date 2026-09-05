# Numbers, dates, units, and math

These rules are distilled from the Google developer documentation style guide.
Source pages are linked per section; content adapted under CC BY 4.0.

## Numbers

Source: https://developers.google.com/style/numbers

For formatting quantities like 10 MB, see [Units of measurement](https://developers.google.com/style/units-of-measure).

### Ordinal numbers

Spell out all ordinal numbers in text.

- Recommended: first, fifth, twelfth, forty-third
- Not recommended: 1st, 5th, 12th, 43rd

### Numbers as words

If it's important to keep the number and its noun on the same line, use a nonbreaking space between them.

In general, spell out the following:

- Numbers from zero through nine, except as noted in [Numbers as numerals](#numbers-as-numerals).
  - Recommended: two-day total
  - Recommended: four options
  - Recommended: five minutes
  - Recommended: nine developers
- A number that starts a sentence. In some cases it's better to rearrange the sentence so the number appears later.
  - Recommended: Fifteen directories are created.
  - Recommended: In general, avoid sending files larger than 164 MB as attachments.
  - Not recommended: 164 MB is generally considered too large a file to send as an attachment.

  **Exception**: It's okay, but non-optimal, to begin a sentence with a four-digit year.
- A number that is followed by a numeral.
  - Recommended: This procedure creates fifteen 100,000-byte files.
  - _But_ Recommended: This procedure creates 15 of the 100,000-byte files.
- Indefinite and casual numbers. Words like _millions_ or _billions_ are fine for approximate numbers; for precise numbers, use numerals.
  - Recommended: You can specify thousands of combinations.
  - Recommended: The API might return a list of a million songs.

### Numbers as numerals

If it's important to keep the number and its noun on the same line, use a nonbreaking space between them.

In general, use numerals for the following:

- Numbers 10 and greater.
  - Recommended: The link expires in 24 hours.
  - Recommended: 18 years old
  - Recommended: 27 minutes
  - Recommended: 728 shipments
  - Recommended: 18,000,000 users
  - Recommended: 10 chapters
  - Recommended: 102 degrees

  **Exceptions**: Always use numerals for the following, even when less than 10:
  - Version numbers.
    - Recommended: version 3
  - Technical quantities, such as amounts of memory or disk space, numbers of queries, or usage limits.
    - Recommended: 6 queries per second
    - Recommended: 50 Mbps
    - Recommended: 128 bits
  - Page numbers.
  - Chapter numbers, sections, pages, and so on.
  - Step numbers. Avoid referring to step numbers whenever possible, but when you have no choice or it makes the most sense, use the numeral.
  - Prices.
  - Numbers without units, such as numbers in mathematical expressions.
  - Numbers less than 10 when they appear in the same sentence as numbers greater than 9.
    - Recommended: The menu contains 15 options but 6 of them are deselected.
- Negative numbers.
- Most [fractions](#fractions).
- [Percentages](#percentages).
- [Dimensions](#dimensions).
- Numbers containing decimal points.
  - Treat decimal numbers as plural even when less than or equal to 1.0.
    - Recommended: 1.0 inches
  - For decimal numbers less than one, place a zero in front of the decimal point.
    - Recommended: 0.3 inches
- Measurements.
  - Recommended: 8 pixels
- [Numbers in a range](#ranges-of-numbers).

### Numbers as Roman numerals

Avoid Roman numerals when possible. Use Arabic numerals, which are easier to scan.

You can use Roman numerals for [sub-steps in numbered procedures](https://developers.google.com/style/procedures#sub-steps-in-numbered-procedures).

### Fractions

Express fractions as decimal numbers when possible.

If you must express fractions as words, connect the numerator and denominator with a hyphen unless one of them is already hyphenated.

- Recommended: 0.75
- Recommended: one and one-half
- Recommended: two-fifths
- Recommended: five sixty-fourths

### Percentages

Use numerals and the percent sign (%), with no space between them.

- Recommended: 40%

**Exception**: If the percentage starts the sentence, spell out both the number and the word _percent_.

- Recommended: Forty percent of the files

### Ranges of numbers

Use a hyphen with no space on either side. Do not use an en dash (`&ndash;`).

- Recommended: 2012-2016

See also [Ranges of numbers with units](https://developers.google.com/style/units-of-measure#ranges) and [Range of numbers](https://developers.google.com/style/hyphens#number-range).

### Suspended hyphens

When two or more hyphenated compounds that start with numbers modify the same word, use [suspended hyphens](https://developers.google.com/style/hyphens#suspended-hyphens).

- Recommended: You can set up the system to scan for new files at one-, two-, or three-hour intervals.

### Currency

Make it clear which country's currency you're describing. See [Currency](https://developers.google.com/style/units-of-measure#currency) in Units of measurement.

For US dollars, use a comma to delineate the thousands place of whole currency and a period to separate whole currency from fractions. Always start with the dollar sign ($). Don't use any punctuation or spaces to the right of the decimal.

- Recommended: The price is $0.006653 per vCPU hour.
- Not recommended: The price is $0.006,653 per vCPU hour.
- Recommended: $10,000 in fees is out of reach for many developers.
- Not recommended: $10 000 in fees is out of reach for many developers.

### Commas and decimal points in numbers

Follow standard American number formatting: in numbers four or more digits long, use commas to set off groups of three digits, counting leftward from the decimal point. For long decimal numbers, don't use any digit-group separators to the right of the decimal point. Use a period for the decimal point.

**Note**: Even though the [International System of Units](https://www.nist.gov/pml/weights-and-measures/metric-si/si-units) (SI) uses a thin space as a digit group separator, use a comma, the most common separator in the US.

| Recommended | Not recommended |
| ---- | ---- |
| The limit is 1,532,784 bytes per day. | The limit is 1532784 bytes per day. |
| The API supports up to 2,000 vertices. | The API supports up to 2000 vertices. |
| $0.031611/vCPU hour | $0.031 611/vCPU hour |

**Note**: Even though some scientific writing omits commas in four-digit numbers, use a comma for a four-digit number.

For more about decimal points and digit group separators, see Wikipedia's [decimal mark](http://wikipedia.org/wiki/Decimal_mark) entry.

### Dimensions

Use numerals for dimensions. Use a lowercase _x_ between the numerals, with no space on either side.

- Recommended: 192x192
- Not recommended: 192 x 192

### Exponents

Use [standard mathematical notation](https://wikipedia.org/wiki/Exponentiation). Don't put a space between the base and the exponent.

- Recommended: 2³

### Accompany numerical concepts with real-world practical implications

Give numerical concepts tangible meaning with real-world implications. For example, if a feature incurs additional fees, link to the pricing calculator.

### Mathematical notation and visuals

For formatting equations and variables, see [Mathematical notation](https://developers.google.com/style/mathematical-notation).

## Dates and times

Source: https://developers.google.com/style/dates-times

Expressing dates and times clearly and unambiguously supports [writing for a global audience](https://developers.google.com/style/translation) and reduces confusion.

### Express times

- Use the 12-hour clock, except when required to use 24-hour time, such as when documenting features that use it. If the UI, a command, or a code sample uses the 24-hour format, use that format throughout the page for consistency.
- Use exact times when possible, but _noon_ and _midnight_ are OK.
- Use hyphens in time ranges, with no spaces before or after.
  - Recommended: 5-10 minutes ago.
- Capitalize AM and PM, and leave one space between it and the time.
  - Recommended: 3:45 PM.
- Remove the minutes from round hours.
  - Recommended: 3 PM.

#### Express time zones

Avoid time zones unless absolutely necessary. When you must use one, such as when describing real events at real times:

- Let the reader know if the time is local to them, for example _10 AM your local time_.
- If a time zone is necessary, use the timestamp format shown in the user interface (if available).
- If using a specific time zone, spell out the region and include the [UTC or GMT label](https://www.worldtimeserver.com/learn/utc-vs-gmt/) as a parenthetical. For example:
  - US and Canadian Pacific Standard Time (UTC-8)
  - US and Canadian Pacific Daylight Time (UTC-7)
- Don't abbreviate the name of the time zone.
- In the rare event that an event's time doesn't change for daylight saving time, use the specific time zone without reference to UTC.

### Express dates

Spell out the names of months and days of the week in full. Give the full four-digit year, not a two-digit abbreviation.

- Recommended: January 19, 2017

If including the day of the week, add it before the month: `DAY_OF_WEEK`, `MONTH` `DAY`, `YEAR`.

- Recommended: Tuesday, April 27, 2021

#### Partial dates and abbreviations

When giving only the month and year, don't use a comma.

- Recommended: She was hired in January 2017.

In most cases, don't abbreviate the day of the week or the month. When conserving space, such as in a heading or table, it's okay to use the three-letter abbreviations for the month and day of the week. Capitalize the first letter and don't add a period.

If you abbreviate, do so for the entire date; don't mix written-out and abbreviated forms in the same date. Be consistent about where you abbreviate throughout the documentation. For example, if you abbreviate in table cells, do so in all table cells.

- Recommended: Mon, Sep 3, 2018
- Not recommended: Mon, September 3, 2018

#### Dates in the middle of a sentence

When a `MONTH` `DAY`, `YEAR` date appears mid-sentence, add a comma after the year.

- Recommended: The January 19, 2017, release of ...

If the mid-sentence date consists of month and year only, don't use a comma.

- Recommended: The January 2017 release of ...

#### Why we prefer dates written out

Don't express months as numbers unless you have no option (in which case, see [Numeric-only date format](#numeric-only-date-format)). Different regions order the parts of numeric dates differently. For example, 04/05/09 means:

- In the UK, May 4, 2009 (day, month, year).
- In the US, April 5, 2009 (month, day, year).
- In some other parts of the world, May 9, 2004 (year, month, day).

So always use words to express dates. Numbers-only dates (with slashes, periods, or hyphens as separators) can be confusing.

- Recommended: February 12, 2017
- Recommended: Sunday, February 12, 2017
- Not recommended: 02.12.2017
- Not recommended: 12/02/2017

#### Numeric-only date format

If you must use a numerical date format, use `YYYY-MM-DD` with hyphens as separators, which conforms to [ISO 8601](https://wikipedia.org/wiki/ISO_8601).

If you can choose the date (such as in a fictional example), pick a calendar day greater than 12 to differentiate it from the month.

- Recommended: 2017-04-15
- Not recommended: 04/06/2017

#### Express dates and times together

If you must express a date and a time together, mention the date first and then the time.

- Recommended: 2017-04-15 at 3 PM
- Recommended: May 4, 2009, at 6 PM

### Express divisions of the year

Avoid referring to seasons. Spring in the northern hemisphere is fall (autumn) in the southern hemisphere. Use the month, quarter, or temperature (if relevant) instead.

| Recommended | Not recommended |
| ---- | ---- |
| During warmer months, data centers face a higher risk of cooling failures. | During summer months, data centers face a higher risk of cooling failures. |
| In November and December, data centers experience higher traffic volume. | In winter, data centers experience higher traffic volume. |
| Changes are released in October of each year. | Changes are released in the Fall of each year. |

## Units of measurement

Source: https://developers.google.com/style/units-of-measure

Put a nonbreaking space (`&nbsp;`) between the number and the unit.

### Spaces in units of measurement

For most units of measurement, use a nonbreaking space between the number and the unit. This applies in both HTML and Markdown.

For when to spell out units, see [Abbreviations](https://developers.google.com/style/abbreviations#spelling-out). For whether to hyphenate, see [Hyphens](https://developers.google.com/style/hyphens#compounds).

- Recommended: `64&nbsp;GB` (64 GB)
- Recommended: `25&nbsp;mm` (25 mm)
- Recommended: a 128-bit system
- Not recommended: `64 GB`
- Not recommended: 64GB

For making abbreviations plural, see [Plural abbreviations](https://developers.google.com/style/pluralization#making-abbreviations-plural).

When the unit is money, percent, or degrees of an angle, don't use a space. See [Currency](#currency-1).

- Recommended: $10
- Recommended: £25
- Recommended: 65%
- Recommended: 180°

For degrees of temperature, include a nonbreaking space between the number and the degree symbol, and no space between the degree symbol (`&deg;`) and the temperature scale (_F_ or _C_).

- Example: 50 °C
- HTML and Markdown: `50&nbsp;&deg;C`

For Kelvin temperatures, leave out the degree symbol but use a nonbreaking space before the _K_.

- Example: 300 K
- HTML and Markdown: `300&nbsp;K`

When a number and unit combine to modify a noun, don't hyphenate unless the hyphen is needed for clarity.

- Recommended: `200&nbsp;GB disk` (200 GB disk)

### Ranges of numbers with units

In a range, repeat the unit for each number. _Unit_ includes symbols (like the degree symbol) and abbreviations (like _MB_) but not nouns (like _file_). See [Range of numbers](https://developers.google.com/style/hyphens#number-range).

Use the word _to_ between the numbers rather than a hyphen, which can be misread as a subtraction sign.

- Recommended: -40 °C to 85 °C
- Not recommended: -40-85 °C

### Hyphens with multiplied units

When the components of a unit are multiplied by each other, hyphenate them.

- Recommended: 5 vCPU-hours
- Recommended: 40 person-hours

### Use _k_ to indicate thousands

In some contexts it's appropriate to indicate thousands by following a number with a lowercase _k_. If you do:

- Don't put a space between the number and _k_.
- Add a noun to say what the number measures, and to make clear that _k_ doesn't mean _kilobytes_.

- Recommended: On this plan, you are limited to 55k download operations and 20k upload operations per day.

### Currency

Make sure the reader knows which currency you mean. The dollar sign ($) can refer to US dollars, Canadian dollars, Mexican pesos, and several other currencies.

If there's any possibility of ambiguity, put a currency indicator before the amount. For details, see section 9.20 and following in the Chicago Manual of Style, 17th edition.

- Recommended: US$10

### Rates

Use _per_ instead of the division slash (/) when space permits. The slash is OK when space is limited, such as in a table with small cells.

Shorten _per_ to _p_ only in well-established rate abbreviations, such as _Gbps_ (gigabits per second) or _MBps_ (megabytes per second).

- Recommended: requests per day
- Not recommended: requests/day
- Recommended: Gbps
- Not recommended: Gb/s

### Decimal and binary units

Use the same system to measure bytes as the technology you're documenting. Don't use _MB_ if you mean _MiB_, or _GB_ if you mean _GiB_. Common [decimal and binary units](https://en.wikipedia.org/wiki/Byte#Multiple-byte_units):

| Decimal units | Binary units |
| ---- | ---- |
| kB (kilobyte, or 1000 bytes) | KiB (kibibyte, or 1024 bytes) |
| MB (megabyte, or 1000² bytes) | MiB (mebibyte, or 1024² bytes) |
| GB (gigabyte, or 1000³ bytes) | GiB (gibibyte, or 1024³ bytes) |

For abbreviating measurement terms, see [When to spell out a term](https://developers.google.com/style/abbreviations#spelling-out).

### More resources

- [Mathematical notation](https://developers.google.com/style/mathematical-notation)
- [Numbers](https://developers.google.com/style/numbers)

## Format phone numbers in text

Source: https://developers.google.com/style/phone-numbers

This guidance covers using and formatting phone numbers in technical documentation. It doesn't cover how to enter or use phone numbers in Google or third-party products; for that, consult the product documentation or product support.

### Use example phone numbers

Most phone numbers in documentation are examples. For an example, use a US number in the range 800‑555‑0100 through 800‑555‑0199, which is reserved for examples and fiction.

Never use a real phone number in examples.

### Format phone numbers in HTML or Markdown

To keep a phone number on one line, use a nonbreaking hyphen (`&#8209;`) where appropriate in HTML or Markdown.

- Example: 415‑555‑0132
- HTML and Markdown: `415&#8209;555&#8209;0132`

### Format North American phone numbers

For a real number in the US, Canada, and other [NANP](https://wikipedia.org/wiki/North_American_Numbering_Plan) (North American Numbering Plan) countries, use a nonbreaking hyphen to separate the area code, three-digit exchange code, and four-digit number.

- Recommended: 415‑555‑0132

### Format international phone numbers

For a real number in a non-NANP country, include the country and area codes. Put a plus sign immediately before the country code (no space); the plus sign stands in for the _exit code_ used to dial out of a country, which differs by country.

See the [ITU document on standardized phone number formatting](https://www.itu.int/rec/T-REC-E.123-200102-I/en).

- Recommended: +1‑415‑555‑0132

### Format phone numbers that include an extension

Follow the phone number with the word _extension_, then the extension number.

- Recommended: 415‑555‑0132, extension 987

## Mathematical notation

Source: https://developers.google.com/style/mathematical-notation

This section covers formatting exponents, expressions, equations, operators, and variables so documentation works with assistive technologies and renders accurately. For general number formatting, see [Numbers](https://developers.google.com/style/numbers).

**Note:** The examples show HTML and Markdown formatting in standard text. If you use a third-party tool to display complex math, follow that tool's formatting guidance.

### Use HTML entities for mathematical symbols

Use HTML entities for mathematical symbols instead of keyboard symbols. For the plus sign (`+`), equals sign (`=`), and division sign (`/`), you can use the keyboard equivalents.

| Symbol | Markup | Description |
| ---- | ---- | ---- |
| + | Use the keyboard symbol. | Plus sign |
| − | `&minus;` | Minus sign |
| × | `&times;` | Multiplication sign. Alternatively, use the dot operator `∙` (`&#8729;`) or asterisk operator `*` (`&#42;`) to match the UI. Don't use an asterisk (`*`) to indicate multiplication in text. You can omit the multiplication symbol when doing so doesn't create ambiguity, for example _ab_ instead of _a_ × _b_. |
| / | Use the keyboard symbol. | Division sign |
| = | Use the keyboard symbol. | Equals sign |
| ≠ | `&ne;` | Not equal to |
| ± | `&plusmn;` | Plus-minus sign |
| ∓ | `&mnplus;` | Minus-plus sign |
| < | `&lt;` | Less than sign |
| > | `&gt;` | Greater than sign |
| ≈ | `&asymp;` | Approximately equal to |
| ≉ | `&nap;` | Not approximately equal to |
| ≅ | `&cong;` | Congruent to |
| ≤ | `&le;` | Less than or equal to |
| ≥ | `&ge;` | Greater than or equal to |
| ≡ | `&equiv;` | Identical to |
| ≢ | `&nequiv;` | Not identical to |
| √ | `&radic;` | Square root |
| ∑ | `&sum;` | N-ary summation |

### Format mathematical notation

#### Operators

For accessibility and accurate HTML, use [HTML entities](#use-html-entities-for-mathematical-symbols) instead of keyboard symbols for operators. For example, use `&minus;` instead of a hyphen (`-`).

Include a nonbreaking space (`&nbsp;`) on both sides of operators within a single expression, equation, or statement.

Don't italicize operators.

- Recommended: _a_ − _b_

To render _a_ − _b_:

- **HTML:** `<i>a</i>&nbsp;&minus;&nbsp;<i>b</i>`
- **Markdown:** `_a_&nbsp;&minus;&nbsp;_b_`

#### Variables

Italicize variables.

- Recommended: _x_ ≠ _y_
- Recommended: _x_ to the power _y_ (superscript _y_)
- Recommended: _y_ with subscript _i_

To render _x_ ≠ _y_:

- **HTML:** `<i>x</i>&nbsp;&ne;&nbsp;<i>y</i>`
- **Markdown:** `_x_&nbsp;&ne;&nbsp;_y_`

#### Expressions and equations

Keep short expressions and equations inline with the text.

Include a nonbreaking space (`&nbsp;`) between components such as operators and variables so the expression renders on one line.

When an expression or equation creates an awkward line break, consider placing it on its own line.

- Recommended: The equation that describes a linear trend line is _y_ = _a_ + _bx_.
- Recommended: The equation that describes a polynomial trend line, where the order is _o_, is the following: _y_ = _a_ + _b_ × _x_ + ... + _k_ × _x_ to the power _o_

To render _y_ = _a_ + _bx_:

- **HTML:** `<i>y</i>&nbsp;=&nbsp;<i>a</i>&nbsp;+&nbsp;<i>bx</i>`
- **Markdown:** `_y_&nbsp;=&nbsp;_a_&nbsp;+&nbsp;_bx_`

#### Fractions

Express fractions as decimal numbers when possible.

If you must express fractions as words, connect the numerator and denominator with a hyphen unless one of them is already hyphenated.

- Recommended: 0.02
- Recommended: one and one-half
- Recommended: three-sevenths
- Recommended: three seventy-fourths

#### Exponents and subscripts

Use [standard mathematical notation](https://wikipedia.org/wiki/Exponentiation). Don't put a space between the base and the exponent.

Render exponents with the HTML `<sup>` tag. Don't use the keyboard caret (`^`) for an exponent. Render subscripts with the HTML `<sub>` tag.

- Recommended: 2³
- Recommended: _x_ with superscript _y_
- Recommended: _y_ with subscript _i_
- Not recommended: 2^3

To render 2³ in HTML and Markdown: `2<sup>3</sup>`

### Notation as words

You can generally use mathematical notation in place of words in running text, for example _x_ ≠ _y_ instead of "_x_ is not equal to _y_." If notation creates ambiguous, grammatically incorrect, or hard-to-read text, use words instead.

- Recommended: Check whether _a_ > _b_.
- Recommended: The area is calculated by multiplying the length by the width.
- Not recommended: Check whether _a_ is greater than _b_.
- Not recommended: The area is calculated by multiplying _l_ × _w_.

### Tools for complex or multiline equations

HTML entities and tags suit most common notation. For complex, multiline equations or formulas that are hard to represent clearly in standard HTML, consider [diagrams, other images](https://developers.google.com/style/images), or a dedicated math rendering tool. Images and diagrams like pie charts or bar graphs are especially helpful for comparing statistics and illustrating percentages.

### More resources

- [Numbers](https://developers.google.com/style/numbers)
- [Units of measure](https://developers.google.com/style/units-of-measure)
- [Text-formatting summary](https://developers.google.com/style/text-formatting)

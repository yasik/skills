# Names and naming

These rules are distilled from the Google developer documentation style guide.
Source pages are linked per section; content adapted under CC BY 4.0.

## Product names

Source: https://developers.google.com/style/product-names

### Capitalize product names

Google product names are in _title case_ (also called _init-capped_): every word is capitalized except prepositions like _of_ or _on_ and articles like _a_ or _the_. Use title case for Google products except when matching a UI label; see [UI elements and interaction](https://developers.google.com/style/ui-elements).

For any product, follow the official capitalization for names of brands, companies, software, products, services, features, and terms defined by companies and open source communities.

- For Kubernetes-related terms, follow the capitalization in the Kubernetes [Concepts documentation](https://kubernetes.io/docs/concepts/).
  - Recommended in a Kubernetes context: A Job creates one or more Pods.
  - Recommended: The Cloud Scheduler job publishes a message to a Pub/Sub topic at one-minute intervals.
- If an official name begins with a lowercase letter, keep it lowercase even at the start of a sentence, but prefer revising the sentence so the lowercase word doesn't start it.
  - Recommended: You can use macOS to run the app.
  - Not recommended: macOS can run the app.

#### Feature names

A _feature_ is a distinctive attribute or capability of a product, usually described by what it can do as part of the product. Feature names are generally lowercase, with exceptions.

Don't capitalize a feature name unless it's officially capitalized. If unsure, follow the precedent set by other documents describing the feature. As with products, match a UI label's capitalization when referring to one.

For general capitalization rules, see [Capitalization](https://developers.google.com/style/capitalization).

### Shorten Google product names

Repeating a full name like Google Spreadsheets can be awkward, and you might be tempted to call it Spreadsheets.

Use the full trademarked product name. Don't abbreviate product names except when matching a UI label; in that case, make clear you're referring to the Google product and not something else with a similar name.

Also consider whether you need the product name throughout a document or can use a more general term. For example, once you've established that you're discussing _Anthos Service Mesh_, you can frame much of the discussion around _a service mesh_.

### Possessives of product names

See [Product, feature, and company names](https://developers.google.com/style/possessives#product,-feature,-and-company-names).

### Articles before product names

Don't use _the_ before a product name unless the name modifies something else. _Do_ use _the_ before tool and API names.

- Recommended: Using Cloud Datastore with Cloud Dataproc
- Recommended: The Cloud Datastore options page
- Recommended: The Google Cloud console
- Recommended: The Transcoder API
- Recommended: The `gcloud` CLI
- Not recommended: Using the Cloud Datastore with Cloud Dataproc

When a product name modifies a noun after an indefinite article (_a_ or _an_), pay close attention to which article precedes the product name.

- Recommended: An Anthos Service Mesh environment
- Recommended: A Service Mesh environment

For more, see [Articles](https://developers.google.com/style/articles).

### Use "service" to refer to multiple products

It's OK to refer to Google products as services, such as _the Google Kubernetes Engine service_ or _the Compute Engine service_. If _services_ leads to ambiguity, use the product names.

### Don't use product names as verbs

Don't use product names or feature names as verbs.

## Trademarks

Source: https://developers.google.com/style/trademarks

Follow any usage guidelines that trademark owners provide.

### Label trademarked terms

For trademark marking or attribution in documentation, follow the usage guidelines provided by the owners of the respective marks.

For Google trademarks, see [About our trademarks and how to use them](https://www.google.com/permissions/trademark/).

### Use trademarks only as modifiers

Always use a trademarked term to modify a noun, never as a noun by itself. Don't use a trademark as a verb.

Never form a possessive or a plural from a trademark or change it in any way. See [Possessives](https://developers.google.com/style/possessives).

- Recommended: Another option is to use a Chromebook notebook computer.
- Not recommended: Another option is to use a Chromebook.
- Not recommended: Chromebook's features rely on an internet connection.
- Not recommended: For information about Chromebook computers, google "notebook computers"

For more about using Google trademarks, see [Rules for proper usage](https://www.google.com/permissions/trademark/rules.html).

## Example domains and names

Source: https://developers.google.com/style/examples

Don't use real domain names, email addresses, or people's names in examples. Don't reveal personally identifiable information (PII), such as domain names, email addresses, phone numbers, people's names, project names, or credit card numbers. Use imaginary (fictitious) examples or [placeholders](https://developers.google.com/style/placeholders) like `USER_ID` or `EMAIL_ADDRESS`.

### Example domain names

For a generic domain name, use example.com, example.org, or example.net. These are reserved by the [Internet Assigned Numbers Authority](https://www.iana.org/domains/reserved) for documentation.

Alternatively, use one of these domains, which Google owns specifically for documentation:

- altostrat.com
- examplepetstore.com
- example-pet-store.com
- myownpersonaldomain.com
- my-own-personal-domain.com
- cymbalgroup.com

For an internationalized domain name, use one of the [IDN Test TLDs](https://en.wikipedia.org/wiki/IDN_Test_TLDs) and copy from the "URL of the test site" column.

- Recommended: Hostnames that include non-ASCII characters are encoded using Punycode. For example, `http://مثال.إختبار` is encoded as `xn--kgbechtv`.

### Example email addresses

For a generic email address, combine a domain from [Example domain names](#example-domain-names) with a name from [Example person names](#example-person-names), for example dana@example.com. Generic addresses like support@example.net are OK. Don't use person names, product names, or made-up names in email addresses.

### Example person names

Draw example given names from this list:

- Alex
- Amal
- Ariel
- Bola
- Charlie
- Cruz
- Dana
- Dani
- Hao
- Ira
- Izumi
- Jie
- Kai
- Kalani
- Kim
- Kiran
- Lee
- Lucian
- Luka
- Mahan
- Noam
- Nur
- Quinn
- Raha
- Rosario
- Sasha
- Tal
- Taylor
- Tristan
- Yuri

#### Example person surnames

For example surnames, use an initial after the given name, for example Quinn N. or Dana A.

#### Further notes about example people

Even fictitious or hypothetical people are read about by real people whom we want to feel respected, valued, and welcomed. Your audience includes people with different jobs, cultural contexts, and backgrounds, so include a variety of people in your examples.

Use the [gender-neutral singular pronouns](https://developers.google.com/style/pronouns#gender-neutral-pronouns) _they_, _their_, and _theirs_ whenever possible, and avoid specifying gender unless it's integral to the information. Avoid examples that depend on a gender binary. If an example must specify gender, note that some names on the list may imply a particular gender in a given language or culture, and check that chosen names don't carry a conflicting gender connotation.

Be mindful of assumptions and stereotypes that hypothetical examples might reinforce, such as:

- Job roles and levels, such as executive, disproportionately assigned particular gendered personas.
- Job roles, such as developer or engineer, disproportionately assigned particular ethnic personas.

Use names from the preceding list in most documentation. Some security documentation uses the [Alice and Bob](https://wikipedia.org/wiki/Alice_and_Bob#Cast_of_characters) cast of characters. Don't use them unless you're documenting a technical specification that uses those characters, and then use only names from that cast.

See also [writing inclusive documentation](https://developers.google.com/style/inclusive-documentation).

### Example company names

Use Example Organization. To differentiate two fictional companies, add a description, for example Enterprise Example Organization and Startup Example Organization.

### Example phone numbers

Use a US number in the range 800‑555‑0100 through 800‑555‑0199, which is reserved for examples and fiction.

Never use a real phone number in examples.

For formatting, see [Format phone numbers in HTML or Markdown](https://developers.google.com/style/phone-numbers#format-phone-numbers).

### Example IP addresses

For an IPv4 address, such as in a log, use one of the [RFC 5737](https://tools.ietf.org/html/rfc5737) addresses reserved for documentation:

- `192.0.2.0` through `192.0.2.255`
- `198.51.100.0` through `198.51.100.255`
- `203.0.113.0` through `203.0.113.255`

For IPv4 address ranges, use:

- `192.0.2.0/24`
- `198.51.100.0/24`
- `203.0.113.0/24`

For an IPv6 address, use values from the [RFC 3849](https://tools.ietf.org/html/rfc3849) range, for example:

- `2001:db8::`
- `2001:db8:ffff:ffff:ffff:ffff:ffff:ffff`
- `2001:db8:1:1:1:1:1:1`
- `2001:db8:2:2:2:2:2:2`
- `2001:db8:3:3:3:3:3:3`
- `2001:db8:4:4:4:4:4:4`

For IPv6 address ranges, use:

- `2001:db8::/32`

### Example street addresses

Avoid real street addresses. Use one of these fictional addresses:

- 1800 Amphibious Blvd., Mountain View, CA 94045
- Avenida da Pastelaria, 1903, Lisbon, 1229-076
- 8 Rue du Nom Fictif, 341 Paris

### Example project names

Create a name that's meaningful or descriptive and applicable to the reader's environment. Don't use unclear components like `foo`, `bar`, and `baz`.

When necessary, use an appended numbering scheme, for example `staging`, `frontend-development`, `backend-development`, `production-1`, `production-2`.

### Example service account IDs

For a unique service account ID, use the numeric ID `123456789012345678901`.

- Recommended: The allow policy shows the identifier `deleted:serviceAccount:my-service-account@my-project.iam.gserviceaccount.com?uid=123456789012345678901`.

## Filenames and file types

Source: https://developers.google.com/style/filenames

### Guidelines for names

Make file and directory names lowercase, with occasional exceptions for consistency, so file searches are easier and search results more useful. Most Unix-style operating systems are case sensitive: Linux and macOS treat `Impersonate-Service-Accounts.html` and `impersonate-service-accounts.html` as two distinct files.

Use hyphens, not underscores, to separate words, for example `query-data.html`. Search engines read hyphens in file and directory names as spaces between words; underscores are generally not recognized and can hurt SEO.

Use only standard ASCII alphanumeric characters in file and directory names.

Don't use generic page names such as `document1.html`.

#### Exceptions for consistency

If you're adding to a directory where everything else uses underscores and changing everything to hyphens isn't feasible, it's OK to use underscores for consistency. For example, next to `lesson_1.jd`, `lesson_2.jd`, and `lesson_3.jd`, add `lesson_4.jd` rather than `lesson-4.jd`. In all other situations, use hyphens.

- Recommended: `avoiding-cliches.jd`
- Sometimes OK: `avoiding_cliches.jd`
- Not recommended: `avoidingcliches.jd`
- Not recommended: `avoidingCliches.jd`
- Not recommended: `avoiding-clichés.jd`

#### Other exceptions

Some inconsistency is OK when it can't be avoided. For example, tools that generate reference documentation may produce filenames based on different style requirements or on the product's or API's own naming conventions. Exceptions for those files are fine.

### Refer to files

#### Refer to filenames

When referring to a specific file:

- Use [code font](https://developers.google.com/style/code-in-text).
- Include the word _file_ after the filename. See [Grammatical treatment of code elements](https://developers.google.com/style/code-in-text#grammatical-treatment-of-code-elements).
- Use the exact spelling of the filename even if it doesn't follow the [naming guidelines](#guidelines-for-names).
- If a sample of the file is on the page, follow the [code sample](https://developers.google.com/style/code-samples) guidelines and precede the sample with an introductory sentence or paragraph that includes the filename.

- Recommended: In the following `build.sh` file, modify the default values for all parameters:

#### Refer to file interactions

Don't use file types as verbs.

- Recommended: Extract a zip file.
- Not recommended: Unzip a zip file.

#### Refer to file types

Use the formal name of the file type, not the filename extension. File type names are often all caps because many are acronyms or initialisms. Don't use the extension to refer generically to the file type.

- Recommended: a PNG file
- Not recommended: a `.png` file
- Recommended: a Bash file
- Not recommended: an `.sh` file

Examples of filename extensions and the corresponding file type names:

| Extension | File type name |
| ----------------- | ----------------- |
| `.adoc` | AsciiDoc file |
| `.csv` | CSV file |
| `.exe` | executable file |
| `.gif` | GIF file |
| `.img` | disk image file |
| `.ipynb` | IPYNB file |
| `.jar` | JAR file |
| `.jpg`, `.jpeg` | JPEG file |
| `.json` | JSON file |
| `.md` | Markdown file |
| `.pdf` | PDF file |
| `.png` | PNG file |
| `.ps` | PowerShell file |
| `.py` | Python file |
| `.sh` | Bash file |
| `.sql` | SQL file |
| `.svg` | SVG file |
| `.tar` | tar file |
| `.tf` | Terraform file |
| `.tiff` | TIFF file |
| `.txt` | text file |
| `.wasm` | Wasm file |
| `.yaml` | YAML file |
| `.zip` | zip file |

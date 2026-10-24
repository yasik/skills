# Word list: numbers, symbols, A–L

Source: https://developers.google.com/style/word-list (content adapted under CC BY 4.0). Continued in word-list-m-z.md.

This word list covers style and usage guidelines specific to developer documentation. If a term isn't listed, check the other editorial resources (https://developers.google.com/style#editorial-resources), including the preferred dictionary, [Merriam-Webster](https://www.merriam-webster.com/). When Merriam-Webster lists multiple spellings, use the first form listed, which is the most common (for example, _canceled_, not _cancelled_). For technical definitions, check the authoritative documentation on the topic. Terminology decisions (how and when to define or contextualize terms) depend on product area, audience, and prevailing convention; related guidance: Jargon (https://developers.google.com/style/jargon), Inclusive language (https://developers.google.com/style/inclusive-documentation), Write for a global audience (https://developers.google.com/style/translation), Hyphens (https://developers.google.com/style/hyphens), Capitalization (https://developers.google.com/style/capitalization). It's fine to deviate from the guidance if that serves readers better (https://developers.google.com/style#rules).

Entries marked with _avoid_ or _don't use_ apply as follows. **Use with caution**: avoid the term when possible, or use it carefully; it might be ambiguous or obscure, so alternatives or a more specific term are suggested, but you can use it if needed, defining it or using it only once as the Jargon page explains. **Don't use**: in all cases, prefer not to use the term; it might be particularly ambiguous or have an offensive or non-inclusive association, and if it appears in code, replace or write around it (https://developers.google.com/style/inclusive-documentation#replace-or-write-around-non-inclusive-terms). Some entries apply only to Android, Google Cloud, or Google Workspace documentation, as noted in the entry.

## Numbers and Symbols

- **+**: OK to use _+_ with numbers in text, such as _customer records with 300+ demographic attributes_, except in formal contexts.
- **& (ampersand)**: Don't use _&_ instead of _and_ in headings, text, navigation, or tables of contents. OK when referencing UI elements that use _&_, or in table headings and diagram labels where space constraints require abbreviation. OK to use `&` for technical purposes in code.
- **2-Step Verification**: When referring to Google's 2-Step Verification (https://www.google.com/landing/2step/), use initial caps. When referring to generic 2-step verification, use lowercase.

## A

- **a and an**: Use _a_ when the next word starts with a consonant _sound_, regardless of what letter it starts with. See https://developers.google.com/style/articles.
- **A/B testing**: Capitalize and use slash notation for _A/B_.
- **abnormal**: Don't use to refer to a person. OK to use to refer to a condition of a computer system.
- **abort**: Avoid in general usage. Instead, use words like _stop_, _exit_, _cancel_, or _end_. In Linux, _abort_ refers to a type of signal that terminates an abnormal process.
- **about versus on**: When a cross-reference includes information that describes what it links to, use _about_ instead of _on_. Recommended: For more information about indexes, see Managing indexes. Not recommended: For more information on indexes, see Managing indexes.
- **above**: Don't use for a range of version numbers; use _later_. Don't use to refer to a position in a document; use _earlier_ or _preceding_. Don't use to refer to a position in the UI; write instructions that avoid directional language (https://developers.google.com/style/accessibility). OK to use _above_ in a non-directional way, such as when describing a hierarchy.
- **access (verb)**: Avoid when you can. Instead, use friendlier words like _see_, _edit_, _find_, _use_, or _view_.
- **access token**: Lowercase except at the beginning of a sentence, heading, or list item.
- **account name**: Don't use. Instead, use _username_.
- **actionable**: Avoid unless it's the clearest and simplest phrasing for your audience. Instead, leave it out or replace it with a phrase like _that you can act on_ or _useful_. Avoid its legal sense unless that meaning is established by the source material.
- **action bar**: In Android documentation, don't use. Instead, use _app bar_.
- **ad tech**: Write out on first mention: _advertising technology (ad tech)_. Don't use _adtech_ or _ad-tech_.
- **address bar**: Use to refer to the URL bar or the combined URL bar and search box in a browser. Don't use _omnibox_.
- **ad hoc**: OK to use in database and analytics contexts to mean "free-form" or "user-written" (for example, _ad hoc queries_ or _an ad hoc chart_). For other contexts, try to find a more specific English equivalent. Don't hyphenate or italicize the term.
- **admin**: Write out _administrator_ unless it's the name of a UI label or other element. It's OK to use _admin_ in Android documentation.
- **administrator**: In Android documentation, don't use. Instead, use _admin_.
- **advertised route priority**: OK to also use _base advertised route priority_ when discussing region-to-region costs. Don't shorten or use variations of these terms.
- **agnostic**: Don't use. Instead, use a more precise term like _platform-independent_.
- **AI**: In general, you can use _AI_ without spelling out _artificial intelligence_. If you think your audience isn't familiar with the term, spell it out on first use.
- **aka**: Don't use. Instead, write out _also known as_, or present an alternative term using parentheses or the word _or_, or write out a definition. Recommended: Geographic data, also known as geospatial data, is ... Recommended: Geographic data (geospatial data) is ... Recommended: Geographic data, or geospatial data, is ...
- **all apps screen**: In Android documentation: lowercase except at the beginning of a sentence, heading, or list item.
- **allowlist (verb), allowlisted, allowlisting**: Don't use as a verb. Instead, rewrite to improve clarity. OK to use _allowlist_ as a noun. See _blacklist_.
- **allows you to**: Don't use. Instead, use _lets you_. See _enable_.
- **alpha**: Lowercase except when part of a product name. Recommended: `PRODUCT_NAME` Alpha. Recommended: `PRODUCT_NAME` is in alpha.
- **America, American**: Use only to refer to the _Americas_ or the _American continent_. Don't use to refer to the United States. Instead, use a more precise term like _the US_ or _the United States_, and _people in the US_. See _US_.
- **among**: See _between versus among_.
- **AM, PM**: To be consistent with Material Design (https://material.io/design/communication/data-formats.html#date-and-time), use all caps, no periods, and a space before. Recommended: 9:00 AM. Recommended: 10:30 PM.
- **and/or**: Don't use unless space is limited, such as in a table. See https://developers.google.com/style/slashes#and-or.
- **Android**: When referring to the operating system, capitalize _Android_.
- **Android-powered device**: Not _Android device_.
- **and so on**: Avoid whenever possible. See _etc._
- **anti\***: See guidance about hyphens with prefixes (https://developers.google.com/style/hyphens#prefixes).
- **anti-pattern**: Avoid, particularly as a standalone heading. Instead, consider a more specific and broadly understood term. Recommended: Avoid these five SQL errors. Recommended: Avoid these five programming practices that make SQL queries inefficient. Not recommended: Avoid these five SQL anti-patterns.
- **API**: Use _API_ to refer to either a web API or a language-specific API. Don't use _API_ when referring to a method or a class. For example, don't write _This resource has one API_ to mean "This resource has one method."
- **API Console, APIs console, developer console, dev console, or Google API Console**: Don't use. Instead, refer to the _Google APIs Explorer_ or to the _Google Cloud console_. See _console_.
- **API Console key**: In most contexts, use _API key_ instead of _API Console key_. In Apps admin APIs, it's OK to use _API Console key_ to distinguish from other API keys.
- **API key**: Not _developer key_ or _dev key_.
- **APIs Explorer**: Not _API explorer_ or other variants.
- **app**: In general, use _app_ instead of _application_ when referring to programs for end users, especially in the context of mobile or web software. In some contexts, such as enterprise software, it's OK to use _application_ to convey a sense of greater complexity. Use _application_ in standard phrases such as _application programming interface_.
- **app bar**: In Android contexts, formerly _action bar_.
- **appendix**: Use the plural _appendixes_, not _appendices_.
- **application**: See _app_.
- **as**: If you mean _because_, then use _because_ instead of _as_. _As_ is ambiguous; it can refer to the passage of time. _Because_ refers to causation or the reason for something.
- **as of this writing**: Avoid because this phrase is implied. It can also prematurely disclose product or feature strategy or inappropriately imply that a product or feature might change. See also _currently_ and _presently_. Recommended: BigQuery doesn't support that function. Not recommended: As of this writing, BigQuery doesn't support that function. See https://developers.google.com/style/timeless-documentation.
- **authentication and authorization**: In general, use _authenticated_ only to refer to users, and _authorized_ only to refer to requests that are sent by a client app on behalf of an authenticated user. A user _authenticates_ their identity by entering their password (or other proof of identity). The _authenticated user_ then _authorizes_ the client app to send an _authorized request_ to the server on the user's behalf. When you want to use a preposition with _authenticate_, use _against_.
- **authN, authZ**: Don't use. Instead, use _authentication_ or _authorization_.
- **auto\***: See guidance about hyphens with prefixes (https://developers.google.com/style/hyphens#prefixes).
- **autohealing**: Not _auto-healing_.
- **auto mode VPC network**: Not _auto mode network_.
- **autopopulate**: Not _auto populate_ or _auto-populate_.
- **autoscaling**: Not _auto-scaling_.
- **autotagging**: Not _auto-tagging_.
- **autoupdate**: Don't use. Instead, use _automatically update_.
- **-aware**: Avoid using as a compound modifier, as in _healthcare-aware_. OK when it's part of a product name, such as _Identity-Aware Proxy_.

## B

- **backend**: Not _back-end_ or _back end_.
- **bar**: Avoid when possible. See _foo_.
- **bare metal**: Lowercase except at the beginning of a sentence, heading, or list item. Hyphenate when used as a compound modifier, such as _bare-metal server_.
- **base64**: Lowercase except at the beginning of a sentence, heading, or list item. Otherwise, capitalize _Base64_ only if it's part of a formal name. Write `base64` in code font _only_ if it's a string literal or otherwise quoted from code.
- **baz**: Avoid when possible. See _foo_.
- **below**: Don't use for a range of version numbers; use _earlier_. Don't use to refer to a position in a document; use _later_ or _following_. Don't use to refer to a position in the UI; write instructions that avoid directional language (https://developers.google.com/style/accessibility). OK in set phrases such as _below (the) average_, _below the mean_, _below zero_. OK in a non-directional way, such as when describing a hierarchy.
- **best effort**: Avoid where possible. Instead, use more specific wording. After providing a description, you can add a phrase like "sometimes referred to as _best effort_."
- **beta**: Lowercase except when part of a product name. Recommended: `PRODUCT_NAME` Beta. Recommended: `PRODUCT_NAME` is currently in beta.
- **between versus among**: It's fine to use _between_ for more than two things, but _between_ isn't interchangeable with _among_. Use _between_ for two or more distinct things. Recommended: JavaScript introduces dependencies between the DOM, the CSSOM, and JavaScript execution. Use _among_ for things that are part of a group or that aren't distinct. Recommended: ... a conventional SQL database that can be shared among multiple apps. Recommended: Because screen dimensions vary widely among devices (for example, between phones and tablets, and even among different phones), you should configure the viewport ... Not recommended: Because screen dimensions vary widely between devices (for example, between phones and tablets, and even between different phones) ... Recommended: You can share services among multiple clients. Not recommended: You can share services between multiple clients. See also [Grammar Girl's discussion of _between_ and _among_](http://www.quickanddirtytips.com/education/grammar/between-versus-among).
- **big-endian**: Hyphenate. Lowercase except at the beginning of a sentence, heading, or list item. Recommended: The codebase assumes big-endian byte ordering. Not recommended: Big Endian, Big-endian, big endian.
- **billing charges**: Don't use _billing charges_ to mean charges that appear on a bill; use _billed charges_. Use _billing charges_ to describe the cost of creating the bill.
- **black-box**: Avoid using _black-box_, _blackbox_, or _black box_ to describe monitoring and testing. Use a more precise term: for monitoring, _synthetic monitoring_; for testing, _opaque-box testing_.
- **Black Friday**: Avoid unless explicitly referring to an event in the US. Instead use _peak scale event_.
- **blackhat, black hat, black-hat**: Don't use. Instead, use precise terms for the kind of violation or practice, such as _illegal_, _unethical_, or _in violation of rules_.
- **blackhole (verb), blackholed (adjective)**: Don't use. Instead, use a more descriptive term or phrase, such as _dropped without notification_.
- **blacklist, black list, black-list**: Don't use _blacklist_, _whitelist_, and _graylist_. Instead, use more precise terms appropriate for your domain. For the noun _blacklist_, consider _denylist_, _excludelist_, or _blocklist_. For the noun _whitelist_, consider _allowlist_, _trustlist_, or _safelist_. For the noun _graylist_ (_greylist_), consider _provisional list_. Consider that there might not actually be a list involved; be technically accurate for the specific context. For verb forms, a word-for-word replacement typically isn't best; replace verbs such as _blacklisted_ with phrases that accurately convey the action. Recommended: To deny requests from an IP address, add it to the `dos.yaml` file. Not recommended: To denylist an IP address, add it to the `dos.yaml` file. Don't use: To blacklist an IP address, add it to the `dos.yaml` file. If the command or code you're documenting uses one of these words, use the words only in direct reference to the code items (formatted as code, https://developers.google.com/style/code-in-text), and make it clear what you're referring to. Recommended: Add a user to the allowlist (`whitelist`) by entering the following: `whitelist adduser EMAIL_ADDRESS`. Not recommended: Add a user to the whitelist by entering the following: `whitelist adduser EMAIL_ADDRESS`. See https://developers.google.com/style/inclusive-documentation.
- **blacklisted, black listed, black-listed**: Don't use. See _blacklist_.
- **blacklisting, black listing, black-listing**: Don't use. See _blacklist_.
- **blast radius**: Don't use. Instead, use a more precise term like _affected area_ or _spatial impact_.
- **blind**: Avoid _blind to_ or _blind eye to_; use more precise terms like _ignore_, _unaware of_, _disregard_, _avoid_, or _reject_. Avoid _blind writes_; use a more precise phrase, such as _a write operation without a read operation_. Avoid _blind change_ or _change blindly_; use a phrase such as _change without first confirming the value_. When referring to people, use terms like _person who is blind_, _screen reader user_ (if applicable), _person who is visually impaired_, _person who is low-vision_, _magnification user_ (if applicable).
- **blue-green**: Not _blue/green_ or _blue green_.
- **boolean**: In most contexts, _boolean_ refers to a specific data type in a specific programming language; use code font and the exact spelling and capitalization of the programming keyword. When referring to the abstract data type, use lowercase. For _Boolean mathematics_ or _Boolean logic_, use uppercase.
- **branding information**: In the Google Cloud console, the phrase refers to the information Google shows users when the client asks them to authorize access: the project's name and logo, and the developer's Google Account. This information is set in the **Consent screen** page.
- **break-glass**: Don't use. Instead, use a more precise term depending on context: for a general emergency or procedure that grants emergency access, _emergency access_; for a fallback procedure, _manual fallback_ or _preplanned procedure_.
- **brown bag, brown-bag**: Don't use. Instead, use a more precise term like _learning session_, _lunch and learn_, _lunchtime learning session_, _casual training_, or _informal training_.
- **build cop, build sheriff**: Don't use. Instead, use a more precise term like _build monitor_.
- **button**: In a UI, a link isn't the same as a button; don't use _button_ to refer to a link. Use _button_ for mechanical buttons (like volume control buttons on a phone) and capacitive touch buttons on a phone (like the Home button). You _press_ mechanical buttons, and _tap_ capacitive and on-screen buttons.

## C

- **can**: Use _can_ to convey permission or ability ("You can access the server"), to refer to an optional action ("You can also view logs with the Log Viewer"), or to describe a possible outcome ("The process can take 30 minutes"). See also _could_, _may_, _might_, _must_, _should_, and _would_. For clarifying who's performing an action, see https://developers.google.com/style/voice.
- **canary**: Don't use _canary_ as a verb, and don't use _canarying_. When possible, avoid jargon like _canary_ and _canary testing_. If you use one of these phrases, define it on first use or link to the definition, and use it consistently throughout the document.
- **cell phone, cellphone**: Don't use. Instead, use _mobile phone_, or if you're talking about more than phones, _mobile device_. OK to use _phone_ (without _mobile_) when the context is clear.
- **cellular data**: Don't use. Instead, use _mobile data_.
- **cellular network**: Don't use. Instead, use _mobile network_.
- **chapter**: When referring to documentation that isn't in the form of a book, don't use _chapter_. Instead, refer to documents, pages, or sections.
- **check**: Don't use to refer to marking a checkbox. Instead, use _select_. Recommended: Select **Automatically check for updates**. Not recommended: Check **Automatically check for updates**.
- **checkbox**: Not _check box_.
- **choose**: Fine for generic contexts. For UI elements, use _select_.
- **chubby**: Don't use. Instead, use a word that clearly explains what you mean, such as _unused_ or _overextended_.
- **clear**: Use (as a verb) to refer to clearing a check mark from a checkbox. Recommended: Clear **Automatically check for updates**. Not recommended: Uncheck **Automatically check for updates**. Not recommended: Deselect **Automatically check for updates**.
- **CLI**: Don't use _CLI_ generically to refer to a command-line interface. Instead, refer to the specific command-line interface, such as the Google Cloud CLI (see _`gcloud` CLI_).
- **click**: When the environment is a desktop with a mouse, use _click_ for most targets, such as buttons, links, list items, and radio buttons. Don't use _click on_. Recommended: Click **OK**. Not recommended: Click on **OK**. Hyphenate _right-click_, _left-click_, and _double-click_. When a click or tap reveals a collapsed list, you can write _click to expand_ or simply _expand_. OK to write _click in_ when referring to a region that needs focus (_click in the window_), but not for a control or a link. For Android apps, don't use _click_; use _tap_.
- **click here**: Don't use. See Avoid vague link text (https://developers.google.com/style/cross-references#vague-link-text).
- **clickthrough (noun), click through (verb)**: Use _clickthrough_ as the noun and _click through_ as the verb.
- **client**: In REST and RPC API documentation, _client_ is short for _client app_, the app that the developer is writing. Don't use _client_ as an abbreviation for _client library_; instead, use _library_.
- **client ID**: Lowercase except at the beginning of a sentence, heading, or list item.
- **client secret**: Lowercase except at the beginning of a sentence, heading, or list item.
- **Cloud**: In Google Cloud documentation, don't use as short for _Google Cloud_. For generic references such as _the cloud_ or _hybrid cloud_, use lowercase.
- **Cloud console**: In Google Cloud documentation, don't use. Instead, refer to the full name _Google Cloud console_. If you aren't discussing any other console (such as the Google Admin console), you can abbreviate to _the console_ after first mention. Use _the_ before the tool name. See _console_.
- **Cloud SDK**: Not _Google Cloud SDK_.
- **co\***: See guidance about hyphens with prefixes (https://developers.google.com/style/hyphens#prefixes).
- **codebase**: Not _code base_.
- **codelab**: Not _code lab_ or _code-lab_. See _documentation_.
- **cold**: When possible, avoid jargon like _cold failover_, _cold standby_, and _cold spare_. If you use one of these phrases, define it on first use and use it consistently throughout the document.
- **colocate**: Not _co-locate_ or _colo_.
- **compliant, compliance**: Use with caution. A claim that a product or its output is _compliant_ with a standard is a strong statement.
- **comprise**: Don't use. Instead, use _consist of_, _contain_, or _include_.
- **config**: Avoid when possible. Instead, spell out the full word when used in a non-code sense: _configuration_ or _configuring_. Use the verbatim code item name when referring to, for example, a data structure or a file with that name.
- **confidential**: _Confidential_ data is data that is protected to prevent unauthorized access. See _sensitive_.
- **cons**: Don't use. Instead, use a more precise term, such as _disadvantages_.
- **console**: Don't use in isolation. Instead, use the name of the specific console, such as the Google Cloud console (https://console.cloud.google.com/) or the Google Admin console. Use _the_ before the name of a console. After giving the full name, you can use a shortened version, such as the _Admin console_. If you're only discussing the Google Cloud console, after giving the full name you can refer to _the console_. To refer to a sub-page of a console, use _page_. If a specific term for a browser-based interface is unavailable, use _web interface_.
- **content type**: Be as specific as possible, and use the term only when applicable. For example, you can use it when referring to the value of the `Content-Type` HTTP header. See also _media type_.
- **Control+S, Command+S, and other keyboard commands**: To refer to a Control character, use Control+`CHARACTER`. Don't use _Ctl-S_, _Cmd-S_, or _Cloverleaf-S_. In most cases, use an uppercase letter for `CHARACTER`. In macOS, many keyboard commands use the Command key instead of Control, and Option instead of Alt. If your audience includes macOS users and Windows or Linux users, mention both. Recommended: Control+S (Command+S on macOS).
- **Copy and paste**: Avoid. Instead, explain what to enter into a field and not how. Recommended: In the **Query** field, enter the output from the previous step. Not recommended: Copy the output from the previous step and paste into the **Query** field.
- **could**: Avoid. Instead, use _can_ where possible. See also _can_, _may_, _might_, _must_, _should_, and _would_. See https://developers.google.com/style/voice and https://developers.google.com/style/tense.
- **CPU**: All caps. No need to expand the abbreviation on first mention.
- **crazy, bonkers, mad, lunatic, insane, loony**: Don't use. Instead, use _complicated_, _complex_, _baffling_, _strange_, or _unexpected_, and only for inanimate objects.
- **Create a new ...**: Avoid unless you need to distinguish the item from another recently created item. Instead, use _Create a ..._ Recommended: Create a project. Not recommended: Create a new project.
- **cripple**: Don't use. Instead, use more precise language; instead of _it crippled the server_, write _it slowed the server down_. When referring to people, use terms that specifically describe a physical impairment, such as _person with a motor disability_; _person with a mobility impairment_ (walking or moving about); _person with dexterity impairment_ (using a standard mouse or keyboard); _person who uses a wheelchair, walker, or cane_; _wheelchair user_; _person with restricted or limited mobility_.
- **cross-site request forgery**: Lowercase except at the beginning of a sentence, heading, or list item.
- **curated roles**: Don't use. Instead, use _predefined roles_.
- **currently**: Avoid because this word is implied. It can also prematurely disclose product or feature strategy or inappropriately imply that a product or feature might change. See also _as of this writing_ and _presently_. Recommended: Windows isn't supported. Not recommended: Windows isn't currently supported. See https://developers.google.com/style/timeless-documentation.
- **custom mode VPC network**: Not _custom mode network_.
- **curl**: Not _cURL_. For when to use code format, see https://developers.google.com/style/code-in-text#items-that-are-sometimes-in-code-font.
- **Cyber Monday**: Avoid unless explicitly referring to an event in the US. Instead use _peak scale event_.

## D

- **dash**: A dash (`—`) isn't the same character as a hyphen (`-`); they're used for different purposes. Don't use the word _dash_ to refer to a hyphen.
- **dashboard**: Don't use to refer to the Google Cloud console (see _console_). Use _dashboard_ not _Dashboard_ unless it's officially part of a product name.
- **data**: Use _data_ as singular, not plural: _the data is_, not _the data are_. Use as a mass noun, not a count noun: _less data_, not _fewer data_.
- **data center**: Not _datacenter_.
- **data center campus**: Use when referring to an entire physical location, which can encompass one or more data centers.
- **data cleaning**: Not _data cleansing_.
- **data flow (noun); dataflow (noun)**: If it's possible to replace with _flow of data_, use two words: _data flow_. If that doesn't work, such as for stream processing or reactive programming, use one word: _dataflow_.
- **data source**: Not _datasource_.
- **datastore**: Not _data store_.
- **data type**: Not _datatype_.
- **dead-letter queue, dead letter**: Define on first use, for example _dead-letter queue (unprocessed messages queue)_.
- **deep linking**: Not _deep-linking_. However, if you can replace with _linking_, do so.
- **deficient**: Don't use to refer to a person. OK to refer to a condition of a computer system.
- **deformed**: Don't use to refer to a person. OK to refer to a condition of a computer system or inanimate object.
- **demilitarized zone (DMZ)**: Don't use. Instead, use a more precise term like _perimeter network_.
- **denigrate**: Don't use. Instead, use _disparage_.
- **denylist (verb), denylisted, denylisting**: Don't use as a verb. Instead, rewrite to improve clarity. OK to use _denylist_ as a noun. See _blacklist_.
- **deprecate**: To _deprecate_ an item is to recommend against its use, typically as a warning that it will soon be unavailable or unsupported. Don't use _deprecated_ to mean _removed_, _deleted_, _shut down_, or _turned down_.
- **deselect**: Don't use to refer to clearing a check mark from a checkbox. Instead, use _clear_. Recommended: Clear **Automatically check for updates**. Not recommended: Deselect **Automatically check for updates**. Not recommended: Uncheck **Automatically check for updates**.
- **desire, desired**: Don't use. Instead, use a word like _want_ or _need_. Recommended: Set the value to the size that you want. Not recommended: Set the value to the size that you desire. Not recommended: Set the value to the desired size.
- **Developers Console**: Don't use. See _console_.
- **DevOps**: Short for _development operations_. No need to spell out on first mention unless the audience requires it. See https://wikipedia.org/wiki/DevOps.
- **dialog**: Use _dialog_ for the UI element sometimes called a dialog box. Use _dialogue_ only for verbal interaction between people.
- **directory, folder**: If the context you're documenting (such as an IDE's GUI) uses one term or the other, use that term. If not, use _directory_ in a command-line context and _folder_ in a GUI context. When in doubt, default to _directory_.
- **disable**: Don't use _disable_ or _disabled_ to describe something that's broken. When describing a user action or the state of a UI element, use a more precise term where possible: _inactive_, _unavailable_, _deactivate_, _turn off_, or _deselect_, depending on context. Use the same term consistently throughout your document. See also _enable_.
- **disclosure triangle, disclosure widget**: Don't use. Instead, use _expander arrow_.
- **display (verb)**: Don't use as an intransitive verb. _Display_ is transitive and requires an object. Recommended: The Output Directories area appears. Recommended: The Output Directories area is displayed. Not recommended: The Output Directories area displays. Correct transitive use (with a different meaning): The Output Directories area displays the vector image.
- **distributed denial-of-service (DDoS)**: Hyphenate as shown. On subsequent mention, use _DDoS_.
- **DNS server policy**: Lowercase _server policy_.
- **DNSKEY**: One word, all capital letters.
- **documentation or document or documents**: To refer specifically to the text on a page that explains a product, feature, or service, use _this document_, not _this article_, _this topic_, _this doc_, or _this page_. OK to use _this tutorial_, _this quickstart_, or _this codelab_ for those specific types. Always spell out _documentation_ except where space is limited, such as in tabs and URLs. See also _page_. Recommended: You can find many examples in this document. Not recommended: You can find many examples in this article. Recommended: This document provides guidance about creating tables. Not recommended: This page provides guidance about creating tables.
- **documentation set**: Not _doc set_ or _docset_.
- **does not yet**: Avoid in timeless documentation because this phrase can become outdated. It can also prematurely disclose product or feature strategy or imply that a product or feature might change. Recommended: The Google Cloud console doesn't support this IAM role. Not recommended: The Google Cloud console does not yet support this IAM role. See https://developers.google.com/style/timeless-documentation.
- **dojo**: Don't use. Instead, use a precise term that is accurate for the context, such as _training_ or _workshop_.
- **domain name registrar**: Lowercase except at the beginning of a sentence, heading, or list item.
- **Domain Name System Security Extensions (DNSSEC)**: Write out and capitalize each word on first use. OK to abbreviate as _DNSSEC_ after first use.
- **double-tap**: In Android documentation: hyphenate. Lowercase except at the beginning of a sentence, heading, or list item.
- **downscope**: Consider a more descriptive term like _constrain scope_ or _reduce scope_. Because _downscope_ might not be broadly understood, define it on first use if you use it. Don't use _down scope_ or _down-scope_. Recommended: Reducing the scope of a token helps you follow the principle of least privilege. Recommended (first use): The IAM recommender helps you _downscope_ (reduce) the permissions that are available to your users.
- **drag**: Use _drag_, not _click and drag_ and not _drag and drop_. OK to use _drag-and-drop_ as an adjective. Recommended: Drag the `USER` to the **Authorized** box.
- **drop-down**: In most cases, omit _drop-down_ from phrases like _drop-down list_ or _drop-down menu_, and just use _list_ or _menu_. Include _drop-down_ as a modifier only if omission would cause ambiguity. Don't use _drop-down_ as a standalone noun.
- **dumb down**: Don't use. Instead, use a word or phrase that describes what's happening, such as _simplify_ or _remove technical jargon_.
- **dummy variable**: Don't use to refer to placeholders; use _placeholder_. Also don't use for the statistics concept (https://en.wikipedia.org/wiki/Dummy_variable_(statistics)); use alternates such as _indicator variable_, _design variable_, _one-hot encoding_, _Boolean indicator_, _binary variable_, or _qualitative variable_.

## E

- **each**: _Each_ refers to every individual item taken individually, not to a group taken collectively; it isn't a synonym for _all_. _A list of each item_ is ambiguous; _a list of all the items_ or _a list of the items_ is generally clearer.
- **earlier**: Use for a range of version numbers, not _lower_. Recommended: Use version 2.2 or earlier. Not recommended: Use version 2.2 or lower. In Android documentation, don't use _earlier_ for a range of version numbers; use _lower_. When referring to a position in a document, use _earlier_ or _preceding_, not _higher_.
- **easy, easily**: What might be easy for you might not be easy for others. Try eliminating the word; usually the same meaning can be conveyed without it.
- **ecommerce**: Not _e-commerce_.
- **edge availability domain**: Don't use _edge availability zone_, _metro availability domain_, or _metro availability zone_. Don't shorten to _EAD_.
- **e.g.**: Don't use. Instead, use phrases like _for example_ or _such as_. Many people confuse _e.g._ and _i.e._
- **egress**: When referring to the networking term, use lowercase.
- **either**: When using _either_, use parallel syntax. Recommended: Do either option 1 or option 2. Recommended: Either do option 1 or do option 2. Not recommended: Either do option 1 or option 2. In general, use _either_ only for a choice between two things. _Either A or B or C_ will distract some readers, but if it's the best phrasing for your situation, use it.
- **element**: In HTML and XML, a tag is a component of an element that indicates its start or end (the `<i>` start tag begins the `<i>example</i>` element). In general, don't use _tag_ to refer to an entire element.
- **email**: Not _e-mail_, _Email_, or _E-mail_. Don't use as a verb. Use a specific verb in front of the word, for example _send email_; this is better for translation and a global audience (https://developers.google.com/style/translation).
- **emoji**: Use _emoji_ for both singular and plural forms. See [Don't know the difference between emoji and emoticons? Let me explain](https://www.theguardian.com/technology/2015/feb/06/difference-between-emoji-and-emoticons-explained) and [What's the Plural of Emoji?](http://www.theatlantic.com/technology/archive/2016/01/whats-the-plural-of-emoji-emojis/422763/)
- **enable**: In procedures, use the appropriate label and action for the UI element the user interacts with (https://developers.google.com/style/ui-elements). When describing a user action or the state of a UI element, use a more precise term where possible. OK to use _enable_ when not referring to a person. For turning on or activating an option or feature, use _enable_ or _turn on_ consistently: the same term in introductory text as in the procedure, and the same term throughout the document unless the UI elements differ between procedures. Recommended: To enable the API, click the toggle. Recommended: Enable the API for your project. For making it feasible to do something, use _lets you_. Recommended: The API lets you detect features in images. Not recommended: The API enables you to detect features in images. Not recommended: The API allows you to detect features in images. In Google Workspace documentation, if possible, use _turn on_ or _on_ instead; if referring to the state of a UI element, use _available_.
- **endpoint**: Not _end point_.
- **enter**: Use _enter_ to refer to the user entering text. If it's important to not press Enter, explicitly say so. See also _type_. Recommended: In the **Owner** box, enter your name. Recommended: In the **Size** box, type a font size.
- **ephemeral external IP address**: Don't use _ephemeral IP address_ or _external IP address_ to refer to ephemeral external IP addresses.
- **error-prone (adjective)**: Hyphenate. Lowercase except at the beginning of a sentence, heading, or list item.
- **etc.**: Avoid _etc._, _and so forth_, and _and so on_ wherever possible. If you really need one, use _etc._ Always include the period, even if a comma follows immediately after. Recommended: Your app might experience problems such as instability or high latency. Recommended: Your app might experience problems, including instability or high latency. Not recommended: Your app might experience instability, high latency, and so on. Not recommended: Your app might experience instability, high latency, etc. Not recommended: If your app experiences instability, high latency, etc., follow these steps:
- **eventually**: Avoid in timeless documentation because this word can become outdated. It can also prematurely disclose product or feature strategy or imply that a product or feature might change. See also _future_ and _soon_. Recommended: This version of the SDK is deprecated. Not recommended: This version of the SDK is deprecated and eventually will be no longer supported. See https://developers.google.com/style/timeless-documentation.
- **execute**: Commonly used for function calls, SQL queries, and other processes. When the meaning is the same, use the simpler word _run_ instead. If you need a more precise term for your context, use that term.
- **expander arrow**: The UI element used to expand or collapse a section of navigation or content. Use the terms _expander arrow_ and _expandable section_. Don't use terms like _expando_ or _zippy_.
- **exploit**: Don't use _exploit_ to mean "use." Only use it in the negative sense, such as _exploiting a security vulnerability_.
- **external VPN gateway**: Write _external_ and _gateway_ all lowercase except at the beginning of a sentence, heading, or list item.
- **extract**: Use instead of _unarchive_, _uncompress_, _untar_, or _unzip_.

## F

- **fail over (verb), failover (noun, adjective)**: Use _fail over_ as the verb and _failover_ as the noun or adjective.
- **fat**: Don't use. Instead, use a precise modifier that conveys the appropriate meaning: _high-capacity network connection_ instead of _fat connection_, _full-featured client_ instead of _fat client_. Instead of a negative sense such as _trim the fat_, refer concretely to the _removal of unused items_. OK as the acronym for file allocation table (FAT).
- **female adapter**: Don't use. Instead, use a genderless word like _socket_.
- **Fast Healthcare Interoperability Resources (FHIR)**: Refer to _a FHIR_ (pronounced "a fire," as in "a FHIR store"), not _an FHIR_. See https://developers.google.com/style/abbreviations#articles.
- **filename**: Not _file name_.
- **file system**: Not _filesystem_.
- **fill in; fill out**: Use _fill in_ when referring to entering information in individual fields. Use _fill out_ when referring to completing an entire form. Recommended: Fill out the questionnaire. Be sure to fill in the required fields.
- **final solution**: Don't use. Instead, use _solution_ as a standalone term or, depending on context, _definitive_, _optimal_, _best_, or _last solution_.
- **fintech**: Write out on first mention: _financial technology (fintech)_. Don't use _FinTech_ or _fin-tech_.
- **firewalls**: Don't use in Compute Engine or networking documentation; use _firewall rules_. Exception: when explaining how firewall rules work, you can explain that every network has an implied virtual distributed firewall. Outside Compute Engine or networking documentation, _firewalls_ is acceptable.
- **first class, first-class, first-class citizen**: Don't use. Instead, use another term appropriate for the context, such as _higher-order_, _anonymous_, or _nested_, or loosely describe the specific characteristics or features of the entity, resource, language, or framework. Recommended: These widgets have full access to the event system and lifecycle hooks. Not recommended: The widgets are first-class components in the UI framework. Recommended: Virtual machines are higher-order resources that can participate in resource groups and are integrated in a variety of identity, networking, and storage services. Not recommended: Virtual machines are treated as first-class resources across the identity, networking, and storage services. See https://developers.google.com/style/inclusive-documentation.
- **following**: It's not necessary to use a noun after _following_ unless it helps provide clarity and enables accessibility (see https://developers.google.com/style/tables#table-placement). Recommended: ... in the following code sample ... Recommended: ... in the following table ... Recommended: ... do the following: ...
- **foo**: Avoid when possible even though it's common in the developer community. Instead, use a clearer and more meaningful placeholder name.
- **for example**: When introducing an example with _for example_, follow the phrase with a comma. For clarity, separate the example from the rest of the sentence using dashes, commas, or parentheses as appropriate, or introduce the example in a separate sentence. Recommended: Enter a name for the instance—for example, `my-instance-99`. Recommended: Enter a six-digit hex number (for example, `228B22`), and then click **OK**. Recommended: Enter a six-digit hex number, and then click **OK**. For example, if you want the color forest green, enter `228B22`. See https://developers.google.com/style/format-examples.
- **for instance**: Don't use to introduce examples, to avoid confusion with the noun _instance_. Instead, use _for example_, _like_, or _such as_. See _for example_.
- **frontend**: Not _front-end_ or _front end_.
- **functionality**: Use with caution. For hardware or software, _functionality_ refers to a set of associated functions or capabilities and how they work. The word is sometimes overused, especially when the intended meaning is _capabilities_ or _features_.
- **future, in the future**: Avoid in timeless documentation because this word or phrase can become outdated. See also _eventually_ and _soon_. See https://developers.google.com/style/timeless-documentation.

## G

- **GBps**: Short for _gigabytes per second_. By convention, don't use _GB/s_. See https://developers.google.com/style/units-of-measure.
- **Gbps**: Short for _gigabits per second_. By convention, don't use _Gb/s_. See https://developers.google.com/style/units-of-measure.
- **`gcloud` CLI**: In Google Cloud documentation, use the full name _Google Cloud CLI_ the first time you mention the product on a page.
- **gender-neutral he, him, or his (or she or her)**: Don't use. Instead, use the singular _they_ (see [Jane Austen and other famous authors violate what everyone learned in their English class](http://www.pemberley.com/janeinfo/austheir.html)). Don't use _he/she_ or _(s)he_ or other punctuational approaches. See https://developers.google.com/style/pronouns.
- **generative AI**: Spell out _generative_. Use sentence case. Don't use _gen AI_ or _Gen AI_. Don't hyphenate _generative AI_ as an adjective unless you must for clarity. See also _AI_.
- **ghetto**: Don't use. Instead use more precise terms like _clumsy_, _workaround_, or _inelegant_ to refer to code that isn't in a production-ready state.
- **gimp, gimpy**: Don't use. Instead, use precise, non-figurative language to refer to a deficiency in a component. OK in reference to companies, tools, software packages, and other entities that use the term in their names.
- **GKE node**: Use when first introducing GKE nodes on a page; for subsequent mentions, you can use _node_. A GKE node is a worker machine that runs containerized applications and other workloads; it is a Compute Engine VM that GKE creates during cluster creation. See also _virtual machine (VM) instance_.
- **Google, Googling**: Don't use as a verb or gerund. Instead, use _search with Google_.
- **Google Account, Google Accounts**: Capitalize _Account_.
- **Google API Client Library for `LANGUAGE` (Java, .NET, etc.)**: On second and subsequent use, you can abbreviate to _`LANGUAGE` client library_.
- **Google API Console, Google APIs Console**: Don't use. See _console_.
- **Google Cloud**: Not _GCP_, _Cloud Platform_, or _Cloud_.
- **Google Cloud console**: If you're only discussing the Google Cloud console, it's OK to shorten to _the console_ after first use on a page. Use _the_ before the console name. See _console_.
- **Google Cloud project ID**: Not _Cloud project ID_ or _GCP project ID_. You can also shorten to _project ID_, but that term is ambiguous in some contexts.
- **Google Developers Console**: Don't use. See _console_.
- **Google I/O**: Not _I-O_ or _IO_.
- **Google Play services**: Write _services_ in lowercase.
- **Google Play services SDK**: Write _services_ in lowercase.
- **grandfather clause, grand-father clause, grand father clause**: Don't use. See _grandfathered_.
- **grandfathered**: Don't use to refer to something allowed to violate a rule because it predates the rule. Instead, use an adjective like _legacy_ or _exempt_ or a verb like _made an exception_. Recommended: The app is exempt because it was released before the new requirements were announced. Not recommended: The app is grandfathered in because it was released before the new requirements were announced.
- **gray-box, grey-box**: Avoid _gray-box_, _graybox_, or _gray box_ to describe testing. To refer to testing that combines clear and opaque testing methods, describe exactly what it's doing. If you need to refer to it after describing it, consider a more precise term such as _translucent-box testing_.
- **grayed-out, greyed-out, gray out, grey out**: Don't use. Instead, use _unavailable_.
- **grayhat, greyhat, gray hat, grey hat**: Don't use. Follow the guidance for _blackhat_ when referring to someone violating rules or laws.
- **graylist, greylist, gray list, grey list, gray-list, grey-list**: Don't use. See _blacklist_.
- **graylisted, greylisted, gray listed, grey listed, gray-listed, grey-listed**: Don't use. See _blacklist_.
- **graylisting, greylisting, gray listing, grey listing, gray-listing, grey-listing**: Don't use. See _blacklist_.
- **`gsutil`**: In the Google Cloud context, use code font for both the name of the command-line utility and the command.
- **guru**: If possible, use a more precise term. If you mean _expert_ or _teacher_, use those terms.
- **guys, you guys**: When referring to a group of people, use non-gendered language, such as _everyone_ or _folks_.
- **gypsy**: Don't use. To refer to the people, use _Romani_, _Roma_, or _Traveller_, as appropriate for the specific group. In place of metaphorical uses, use more precise phrases.

## H

- **hamburger, hamburger menu**: Don't use. Instead use the `aria-label` for that particular icon, for example **Menu** (with the menu icon). See https://developers.google.com/style/ui-elements#buttons.
- **hands off, hands-off**: Use a less figurative phrase, such as _automated_. If referring to a group that doesn't do anything during a process, write a description.
- **hands on, hands-on**: Use a less figurative phrase, such as _customizable_, or write a description of the activity.
- **hang, hung**: Don't use to refer to a computer or system that is not responding. Instead, use _stop responding_ or _not responding_. See https://developers.google.com/style/inclusive-documentation#figurative-language.
- **happiness and satisfaction**: Use _happiness_ for a customer's perception of a site's reliability. Use _satisfaction_ for whether the site meets the customer's needs. Site reliability engineering (SRE) content generally measures _customer happiness_, not _customer satisfaction_; the phrases aren't equivalent. The distinction is between satisfying a need (a dispassionate act) and establishing an emotional response. SRE uses service level indicators (SLIs) to quantify user perception: a customer's need to watch a show is satisfied if it's available, but if playback is slow or choppy, the customer might not be happy. See [The Happiness Test](https://www.coursera.org/lecture/site-reliability-engineering-slos/the-happiness-test-ELmSr).
- **hardcode (verb), hardcoded (adjective)**: Don't hyphenate.
- **he, him, his**: Don't use a gendered pronoun except for a specific individual of known gender. Use _they_ and _their_ for the general singular pronoun.
- **healthcare**: Not _health care_ or _health-care_.
- **health check**: Use with caution. For an action taken for a computer system, only use _health check_ if that term appears in the interface. Remove any ambiguity about whether the term refers to health in the medical sense. Use detailed, non-figurative language as much as possible, such as a node _being responsive_ instead of being healthy.
- **healthy**: Don't use. See _health check_.
- **high availability (noun), high-availability (adjective)**: Spell as _high availability_ as a noun and _high-availability_ as an adjective. See also _load balancing (noun), load-balancing (adjective)_. Lowercase except when part of a product name, but OK to abbreviate as _HA_ after first use.
- **higher**: Don't use for a range of version numbers; use _later_. Don't use to refer to a position in a document; use _earlier_ or _preceding_. Don't use to refer to a position in the UI; write instructions that avoid directional language (https://developers.google.com/style/accessibility). In Android documentation, use _higher_ for a range of version numbers, not _later_. A release with the highest version number might not be the latest version: if version 2.0 receives a bug-fix update after version 3.0 is released, version 2.0.1 might be the latest, even though its number is lower than 3.0.
- **high performance computing (HPC)**: Don't hyphenate. Lowercase except at the beginning of a sentence, heading, or list item.
- **hit**: Don't use as a synonym for _click_, _press_, or _type_.
- **hold the pointer over**: Only use this verb phrase when the user needs to hold their mouse over a UI element without clicking it, waiting for the UI to react (for example, for a tooltip or submenu to open), or when the duration of time is important. The phrase _point to_ is more common. See also _point to_. Recommended: In the **Admin** menu, hold the pointer over **File**, and then click **New**. Not recommended: In the **Admin** menu, hover over **File**, and then click **New**.
- **holiday, the holidays**: Don't use to refer to the end of the year. Instead, refer to specific quarters or months.
- **home screen**: Two words in Android contexts; not _homescreen_ or _home-screen_.
- **hostname**: Not _host name_.
- **hot**: When possible, avoid jargon like _hot failover_, _hot standby_, and _hot spare_. If you use one of these phrases, define it on first use and use it consistently throughout the document. However, see _hotspot_.
- **hotspot**: In databases, _hotspots_ occur when a small number of nearby rows are accessed frequently in a short period, causing CPU spikes and affecting performance. Use _hotspot_ and _hotspots_ as nouns. Don't use verb and gerund forms such as _hotspotting_, because they translate less consistently. Define it on first use on a page as with jargon. Recommended: Hotspots in one table can affect the performance of other tables. Not recommended: Hotspotting in one table can affect the performance of other tables.
- **housekeeping, house keeping, house-keeping**: Don't use. Instead, use less figurative and more precise terms, such as _maintenance_ and _cleanup_.
- **hover**: Don't use. Instead use _hold the pointer over_.
- **HTTPS**: Not _HTTPs_.

## I

- **IaaS**: Write out on first mention: _infrastructure as a service (IaaS)_.
- **IAM**: When referring to the Google Cloud product, spell it out on first use: _Identity and Access Management (IAM)_. When referring to UI text, write it the way it's written in the UI. When referring to the general practice, spell it out in lowercase on first use and include a parenthetical comment. Recommended: Identity and access management (generally referred to as _IAM_) is the practice of granting the right individuals access to the right resources for the right reasons.
- **ID**: Not _Id_ or _id_, except in string literals or enums. In some contexts, it's best to spell out as _identifier_ or _identification_.
- **i.e.**: Don't use. Instead, use phrases like _that is_. Many people confuse _e.g._ and _i.e._
- **if**: For _if_ versus _whether_, see _whether_. Although casual usage often omits _then_ in _if...then_ statements, include helper words like _then_ in technical documentation. See https://developers.google.com/style/translation#clear-language.
- **image**: _Image_ by itself doesn't localize well because of its many meanings. Consider adding context, for example _disk image_ or _container image_.
- **impact**: Use only as a noun. Instead of writing that something _has an impact_, use _affect_. Recommended: This issue affects user experience. Acceptable: This issue has an impact on user experience. Not recommended: This issue impacts user experience.
- **index**: Use the plural _indexes_ unless there is a domain-specific reason (for example, a mathematical or financial context) to use _indices_.
- **ingest**: Use _import_, _load_, or _copy_ for simple movement of data. Use _ingest_ only for operations that also involve significant processing of the data.
- **ingress**: When referring to the networking term, use lowercase. When referring to the GKE term or API, capitalize _Ingress_.
- **in order to**: Avoid; use _to_. Use _in order to_ when needed to clarify meaning or make something easier to read. Recommended: You can use monitoring to help identify issues. Not recommended: You can use monitoring in order to help identify issues. Recommended: The infrastructure is required in order to support search. Not recommended: The infrastructure is required to support search.
- **inline**: One word as an adjective, _inline_, not _in line_ or _in-line_.
- **instance group**: Don't abbreviate to _IG_. See also _managed instance group_.
- **intercluster**: Use unhyphenated _intercluster_, not _inter-cluster_.
- **interconnectAttachment**: Use when referring to the API. Otherwise, use _VLAN attachment_.
- **Interconnect connection**: Only use relative to a product: _CDN Interconnect connection_, _Cloud Interconnect connection_, _Dedicated Interconnect connection_, _Partner Interconnect connection_. OK to use _connection_ on subsequent mentions. When referring to a Google Cloud product, always specify the product name. Don't use _Interconnect_ or _interconnect_ as standalone terms, and don't use generic terms like _cloud interconnect connection_ or _cross-connect_.
- **Interconnect connection location**: Only refer to it in the context of a specific product, for example _CDN Interconnect_. OK to also use _colocation facility_.
- **interconnect type**: Don't use. Instead, use _connection type_. Examples: a _dedicated connection_ or a _connection provided by a service provider_.
- **interface**: OK to use as a noun. Don't use as a verb. Instead, use _interact_, _talk_, _speak_, _communicate_, or similar terms.
- **internal DNS**: Write _internal_ all lowercase except at the beginning of a sentence, heading, or list item.
- **Internationalized Domain Name (IDN)**: Write out and capitalize each word on first use. OK to abbreviate as _IDN_ after first use.
- **internet**: Lowercase except at the beginning of a sentence, heading, or list item.
- **Internet Key Exchange (IKE)**: Write out and capitalize each word on first use. OK to abbreviate _IKE_ after first use.
- **I/O**: Not _I-O_ or _IO_. See also _Google I/O_.
- **IoT**: OK to use as an abbreviation for _Internet of Things_. Note the lowercase _o_.
- **IPsec**: Not _IPSec_ or _IPSEC_. Short for _Internet Protocol Security_. No need to spell out on first mention.

## J

- **jank, janky**: Use only to refer to a glitch or problem with graphics caused by a loss of data or inadequate refresh rate. Don't use otherwise. Use a less figurative term to refer to something of poor or unreliable quality.
- **just**: Avoid. Usually a filler word you can delete without affecting meaning. Recommended: BigQuery skips the row. Not recommended: BigQuery just skips the row. If your meaning is unclear without _just_, use a more specific term such as _only_, _instead_, or _previously_, or revise to be more specific (often you don't need the replacement either). Recommended: You can run DML statements in the same way that you'd run a `SELECT` statement. Not recommended: You can run DML statements just as you'd run a `SELECT` statement. Recommended: Let a user query only the table without full dataset access. Recommended: Let a user query the table without full dataset access. Not recommended: Let a user query just the table without full dataset access. Sometimes _just_ is useful for conveying that one approach is simpler than another; in those cases, use _just_ instead of _simply_. Recommended: Use the namespace ID `namespace:example-kind` or just `example-kind`.

## K

- **k8s**: Don't use. Instead, use _Kubernetes_.
- **KBps**: Short for _kilobytes per second_. By convention, don't use _KB/s_. See https://developers.google.com/style/units-of-measure.
- **Kbps**: Short for _kilobits per second_. By convention, don't use _Kb/s_. See https://developers.google.com/style/units-of-measure.
- **kebab, kabob, kebab menu, kabob menu**: Don't use. Instead use the `aria-label` for that particular icon, for example **More** (with the more_vert icon). See https://developers.google.com/style/ui-elements#buttons.
- **kebab case, kabob case, kebab-case, kabob-case**: Don't use. Instead, use _dash-case_.
- **key**: Don't use as an adjective in the sense of _crucial_ or _important_. If you use _key_ as a noun, specify which kind of key on first mention, because there are many kinds of keys in technical contexts.
- **key pair**: A pair of keys, such as a public key and a private key. Contrast with _key-value pair_, which is a pairing that specifies a value for a variable (as in configuration files).
- **key ring**: Use instead of _keyring_ (without the space) when referring to a grouping of Cloud KMS keys.
- **key-value pair**: Use instead of _key/value pair_ or _key value pair_.
- **kill**: Avoid when possible. Instead, use words like _stop_, _exit_, _cancel_, or _end_. For exceptions, see https://developers.google.com/style/code-syntax#linux-signals.

## L

- **lame**: Don't use. Instead, use precise, non-figurative language to refer to a deficiency in a component.
- **later**: Use for a range of version numbers, not _higher_. Recommended: Use version 2.2 or later. Not recommended: Use version 2.2 or higher. Not recommended: Use version 2.2+. A release with the highest version number might not be the latest version: if version 2.0 receives a bug-fix update after version 3.0 is released, version 2.0.1 might be the latest, even though its number is lower than 3.0. In Android documentation, don't use _later_ for a range of version numbers; use _higher_. When referring to a position in a document, use _later_ or _following_, not _below_.
- **latest**: Avoid in timeless documentation because this word can become outdated. If you must use _latest_, give the reader a reference point, for example a version number or release date. Recommended: To help keep your system secure, install the latest version of the tools. Recommended: The June 2021 release includes the latest tools that help secure your system. Not recommended: The product includes the latest tools that help secure your system. See https://developers.google.com/style/timeless-documentation.
- **learnings**: Don't use. Instead, refer to _knowledge_ or _things that you learned_.
- **left-nav, right-nav**: Don't use directional language (https://developers.google.com/style/accessibility). If referring to applications, use _navigation menu_ (https://developers.google.com/style/ui-elements#term-navigation-menu). If referring to navigational elements for documentation, use _content navigation menu_.
- **legacy**: If possible, use a more precise term. If you do use _legacy_, include or point to a definition to clarify what you mean in the current context. Don't use _legacy_ with any pejorative connotation.
- **let's (as a contraction of _let us_)**: Don't use if at all possible. Not recommended: Let's click the **OK** button now.
- **Letter of Authorization and Connecting Facility Assignment (LOA-CFA)**: Write out and capitalize each word on first use. OK to abbreviate as _LOA-CFA_ after first use.
- **leverage**: Avoid if you mean _use_. If possible, use a more precise term, for example _use_, _build on_, or _take advantage of_.
- **lifecycle**: Not _life cycle_ or _life-cycle_.
- **lift and shift**: See _rehost_.
- **like**: OK to use _like_ for either drawing comparisons (_similar to_) or introducing examples (_such as_). Recommended: Common I/O operations, like reading files or making network requests, can be asynchronous. Recommended: The new compression algorithm works like a dictionary encoder, replacing repeated strings with shorter codes. See also _such as_ and https://developers.google.com/style/format-examples.
- **limits**: In an API context, _limit_ often refers to usage limits (queries allowed per second or per day). Where possible, specify the kind of limit, such as _usage limit_ or _service limit_; _limit_ can refer to many kinds of limits, including rules about acceptable use. See also _quota_.
- **lint**: Write both the command-line tool name and the command in lowercase. Use code font except where inappropriate.
- **little-endian**: Hyphenate. Lowercase except at the beginning of a sentence, heading, or list item. Recommended: The codebase assumes little-endian byte ordering. Not recommended: Little Endian, Little-endian, little endian.
- **livestream**: Not _live stream_.
- **load balancing (noun), load-balancing (adjective)**: Spell as _load balancing_ as a noun and _load-balancing_ as an adjective. See also _high availability (noun), high-availability (adjective)_.
- **lock screen**: Two words in Android contexts; not _lockscreen_ or _lock-screen_.
- **login (noun or adjective), log in (verb)**: For the verb form, _sign in_ is generally better. If you're documenting a tool that uses the term _log in_, use that term.
- **long press**: In Android documentation, don't use. Instead, use _touch & hold_. (Not _touch and hold_.)
- **long-running operation**: Not _long running operation_. OK to abbreviate as _LRO_ after first use.
- **lower**: Don't use for a range of version numbers; use _earlier_. Don't use to refer to a position in a document; use _later_ or _following_. Don't use to refer to a position in the UI; write instructions that avoid directional language (https://developers.google.com/style/accessibility). In Android documentation, use _lower_ for a range of version numbers, not _earlier_.

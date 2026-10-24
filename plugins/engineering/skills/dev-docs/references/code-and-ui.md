# Computer interfaces: code, commands, placeholders, and UI

<!-- markdownlint-disable MD014 -->

These rules are distilled from the Google developer documentation style guide pages on code in text, code samples, command-line syntax, placeholders, UI elements, and API reference comments.
Source pages are linked per section; content adapted under CC BY 4.0.

## Code in text

Source: https://developers.google.com/style/code-in-text

In ordinary text sentences (as opposed to code samples), use code font to mark up most things that have anything to do with code. Code font clarifies which text refers to an entity:

- Signals that the text is meant to be entered verbatim.
- Shows where the boundaries of the text to enter are.
- Separates the entity from surrounding text.

To mark text as code font: in HTML, use the `code` element; in Markdown, use backticks. For choosing between them, see [Markdown versus HTML](https://developers.google.com/style/markdown).

### Some specific items to put in code font

The following items should be in code font. The list is not exhaustive.

| Item | Recommended |
| --- | --- |
| Attribute names and values | The `imageURL` attribute contains the path for the image file that you can open in a browser—for example, `https://www.example.com/images/product.jpg`. You can create a VM instance using the `e2-highcpu-16` machine type in the `us-central1-a` region. |
| Class names | The `SnapshotDiskOperator` class includes the `generate_snapshot_name` method. |
| Command output | The output is similar to the following: `Found sysprep-specialize-script-ps1 in metadata.` `...` `Finished running specialize scripts.` |
| Command-line utility names, such as `gcloud`, `gsutil`, `kubectl`, and `bq` | You can use the `kubectl` tool to define a network policy. |
| Data types | Nested data is represented as a `STRUCT` type. |
| Database elements (such as row and column names) | The query extracts the `month`, `julianday`, and `dayofweek` values from the `datetime` and `timestamp` columns. |
| Defined (constant) values for an element or attribute | The constant `city` has the value `"San Francisco"`. |
| [DNS record types](https://wikipedia.org/wiki/List_of_DNS_record_types) | Create a DNS `AAAA` record in your public DNS zone that points to the IP address of the load balancer. |
| Element names (HTML and XML) | The `script` and `df-messenger` HTML elements should be in the `body` element of your page. A C-CDA document contains a header and a body enclosed within a `ClinicalDocument` XML element. When you refer to an element name, don't put angle brackets (`<>`) around it. |
| Enum (enumerator) names | Generated from the protobuf enum `BOOL = 1;`. |
| Environment variable names | Set the `CHROME_REMOTE_DESKTOP_DEFAULT_DESKTOP_SIZES` environment variable to include the resolution of your monitor. |
| Filenames, [filename extensions](https://developers.google.com/style/filenames#file-type-names) (if used), and paths | Open the `pg_hba.conf` file, which is typically in the `/etc/postgresql/13/main` directory. |
| Folders and directories | The configuration information for the reader deployment is in the `opentsdb-read.yaml.tpl` file in the `deployments` folder of the guide repository. |
| [HTTP content-type](https://www.w3.org/Protocols/rfc1341/4_Content-Type.html) values | The value of the `Content-Type` header value is required and must be set to `application/fhir+json` as defined in the FHIR specification. |
| HTTP status codes | The HTTP `500 Internal Server Error` status code indicates that the server encountered an unexpected condition that prevented it from fulfilling the request. |
| HTTP verbs | To specify image content directly using a local image file, you can use a `POST` request. |
| IAM role names | Grant the new service account the `roles/cloudfunctions.invoker` IAM role for the `trace` function. |
| IP addresses | The other nodes of the cluster should contact this host on IP address `10.10.10.10`. |
| Language keywords | The SQL statement contains the dataset table name after the `FROM` keyword in the format of `PROJECT_NAME.DATASET.TABLE_NAME`. |
| Method and function names | The `ST_GEOPOINT` function uses the longitude and latitude of the Colosseum in Rome. To fetch the status of the job, call the `get_job_status` method. |
| Namespace aliases | Use Config Sync to apply the package only to the `default` namespace. |
| [Placeholder variables](https://developers.google.com/style/placeholders) | Replace `SUBNETWORK_NAME` with the resource ID of the private subnet that you want the blueprint to use. |
| Package names | The Beautiful Soup library for parsing web pages is distributed as the `beautifulsoup4` package. |
| Port numbers | Each member Pod must have a container that's listening on TCP port `50000`. |
| Query parameter names and values | If you want to return all contents under a directory, use the `recursive=true` query parameter with your request. |
| Strings (such as URLs or domain names) that are used in commands and code | In IAM, a condition can specify a page that only Human Resources admins can access—for example, `https://hr.example.com`. The `logID` field includes the domain `corpaudits.example.com`. |
| Text input | In the **Key name** field, enter `config-management`. |
| [UI elements](https://developers.google.com/style/ui-elements) that are rendered based on previously entered text (such as a server or instance name) | From the **Server name** list, select **`my-sql-cluster1`**. Click **`my-instance`**. If a code-formatted element appears in UI, add bold as well (see Code in UI elements). |

Generally, don't put quotation marks around code unless the quotation marks are part of the code.

### Items to put in ordinary (non-code) font

The following items should not be in code font (not exhaustive). If you're referring to any of them as computer input or output, or as a code entity like an attribute or value, then use code font.

| Item | Recommended |
| --- | --- |
| Domain names | The test environment is designed only for standard application offerings from example.com. |
| Names of products, services, and organizations | Example Organization has current and former employees who use Google products such as Google Docs and Google Sheets. |
| URLs that the reader is supposed to follow in a browser | You can find support at https://support.example.com. |

It's usually best to format a URL as a link with descriptive link text instead of exposing the URL itself. See [Avoid URLs as link text](https://developers.google.com/style/cross-references#urls).

### Code in UI elements

If a [UI element](https://developers.google.com/style/ui-elements#formatting) meets the requirements for code font, use both code font and bold for that element.

- Recommended: In the **Network** list, select **`my-net-2`**.
- Recommended: In the **Query results** pane, the **`Store`** column is displayed.

### Items that are sometimes in code font

Not exhaustive:

- **Boolean values.** If you refer directly to a Boolean data type value (such as `true` or `false`, or `1` or `0`), format the value as code. If you refer to the evaluation of a Boolean condition as true or false, use non-code font.
  - Recommended: If the update succeeds, returns `true`.
  - Recommended: `enableCertificateValidation`: If true, validates the SSL certificate before proceeding. If false, trusts the certificate without validating it.
- **Command-line utility names.** Utility names are often spelled the same as the associated project or product, differing only in capitalization. Use code font for the command and ordinary font for the project or product name.
  - Recommended: Invoke the GCC 8.3 compiler using `gcc` for C programs or `g++` for C++ programs.
  - Recommended: To send the file over FTP with IPv6, use `ftp -6`.
  - Recommended: The options for the `curl` command are explained on the curl project website.
  - Recommended: The `apt` program includes commands from the `apt-get` and `apt-cache` programs for working with APT packages.
- **Email addresses as input or output.** If the reader should use the email address as computer input or output, use code font. If the reader should treat it as a way to contact or refer to someone, use non-code font and hyperlink it.
  - Recommended: Enter the username, not the full email address. For example, enter `alex`, not `alex@example.com`.
  - Recommended: For help, contact [support@example.com](mailto:support@example.com).

### Method names

When you refer to a method name in text, omit the class name except where including it would prevent ambiguity.

- Recommended: To retrieve the zebra's metadata, call its `get` method.
- Not recommended: To retrieve the zebra's metadata, call its `animal.get` method.

### HTTP status codes

To refer to a single status code, use this form: an HTTP `400 Bad Request` status code. Call it a _status code_ rather than a _response code_ or _error code_, and put the number and name in code font. If _HTTP_ is implicit from context, you can leave it out.

To refer to a range of codes: an HTTP `2xx` or `400` status code. Use _`N`xx_ (with a specific digit in place of `N`) to mean anything in the `N`00-`N`99 range, and put the number in code font even when omitting the name.

To specify an exact range: an HTTP status code in the `200`-`299` range. Here, too, put the numbers in code font.

### Grammatical treatment of code elements

Don't use code elements such as keywords and filenames as if they were English verbs or nouns. Don't inflect the name of a code element (plural or possessive). Instead, include a noun after the code element and inflect that noun.

| Recommended | Not recommended |
| --- | --- |
| The `ADDRESS` constant's value is defined in the `settings.h` file. | `ADDRESS`'s value is defined in `settings.h`. |
| To add the data, send a `POST` request. | `POST` the data. |
| To retrieve the data, send a `GET` request. | Retrieve information by `GET`ting the data. |
| You can't close the file before opening it. You can't call the `close` method for a file before you call `open`. | `Close`ing the file requires you to have `open`ed it first. |
| Takes an array of extended ASCII code points (an array of `INT64` values) and returns `BYTES` values. For `STRING` arguments, returns the original string with all alphabetic characters in uppercase. | Takes an array of extended ASCII code points (ARRAY of INT64) and returns BYTES. |

### Linking API terms in Android

When writing code comments that become generated reference documentation, link the first instance of each Android API element (classes, methods, constants, XML attributes) to its reference page. Use code font and regular HTML `a` elements. For later uses of the same element in the same section, use code font but don't link.

Link `AndroidManifest.xml` elements and attributes to the API guide pages. Link the attribute for a particular widget or layout to its Javadoc in the widget's or layout's API reference entry.

- Recommended:

  ```html
  <a href="/guide/topics/manifest/data-element.html">data</a>
  ```

Very common classes such as `Activity` and `Intent` don't need to be linked every time. If you use a term as a concept rather than a class, don't put it in code font and don't capitalize it. Objects that don't always require Javadoc links or capitalization:

- activity, activities
- service
- fragment
- view
- loader
- action bar
- intent
- content provider
- broadcast receiver
- app widget

When referring to an actual instance, use the formal class name and link to its reference page:

- Recommended: The [`Activity` class](https://developer.android.com/reference/android/app/Activity.html) is an important part of an application's overall lifecycle...
- Recommended: The user interface for an activity is provided by a hierarchy of views—objects derived from the [`View` class](https://developer.android.com/reference/android/view/View.html).

To link to a class or method:

- To link to a class, use the class name as link text. For example:

  ```html
  <a href="/reference/android/widget/TextView">TextView</a>
  ```

- To link to a method, use the method name as a fragment identifier. If linking to a static method, also include the class name in the link text. To distinguish overloaded versions of a method, consider showing the full signature. For example:

  ```html
  <a href="/reference/android/app/Activity.html#onCreate(android.os.Bundle)">onCreate(Bundle)</a>
  ```

- To link a widget or layout attribute to its Javadoc, use the page URL plus the fragment identifier `#attr_android:ATTRIBUTE_NAME`. For example, to link to the XML attribute `android:inputType` for the `TextView` widget, add the following:

  ```html
  <a href="/reference/android/widget/TextView.html#attr_android:inputType>inputType</a>
  ```

## Code samples

Source: https://developers.google.com/style/code-samples

### Basic guidelines

- **Follow the indentation guidelines in the relevant code style guide.** For most languages this means spaces instead of tabs and two spaces per indentation level. Some contexts use four spaces, and some use tabs. This applies to code samples, not to [formatting commands](https://developers.google.com/style/code-syntax#formatting-a-command).
- **Wrap lines** at 80 characters. If readers may have a narrow browser window or print the document, consider wrapping at fewer characters.
- **Mark code blocks as preformatted text.** In HTML, use a `pre` element; in Markdown, prefer fenced blocks with a language tag, following the repository renderer.
- **Indicate omitted code by using a comment** in the syntax of the sample's language. Don't use three dots or the ellipsis character (`…`). If a code block contains an omission, don't format the block as click-to-copy.

- Recommended:

  ```html
  <pre>
  function helloWorld() {
    alert('Hello, world! This sentence is so long that it wraps onto a second
      line.');
  }
  </pre>
  ```

  This renders the following code block:

  ```javascript
  function helloWorld() {
    alert('Hello, world! This sentence is so long that it wraps onto a second
      line.');
  }
  ```

- Recommended:

  ```yaml
  apiVersion: serving.knative.dev/v1
  kind: Service
  # Several lines of code are omitted here.
  spec:
    template:
      spec:
        containers:
        - image: IMAGE_URL
          ports:
          - name: h2c
            containerPort: 8080
  ```

### Introductory statements

In most cases, precede a code sample with an introductory sentence or paragraph. End with a colon if the introduction immediately precedes the sample. End with a period if there's more material (such as a note) between the introduction and the sample, or if the introduction ends in a sentence not directly related to the sample.

- Recommended (ending with a period): The following code sample shows how to use the `get` method. For information about other methods, see [link]. [sample]
- Also recommended: The following code sample shows how to use the `get` method: [sample] For information about other methods, see [link].
- Not recommended (ending with a colon): The following code sample shows how to use the `get` method. For information about other methods, see [link]: [sample]

For more about introducing samples, see [Document command-line syntax](https://developers.google.com/style/code-syntax).

### Code style guides

Public Google coding-style guides on GitHub:

- [C++ style guide](https://google.github.io/styleguide/cppguide.html)
- [HTML/CSS style guide](https://google.github.io/styleguide/htmlcssguide.html)
- [Java style guide](https://google.github.io/styleguide/javaguide.html)
- [JavaScript style guide](https://google.github.io/styleguide/javascriptguide.xml)
- [Python style guide](https://google.github.io/styleguide/pyguide)
- [Full list of Google's programming style guides](https://google.github.io/styleguide/)

Some open source projects have their own overriding style guides. For example, Java code in the Android Open Source Project follows the [AOSP Java Code Style for Contributors](https://source.android.com/setup/contribute/code-style) guide.

## Document command-line syntax

Source: https://developers.google.com/style/code-syntax

### Best practices

When writing procedural or conceptual documentation for a command:

- **Provide an inline link to the command reference.** A good place is the text that introduces the command or a series of steps.
  - Recommended: To connect to the instance, use the [`gcloud compute ssh` command](https://cloud.google.com/sdk/gcloud/reference/compute/ssh):

    ```sh
    gcloud compute ssh
    ```
- **Determine which arguments are needed to complete each task in the recommended way.** Use as few optional arguments as possible in non-reference content. Rely on the command reference for the complete list.
- **Provide a click-to-copy command example that the reader doesn't need to edit after copying.** If possible, include only runnable code and placeholder variables. Optional, mutually exclusive, and repeated arguments are indicated by square brackets (`[]`), pipes (`|`), braces (`{}`), and ellipses (`...`), which break commands if not removed. Avoid such arguments in click-to-copy examples. See Optional arguments in click-to-copy commands.

### Format a command

To mark a block of code such as a lengthy command or code sample: in HTML, use the `pre` element; in Markdown, use a code fence (```` ``` ````).

To format a command with multiple elements:

- When a line exceeds 80 characters, you can safely add a line break before some characters, such as a single hyphen, double hyphen, underscore, or quotation marks. After the first line, indent each line by four spaces to vertically align the lines that follow a break.
- When you split a command line, each line except the last must end with the command-continuation character. Commands without it don't work.
  - Linux or Cloud Shell: a backslash, typically preceded by a space (` \`)
  - Windows: a caret preceded by a space (` ^`)
- Format placeholder text as [placeholders](https://developers.google.com/style/placeholders).
- Follow the command line with a descriptive list of the placeholders used. See [Explaining placeholders](https://developers.google.com/style/placeholders#explain-placeholders).
- When documenting an option or argument, use end punctuation for complete sentences. Don't use end punctuation for single words or noun phrases, unless there's a mix of sentences and noun phrases. This mirrors [end punctuation in lists](https://developers.google.com/style/lists#capitalization-and-end-punctuation). See also [Google AIP guidelines for documentation](https://google.aip.dev/192#style).

When documenting a `bash` or `sh` command, follow the [quotation mark style](https://google.github.io/styleguide/shellguide.html#s5.7-quoting) in Google's shell style guide.

### Command prompt

Omit shell prompts from copyable commands, including multiline commands. Separate
input and output into labeled blocks. Use prompt indicators only for an interactive
transcript where they clarify a change of shell or distinguish input from output;
label that block as a transcript rather than a copyable command.

For example, run:

```sh
adb devices
```

The output is similar to:

```text
List of devices attached
emulator-5554  device
emulator-5556  device
```

### Optional arguments

Use square brackets around an argument to indicate it's optional. If there's more than one optional argument, enclose each in its own set of square brackets.

Avoid optional arguments in click-to-copy examples; see Best practices and Optional arguments in click-to-copy commands.

In the following example, `GROUP` is required, but `GLOBAL_FLAG` and `FILENAME` are optional:

```text
gcloud dns GROUP [GLOBAL_FLAG] [FILENAME]
```

### Mutually exclusive arguments

Use curly braces to indicate that the reader must choose one, and only one, of the items inside. There can be more than two choices. Separate each choice with a pipe (`|`).

Avoid mutually exclusive arguments in click-to-copy examples.

In the following example, choose either `FILE_1` or `FILE_2`:

```text
{FILE_1|FILE_2}
```

In the following example, there are also two options:

- Left side of pipe: If the source code is deployed from a cloud repository, the following is required: `--source=CLOUD_SOURCE --source-url=SOURCE_URL`
- Right side of pipe: If the source code is in a local directory:
  - `--bucket=BUCKET` is required.
  - `--source=LOCAL_SOURCE` is optional, as specified by the square brackets.

```text
{--source=CLOUD_SOURCE --source-url=SOURCE_URL | --bucket=BUCKET [--source=LOCAL_SOURCE]}
```

### Arguments that can repeat

Use three dots and no spaces (`...`) to indicate that the reader can specify multiple values for the argument.

Avoid an ellipsis in click-to-copy examples.

In this example, the reader can specify multiple instances of the optional parameter `GLOBAL_FLAG`:

```text
gcloud dns GROUP [GLOBAL_FLAG ...]
```

### Optional arguments in click-to-copy commands

Optional, mutually exclusive, and repeated arguments contain characters (square brackets, curly braces, pipes, ellipses) that break commands if the reader doesn't remove them. Avoid these in click-to-copy commands. Instead, choose one of the following approaches:

- **Remove the optional arguments.** Use only the necessary arguments for the most common use case. If possible, remove optional arguments from the command; always link to the command reference where readers can find the full list. Choose arguments from verified command help, supported examples, and the requested use case.
  - Recommended: To get an aggregate list of all virtual machine (VM) instances in all zones for a project, use the [`gcloud compute instances list` command](https://cloud.google.com/sdk/gcloud/reference/compute/instances/list):

    ```sh
    gcloud compute instances list
    ```

    If you want to narrow the list of VMs to a specific zone, use the previous command with the `--zones` flag.
- **Use separate code blocks for each option.** Sometimes it's ideal to provide more than one click-to-copy block in the same section.
  - Recommended: To create a bootable Compute Engine image, use the [`gcloud compute images import` command](https://cloud.google.com/sdk/gcloud/reference/compute/images/import):

    ```sh
    gcloud compute images import IMAGE_NAME \
        --source-file=SOURCE_FILE
    ```

    If you're importing an image with an existing license, specify the `--byol` flag:

    ```sh
    gcloud compute images import IMAGE_NAME \
        --source-file=SOURCE_FILE \
        --byol
    ```
- **Document optional arguments in separate tasks.** Sometimes it's best to treat different options in separate sections.
  - Recommended: To create a bootable or non-bootable Compute Engine image based on an existing virtual disk, use the [`gcloud compute images import` command](https://cloud.google.com/sdk/gcloud/reference/compute/images/import).

    Under a heading "Import a bootable virtual disk": If your virtual disk has a bootable operating system installed on it, run the following command:

    ```sh
    gcloud compute images import IMAGE_NAME \
        --source-file=SOURCE_FILE
    ```

    Under a heading "Import a non-bootable virtual disk": If your virtual disk doesn't have a bootable operating system installed on it, include the `--data-disk` flag:

    ```sh
    gcloud compute images import IMAGE_NAME \
        --source-file=SOURCE_FILE \
        --data-disk
    ```
- **Let the reader know that the command contains optional arguments.** If you must include special characters to indicate optional arguments, say so when you introduce the command.
  - Recommended: To create a VM with a custom name and attach one or more existing stateful disks to that VM, use the [`gcloud compute instance-groups managed create-instance` command](https://cloud.google.com/sdk/gcloud/reference/compute/instance-groups/managed/create-instance) with one or multiple `--stateful-disk` flags. In the following example, you optionally specify the `auto-delete` subflag to keep or discard each disk when the VM is permanently deleted:

    ```sh
    gcloud compute instance-groups managed create-instance NAME \
        --instance=VM_NAME \
        --stateful-disk=device-name=DEVICE_NAME,source=DISK[,auto-delete=DELETE_RULE]
    ```

    For example, the following command creates a managed instance that's named `db-instance` and attaches the persistent disk `db-data-disk-1` as a stateful disk that is detached and preserved if its VM is deleted:

    ```sh
    gcloud compute instance-groups managed create-instance example-database-mig \
        --instance=db-instance \
        --stateful-disk=device-name=data-disk,source=projects/example-project/zones/us-east1-c/disks/db-data-disk-1,auto-delete=never
    ```

### Output from commands

You don't have to show output for every command. Add output only if it adds value, for example if the reader needs to copy or verify a value in it.

If you show output, use one of the following introductory phrases to separate the command from the output:

- Recommended: The output is similar to the following:
- Recommended: The output is the following:

To call out something about the output, customize the phrase:

- Recommended: The output is similar to the following, in which the `IP` column shows the IP address for each resource:

To indicate that one or more lines of output are omitted, use three dots and no spaces (`...`) on a separate line. Don't use the ellipsis character (`…`). For example:

```text
Reading file status
Upload done, resetting board...
...
Wakeup reason: 0
```

See also:

- [Order of multiple components in a step](https://developers.google.com/style/procedures#order-of-multiple-components-in-a-step) for output in procedures.
- [Placeholders in output](https://developers.google.com/style/placeholders#placeholders-in-output).
- [Example domains and names](https://developers.google.com/style/examples) for example domain names and IP addresses in output.

### Command-line terminology

When discussing commands and their parts in the `gcloud` CLI and in Linux commands:

- Avoid mapping nomenclature of the `gcloud` CLI's commands to Linux commands.
- Linux commands can be complicated. Describe what the entire command does rather than what its individual elements are called.
- For either kind, ask whether the reader must know the name of the command-line element or whether explaining the command is sufficient.

#### gcloud commands

```text
gcloud GROUP | COMMAND [--account=ACCOUNT] [--configuration=CONFIGURATION] \
    [--flatten=[KEY,...]][--format=FORMAT] [--help] [--project=PROJECT_ID] \
    [--quiet, -q][--verbosity=VERBOSITY; default="warning"] [--version, -v] \
    [-h] [--log-http][--trace-token=TRACE_TOKEN] [--no-user-output-enabled]
```

The `gcloud` CLI's syntax distinguishes between a _command_ and a _command group_. In docs, however, command-line contents are generally referred to as commands.

You can use commands (and groups) alone or with one or more flags. A _flag_ is a Google Cloud-specific term for any element other than the command or group name itself. A command or flag might also take an _argument_, for example a region value.

##### Example command

```sh
gcloud init
```

##### Example command with a flag

```sh
gcloud init --skip-diagnostics
```

##### Example command with multiple elements

```sh
gcloud ml-engine jobs submit training ${JOB_NAME} \
    --package-path=trainer \
    --module-name=trainer.task \
    --staging-bucket=gs://${BUCKET} \
    --job-dir=gs://${BUCKET}/${JOB_NAME} \
    --runtime-version=1.2 \
    --region=us-central1 \
    --config=config/config.yaml \
    -- \
    --data_dir=gs://${BUCKET}/data \
    --output_dir=gs://${BUCKET}/${JOB_NAME} \
    --train_steps=10000
```

The preceding command consists of the following elements:

- `ml-engine` is a `gcloud` command group.
- `jobs` is an `ml-engine` command group.
- `submit` is a `jobs` command group.
- `training` is a `submit` command.
- `${JOB_NAME}` is an argument that refers to an environment variable called `JOB_NAME` that was set earlier.
- `--package-path` is a flag set to a path to a Python package to build.
- `--` in isolation separates the `gcloud` arguments that precede it from the [user arguments](https://cloud.google.com/sdk/gcloud/reference/ml-engine/jobs/submit/training#USER_ARGS) that follow it.

In addition to _flag_, _option_ is often used as a catchall term when you don't want to mire the reader in specialized nomenclature.

For more information, see the [Cloud SDK: gcloud](https://cloud.google.com/sdk/gcloud/reference/) topic.

#### Linux commands

**Caution**: Linux command syntax is notoriously complex. This section covers only the most common elements. For a more detailed reference, see [The Linux Command Line](http://wiki.lib.sun.ac.za/images/c/ca/TLCL-13.07.pdf).

Where the `gcloud` CLI uses the catchall terms flag and option, Linux commands use _options_, _parameters_, _arguments_, and a host of specialized syntax elements. Example:

```sh
find /usr/src/linux -follow -type f -name '*.[ch]' | xargs grep -iHn pcnet
```

The preceding command consists of the following elements:

- `find` is the command name.
- `/usr/src/linux` is an argument that specifies the path to look in. Easier to refer to as only a path.
- `-follow` is an option. The hyphen (`-`), often called a _dash_ in this context, is part of the option.
- `-type` is an option with a value of `f`.
- `-name` is an option with a value of `'*.[ch]'`, where the asterisk (`*`) is a _metacharacter_ signifying a wildcard. Metacharacters are used in Linux shell commands for _globbing_, or filename expansion. Besides the asterisk, metacharacters include the question mark (`?`) and caret (`^`).

The results of the first command are redirected by using a _pipe_ (`|`) to the `xargs grep -iHn pcnet` command. Other redirection symbols include the greater than symbol (`>`), less than symbol (`<`), left double angle quotation mark (`<<`), and right double angle quotation mark (`>>`). Redirection means capturing output from a file, command, program, script, or even code block within a script and sending it as input to another file, command, program, or script.

#### Linux signals

Linux signals require vocabulary choices that are generally discouraged elsewhere in documentation. Use the terms in the following table _only_ in the context of process control:

| Signal | Description |
| --- | --- |
| `SIGKILL` | Signal sent to _kill_ a specified process, all members of a specified process group, or all processes on the system. `SIGKILL` cannot be caught, blocked, or ignored. Do not substitute _cancel_, _end_, _exit_, _quit_, _stop_, or _terminate_. |
| `SIGTERM` | Signal sent as a request to _terminate_ a process. Although similar to `SIGKILL`, this signal gives the process a chance to clean up any child processes that might be running. Do not substitute _cancel_, _end_, _exit_, _quit_, or _stop_. |
| `SIGQUIT` | Signal sent from a keyboard to _quit_ a process. Some processes can catch, block, or ignore a quit signal. Do not substitute _cancel_, _end_, _exit_, _quit_, or _stop_. |
| `SIGINT` | Signal sent to _interrupt_ a process immediately. The default action is to terminate a process gracefully. It can be handled, ignored, or caught. It can be sent from a terminal, for example when a user presses `Control+C`. Do not substitute _suspend_, _end_, _exit_, _pause_, or _terminate_. |
| `SIGPAUSE` | Signal that tells a process to _pause_, or _sleep_, until any signal is delivered that either terminates the process or invokes a signal-catching function. Do not substitute _cancel_ or _interrupt_. |
| `SIGSUSPEND` | Signal sent to temporarily _suspend_ execution of a process. Used to prevent delivery of a particular signal during the execution of a critical code section. Do not substitute _pause_ or _exit_. |
| `SIGSTOP` | Signal sent to _stop_ execution of a process for later continuation (upon receiving a `SIGCONT` signal). `SIGSTOP` cannot be caught, blocked, or ignored. Do not substitute _cancel_, _end_, _exit_, _interrupt_, _quit_, or _terminate_. |

## Format placeholders

Source: https://developers.google.com/style/placeholders

This section covers formatting placeholders in commands, code samples, and text strings. It doesn't explain how to implement visual styling, but shows how Google developer documentation style renders placeholders as visually distinct.

Placeholders in sample code and commands represent values that the reader must replace when they use the sample input. Placeholders in example output can also represent other values that vary. In general, a placeholder has a descriptive name as a default value.

For example, the placeholder `PROJECT_ID` represents a project ID in sample code, commands, and example output. In example output, the placeholder `HTTP_RESPONSE_CODE` represents an HTTP response code; the reader isn't expected to set this to a specific value.

### Placeholders

General guidance about the letter _x_:

- In general, don't use a single _x_ or a series of _x_'s as placeholders; use a more informative placeholder.
- In some contexts (such as HTTP status codes), a series of _x_'s is the standard, so it's OK to use, for example, _xx_ there.

Formatting depends on whether you're in HTML or Markdown, and whether the placeholder is inline, in a code block, or in a paragraph.

#### Placeholders in inline text

If sample code and command placeholders occur in a sentence:

- In HTML, wrap variable placeholders in the `var` element inside a `code` element:

  ```html
  <code><var>PLACEHOLDER_NAME</var></code>
  ```

- In Markdown, wrap inline placeholders in backticks, with an asterisk before the first backtick and after the second one: `` *`PLACEHOLDER_NAME`* ``.

If the placeholder does not represent a code sample or command:

- In HTML, wrap placeholders in the `var` element alone:

  ```html
  <var>PLACEHOLDER_NAME</var>
  ```

#### Placeholders in code blocks

If placeholders are in a block of code:

- In HTML, wrap the code block in a `pre` element, and tag placeholders with `var` elements:

  ```html
  <pre>
  gcloud compute forwarding-rules create <var>FORWARDING_RULE_NAME</var> \
      --global | --region=<var>REGION</var> \
      --load-balancing-scheme=<var>LOAD_BALANCING_SCHEME</var> \
      --network=<var>NETWORK</var> \
      ...
  </pre>
  ```

- In Markdown, wrap the code block in a code fence (```` ``` ````). Inside a code fence, you can't apply formatting like bold or italic.

  ````markdown
  ```
  PLACEHOLDER_NAME
  ```
  ````

#### Placeholder text

**Use uppercase characters with underscore delimiters.**

In HTML:

- Recommended: `.../<var>API_NAME</var>`, `.../<var>METHOD_NAME</var>`
- Not recommended: `.../<var>API-name</var>`, `.../<var>API_name</var>`, `.../<var>API name</var>`, `.../<var>api_name</var>`, `.../<var>api-name</var>`, `.../<var>apiName</var>`

In Markdown:

- Recommended: `.../*API_NAME*`, `.../*METHOD_NAME*`

If the context makes uppercase with underscores a bad idea, use something else that makes sense, but be internally consistent.

**Don't include possessive adjectives in placeholders.**

- Not recommended: `.../<var>MY_API_NAME</var>`, `.../<var>YOUR_API_NAME</var>`

**Note**: You can mark up command-line syntax with [brackets](https://developers.google.com/style/code-syntax#optional-arguments), [braces](https://developers.google.com/style/code-syntax#set-of-two-arguments), and [ellipses](https://developers.google.com/style/code-syntax#arguments-that-can-repeat). Don't put the brackets, braces, or ellipses in the `var` element.

### Explain placeholders

When you use a placeholder in text or code, explain it the first time you use it. Don't repeat the explanation unless doing so benefits the reader, for example when:

- Your document is lengthy.
- You've introduced several other placeholders in a long procedure.
- Your document isn't intended to be read from beginning to end.

The following is an example of a command that uses a placeholder with an explanation of that placeholder:

```html
<pre class="devsite-click-to-copy">
gcloud compute instances create <var>INSTANCE_NAME</var> \
    --metadata enable-guest-attributes=TRUE
</pre>

<p>Replace <code><var>INSTANCE_NAME</var></code> with the name that
you want your new VM instance to have.</p>
```

#### Single placeholder

Use the format: Replace `PLACEHOLDER` with a description of what the placeholder represents.

- Recommended:
  1. Stream the build logs to the Google Cloud console:

     ```sh
     gcloud builds log --stream=BUILD_ID
     ```

     Replace `BUILD_ID` with the ID of the `WORKING` build that you copied in the preceding step.

#### Two or more placeholders

- Follow the command line with a descriptive list of the placeholders used. Explain what each placeholder represents even if its value is intuitive to you.
- Introduce the list with _Replace the following:_
- List the placeholders in the order in which they appear in the command line.
- Tag each placeholder in a code sample or command with `code` and `var` elements, followed by a [colon and a description that starts with a lowercase letter](https://developers.google.com/style/colons). For non-code samples, remove the `code` elements. For example:

  ```html
  <li><code><var>INSTANCE_NAME</var></code>: description</li>
  ```

- If the description contains an example, introduce it with an _em dash_ or _such as_. For example:

  ```html
  <li><code><var>INSTANCE_NAME</var></code>: description&mdash;for example,...</li>
  ```

  ```html
  <li><code><var>INSTANCE_NAME</var></code>: description, such as...</li>
  ```
- Each item in the list follows the [list style](https://developers.google.com/style/lists).

- Recommended:
  1. Set the maximum concurrency target for a new reservation:

     ```sh
     bq mk \
         --project_id=ADMIN_PROJECT_ID \
         --location=LOCATION \
         --target_job_concurrency=CONCURRENCY \
         --reservation \
         RESERVATION_NAME
     ```

     Replace the following:

     - `ADMIN_PROJECT_ID`: the project that owns the reservation
     - `LOCATION`: the location of the reservation
     - `CONCURRENCY`: the maximum concurrency target
     - `RESERVATION_NAME`: the name of the reservation

- Recommended:
  1. In Cloud Shell, set the environment variables:

     ```sh
     export ONPREM_PROJECT=ON_PREM_PROJECT_NAME \
         export ONPREM_ZONE=ZONE
     ```

     Replace the following:

     - `ON_PREM_PROJECT_NAME`: the Google Cloud project name for your on-premises project. You can find your project number on the [Dashboard](https://console.cloud.google.com/home/dashboard) page of the Google Cloud console.
     - `ZONE`: a [Google Cloud zone](https://cloud.google.com/compute/docs/regions-zones#identifying_a_region_or_zone) that's close to your location—for example, `us-east1`.

#### Placeholders in output

If you provide a code output example, explain any placeholders that appear in it:

- Use `var` elements to identify the placeholder text in the output.
- Follow the example output with a list of the placeholders used.
- Introduce the list with _This output includes the following values:_
- List the placeholders in the order in which they appear.
- Tag each placeholder with a `var` element, followed by a colon and a description that starts with a lowercase letter. For example:

  ```html
  <li><code><var>INSTANCE_NAME</var></code>: description</li>
  ```

- If the description contains an example, introduce it with an _em dash_ or _such as_. For example:

  ```html
  <li><code><var>INSTANCE_NAME</var></code>: description&mdash;for example,...</li>
  ```

  ```html
  <li><code><var>INSTANCE_NAME</var></code>: description, such as...</li>
  ```

See also [Output from commands](https://developers.google.com/style/code-syntax#output).

- Recommended:

  Response

  The output is similar to the following:

  ```json
  {
   "name": "operations/build/PROJECT_ID/OPERATION_ID",
   "metadata": {
    "@type": "type.googleapis.com/google.devtools.cloudbuild.v1.BuildOperationMetadata",
    "build": {
     "id": "BUILD_ID",
     "status": "QUEUED",
     "createTime": "2019-09-20T15:55:29.353258929Z",
     "steps": [
      {
       "name": "gcr.io/compute-image-import/gce_vm_image_import:release",
       "env": [
        "BUILD_ID=BUILD_ID"
       ],
       "args": [
        "-timeout=7056s",
        "-image_name=IMAGE_NAME",
        "-client_id=api",
        "-data-disk",
        "-source_file=SOURCE_FILE"
       ]
      }
     ],
     "timeout": "7200s",
     "projectId": "PROJECT_ID",
     "logsBucket": "gs://PROJECT_NUMBER.cloudbuild-logs.googleusercontent.com",
     "options": {
      "logging": "LEGACY"
     },
     "logUrl": "https://console.cloud.google.com/gcr/builds/BUILD_ID?project=PROJECT_NUMBER"
    }
   }
  }
  ```

  This output includes the following values:

  - `PROJECT_ID`: the project ID for the project that the image was imported into
  - `OPERATION_ID`: the ID of the import operation
  - `BUILD_ID`: the ID of the build for the import operation
  - `IMAGE_NAME`: the name of the image to be imported
  - `SOURCE_FILE`: the URI for the image in Cloud Storage—for example, `gs://my-bucket/my-image.vmdk`
  - `PROJECT_NUMBER`: the number for the import project

## UI elements and interaction

Source: https://developers.google.com/style/ui-elements

### Focus on the task

When practical, state instructions in terms of what the reader should accomplish, rather than the widgets and gestures. Avoiding reference to UI elements helps the reader understand the purpose of an instruction and helps future-proof procedures.

- Recommended: Refresh the page.
- Recommended: Expand the **Advanced options** section.

However, know the audience and context. Sometimes the point of a procedure is to guide the reader through elements on the page, or the UI isn't obvious and explaining gestures helps. Provide the level of detail useful for the intended audience.

- Recommended: Click **Refresh**.
- Recommended: To expand the **Advanced options** section, click the expander arrow.

The rest of this section covers cases where you've decided to explicitly discuss UI elements. For writing procedures, see [Procedures](https://developers.google.com/style/procedures).

### Format names of UI elements

When referring to any UI element by name, put its name in bold, using the `b` element in HTML or `**` in Markdown. This includes buttons, menus, dialogs, windows, list items, or any other feature on the page with a visible name. Don't use code font for UI elements unless the element meets the [requirements for code font](https://developers.google.com/style/code-in-text); in that case, use both code font and bold.

**Note**: The `b` element is used because in modern HTML, [`b`](https://html.spec.whatwg.org/multipage/semantics.html#the-b-element) connotes text to draw visual attention to, whereas [`strong`](https://html.spec.whatwg.org/multipage/semantics.html#the-strong-element) indicates strong importance.

Don't make an official feature or product name bold, except when it directly refers to an element on the page that uses the name (such as a window title or button name).

- Recommended: In the **New project** window, select the **New activity** checkbox, and then click **Next**.
- Not recommended: In the New Project window, select "New Activity", and then click the "Next" button.

If you document a UI element outside a procedure, provide context for the element.

- Recommended: The service lets you check the status of all jobs in the **Current jobs** section of the service console.
- Not recommended: The service lets you check the status of all jobs in the **Current jobs** section.

### Use appropriate capitalization

In most cases, follow the capitalization as it appears on the page. If labels are inconsistent or all uppercase, use sentence case.

| Guidance | Recommended | Not recommended |
| --- | --- | --- |
| When a label is all uppercase, use sentence case. | Click **Refresh**. | Click **REFRESH**. |
| When referring to multiple labels that are inconsistently cased, use sentence case for all of them. | Click **New project**, and then click **New activity**. | Click **NEW PROJECT**, and then click **New Activity**. |

### Refer to UI elements

Don't use UI elements as if they were English verbs or nouns.

| Recommended | Not recommended |
| --- | --- |
| In the **Name** field, enter an account name. | **Name** the account. |
| To save the settings, click **Save**. | **Save** the settings. |
| In the **Service account ID** field, enter a name. For **Service account ID**, enter a name. | Specify a **Service account ID**. |

### Terminology and usage

In general, focus on the feature and its functionality, not the UI element. If it adds clarity, use the name of the UI element. Both of the following are valid:

- Recommended: Go to **File > Tools**.
- Recommended: In the **File** menu, click **Tools**.

Don't use slang terms for UI elements, for example _hamburger icon_ or _zippy_. See Buttons and icons.

- Recommended: To expand the **Advanced options** section, click the expander arrow.
- Recommended: Expand **Advanced options**.
- Not recommended: To expand the **Advanced options** section, click the zippy.

For prepositions to use with these elements, see the Prepositions table.

#### Windows, pages, dialogs, panes, and sections

Most often, a _window_ is the entire application window in a desktop environment. It can also refer to modular application elements that you can open and close. For example, in Android Studio, several windows are available in the **View > Tool Windows** menu.

- Recommended: In the **MyApp** window, click **Edit**.
- Not recommended: In the **MyApp** page, click **Edit**.

_Page_ is the preferred term for a web page in general and a subpage of a console in particular. See [console](https://developers.google.com/style/word-list#console).

- Recommended: In the Google Cloud console, go to the **Deployments** page.
- Not recommended: In the Google Cloud console, go to the **Deployments** window.

A _dialog_ is a smaller window, usually detached from the main application window and appearing in front of it.

- Recommended: In the **Welcome** dialog, click **OK**.
- Not recommended: In the **Welcome** pop-up window, click **OK**.

A _pane_ (or _panel_) is typically a distinct rectangular region within a larger browser or application window. A pane can be tightly coupled to surrounding UI regions, whereas a window is distinctly separate and can be hidden. Don't use _window_, _section_, _area_, or _column_ to refer to a pane or panel.

- Recommended: In the **Create service account** pane, click **New**.
- Not recommended: In the **Create service account** section, click **New**.

A _section_ is a labeled grouping of options and controls, usually within a window, pane, or panel. Don't use _area_ or _column_ to refer to a section.

- Recommended: In the **Create metric** pane, do the following: In the **Metric type** section, select **Counter**. In the **Labels** section, click **Add label**.

#### Menus and menu bars

In a desktop application, the _menu bar_ appears at the top of the window or screen; it's a set of _menus_ (such as **File** or **Edit**), each a set of related _commands_ and/or nested submenus.

To refer to an item in a menu, use _command_, not _choice_, _menu item_, or _option_. Exception: if you're documenting how to build an interface, you can use _menu item_.

To refer to a menu, use the form _the **LABEL_NAME** menu_.

To tell the reader where to find a command, use a phrase like _In the **File** menu, select **Open**._

Don't use _drop-down_ as a synonym for _menu_. See [drop-down](https://developers.google.com/style/word-list#drop-down).

##### Use angle brackets

Another option is angle brackets (>). If you use them:

- Put a nonbreaking space (`&nbsp;`) before each angle bracket.
- Don't bold each menu name separately; enclose the entire sequence in a single bold tag (`<b>...</b>` or `**...**`).
- Wrap the angle bracket in a span with an `aria-label` attribute of _and then_ (for example, `<span aria-label="and then">></span>`). Otherwise, some screen readers might read `>` as "greater than."

The following renders as _Select **View > Tools > Developer Tools**_, and a screen reader interprets it as _Select View and then Tools and then Developer Tools_:

```html
Select <b>View&nbsp;<span aria-label="and then">></span> Tools&nbsp;<span aria-label="and then">></span> Developer Tools</b>.
```

#### Markdown

```markdown
Select **View&nbsp;<span aria-label="and then">></span> Tools <span aria-label="and then">></span> Developer Tools**.
```

This notation abbreviates a longer phrase like _In the **File** menu, select **Open**._ It applies only to menu items. Don't use it to describe a combination of different UI elements.

- Recommended: Select **MyApp > Preferences**, and then select the **Languages** preference pane.
- Not recommended: Select **MyApp** > **Preferences** > **Languages** > **+** > **CSS**.

#### Navigation menu

A _navigation menu_ is a control, usually a pane or window, containing a list of items the user can click to go to pages in an application or website. Don't use _navigation bar_, _navigation pane_, _navigation panel_, or _navigation window_ for such a control.

- Recommended: In the BigQuery navigation menu, click **Scheduled queries**.

#### Toolbar

A _toolbar_ is a set of buttons for common user actions. A toolbar button that includes a menu is a _menu button_. Refer to the toolbar by name if the user needs help finding a button.

- Recommended: On the Google Cloud console toolbar, click **Notifications**.
- Recommended: Click **Notifications**.

#### Buttons and icons

A _button_ initiates an action when clicked (or tapped, on a touchscreen). To refer to a button, use its label.

- Recommended: Click **OK**.
- Not recommended: Click the "OK" button.

An _icon_ is a symbol or image representing an object or function. An icon can also be a button. If a button includes an icon, write the name of the button as shown in the tooltip, and add the button icon before the name. If you need a space between icon and name for readability, use a nonbreaking space.

- Recommended: Click (more_vert icon) **Settings and utilities**.
- Not recommended: Click (more_vert icon).

If the icon tooltip is identical to the name of the icon, use an [empty `alt` attribute](https://developers.google.com/style/images#alt-text).

If you're unsure of an icon's name, inspect the element with browser tools. Visual elements often have an ARIA attribute that describes them for screen readers. Right-click the element and select **Inspect** or **Inspect element**, depending on your browser. Look for `aria-labelledby`, `aria-label`, `aria-describedby`, `label`, `placeholder`, or `title`. See [Using aria-label](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html) and [Accessible Name and Description calculation](https://www.w3.org/TR/html-aapi/#accessible-name-and-description-calculation).

If a button with an icon doesn't include a tooltip, submit a bug report requesting one. Tooltips are crucial for accessibility, documentation, and discoverability.

- Recommended: Click (add icon) **Add**.
- Not recommended: Click the (hammer icon) icon.

If a UI element name ends with an ellipsis (...), leave out the ellipsis.

- Recommended: Click **Browse**.
- Not recommended: Click **Browse ...**.

Don't use directional language to orient the reader, such as _above_, _below_, or _right-hand side_. Such phrases don't work well for accessibility or localization. If a UI element is hard to find, provide a screenshot.

- Recommended: Click (menu icon) **Menu**.
- Not recommended: In the left-side panel, click the button with three lines.

##### Difficult-to-find UI elements

For hard-to-find elements, consider these alternatives to directional language:

- Use the button icon along with its name as shown in the tooltip.
  - Recommended: Click (refresh icon) **Refresh**.
- Add context to help the user find the element.
  - Recommended: On the Cloud Run toolbar, click (refresh icon) **Refresh**.
- Use a screenshot.
  - Recommended: In the list of services, click (view_column icon) **Column display options**. (followed by a screenshot of the list of services)

  See [Diagrams, figures, and other images](https://developers.google.com/style/images).

#### Tab

A _tab_ is a navigation element that looks like a file tab. Use the form _the **LABEL_NAME** tab_.

- Recommended: Select **Tools > Options**, and then click the **Edit** tab.

#### Text box

A _text box_ is a box the user can type in. Use _box_ and the form _the **LABEL_NAME** box_. Format text the user types with the `code` element in HTML, or with code (monospace) formatting in other markup.

- Recommended: In the **Owner** box, enter your name.
- Recommended: In the **Name** box, enter `wsfc-1`.

In Google Cloud, use _field_ instead of _box_. In Google Workspace documentation, use _field_ instead of _box_.

- Recommended: In the **Instance** field, specify a value less than 64 characters long.

#### List box, combo box, and spin box

A _list box_ offers the user a list of items. Use the form _the **LABEL_NAME** list_ or _the **LABEL_NAME** box_, whichever is clearer.

- Recommended: In the **Item** list, select **Desktop**.

A _combo box_ combines a text box and a list box. Use the form _the **LABEL_NAME** box_. For entering a value, use the verbs _type or select_ or _enter_.

- Recommended: In the **Font** box, type or select the font that you want to use.

A _spin box_ lets the user choose a value by clicking arrows or by typing. Use the form _the **LABEL_NAME** box_. For entering a value, use the verb _enter_.

- Recommended: In the **Font Size** box, enter a font size.

#### Checkbox

A _checkbox_ is a small box indicating whether an option is on or off. Use the form _the **LABEL_NAME** checkbox_.

Be wary of the verbs _check_ and _uncheck_, which can be ambiguous; use _select_ and _clear_ instead.

- Recommended: Select the **Automatically check for updates** checkbox.
- Recommended: Clear the **Bookmarks** checkbox.

To refer to the state of a checkbox, use _selected_ or _not selected_.

- Recommended: Make sure that the **Bookmarks** checkbox is selected.
- Recommended: Make sure that the **Bookmarks** checkbox isn't selected.

#### Radio button

A _radio button_ chooses one item from a group of mutually exclusive options. Use the radio button's label, or refer to the group by its label.

- Recommended: Select **Do not remember passwords**.
- Recommended: For **Startup mode**, select an option.

#### Expander arrow

An _expander arrow_ expands or collapses a section of navigation or content. Avoid referring to these explicitly, but when you do, use _expander arrow_ and _expandable section_ rather than _expando_ or _zippy_.

- Recommended: To expand the **Advanced options** section, click the expander arrow.
- Not recommended: To expand the **Advanced options** section, click the zippy.

#### Toggle

A _toggle_ switches between on and off states. Don't use _toggle_ as a verb. Describe the action you want the user to take.

- Recommended: To turn on the setting, click the **Wi-Fi** toggle.

If you don't know the toggle's state before the user interacts with it, be clear about the position it should be in.

- Recommended: In **Settings**, click the **Magic mode** toggle to the on position.

### Press and type keyboard keys

To indicate that the user should press a key or combination, use the `kbd` element.

- Recommended: `Press <kbd>Control+C</kbd>.`

Rendered:

- Recommended: Press `Control+C`.

In non-HTML markup, use monospace formatting, which is how `kbd` renders.

To refer to a letter key, use uppercase, not lowercase.

- Recommended: To save, press `Control+S`.
- Not recommended: To save, press `Control+s`.

To refer to a key the user types to enter its value as text input, use the `code` element, not `kbd`. See [Code font](https://developers.google.com/style/text-formatting#code-font).

To refer to a keyboard key, use the key's name. If ambiguous, use the form _the `KEY_NAME` key_.

- Recommended: Press `Esc`.
- Recommended: Press the `Esc` key.

Spell out the names of modifier keys such as Command, Control, Option, and Shift. Don't use symbols. For a combination, use the form _`MODIFIER+KEY_NAME`_.

- Recommended: Press `Control+V`.

When providing shortcuts for multiple operating systems, put the macOS shortcut in parentheses after the Windows and Linux shortcut.

- Recommended: To copy, press `Control+C` (or `Command+C` on macOS).
- Not recommended: To copy, press `Ctrl+C` (`⌘+C`).

For a combination using Shift, use the form _`MODIFIER+Shift+KEY_NAME`_.

- Recommended: Press `Control+Shift+?`.

Spell out the names of characters that could be confusing in a shortcut, such as comma, hyphen, period, and plus.

To refer to a keyboard shortcut, use _keyboard shortcut_ or _key combination_.

To refer to pressing a key or combination to cause an action, use _press_. To refer to typing a key or combination as part of text, use _enter_ or _type_.

### Prepositions

| Preposition | UI element | Recommended |
| --- | --- | --- |
| in | dialogs | In the **Alert** dialog, click **OK**. |
| in | fields | In the **Name** field, enter `wsfc-1`. |
| in | lists | In the **Item** list, select **Desktop**. |
| in | menus | In the **File** menu, click **Tools**. |
| in | panes | In the **Metrics** pane, click **New**. |
| in | windows | In the **Task** window, click **Start**. |
| on | pages | On the **Create an instance** page, click **Add**. |
| on | tabs | On the **Edit** tab, click **Save**. |
| on | toolbars | On the **Dashboard** toolbar, click **Edit**. |

### Verbs in procedures

To describe an action on the page, use the following verbs. For each verb, see its entry on the [word list](https://developers.google.com/style/word-list).

- [Click](https://developers.google.com/style/word-list#click)
- [Choose](https://developers.google.com/style/word-list#choose)
- [Drag](https://developers.google.com/style/word-list#drag)
- [Enable](https://developers.google.com/style/word-list#enable)
- [Enter, type](https://developers.google.com/style/word-list#enter)
- Go to (see [scroll](https://developers.google.com/style/word-list#scroll))
- [Hold the pointer over](https://developers.google.com/style/word-list#hold-the-pointer-over)
- [Press](https://developers.google.com/style/word-list#press)
- [Select](https://developers.google.com/style/word-list#select)
- [Tap](https://developers.google.com/style/word-list#tap)
- [Turn on, turn off](https://developers.google.com/style/word-list#turn-on)

For writing procedures, see [Procedures](https://developers.google.com/style/procedures).

## API reference code comments

Source: https://developers.google.com/style/api-reference-comments

When documenting an API, provide a complete API reference, typically generated from source code using document comments that describe all public classes, methods, constants, and other members. Apply these guidelines as appropriate for a given language. This section doesn't specify how to mark up document comments.

See also: [AIP-192: Documentation](https://google.aip.dev/192) in Google's API standards, [Inline API documentation](https://cloud.google.com/apis/design/documentation) in the Google Cloud API design guide, and the style guide for each language.

### Documentation basics

The API reference **must** provide a description for each of the following:

- Every class, interface, struct, and any similar member (such as union types in C++).
- Every constant, field, enum, and typedef.
- Every method, with a description for each parameter, the return value, and any exceptions thrown.

The following are **extremely strong suggestions**. They may not make sense for a particular API or language, but in general, follow them:

- On each unique page (for a class, interface, etc.), include a code sample (~5-20 lines) at the top.
- Put all API names, classes, methods, constants, and parameters in code font, and link each name to its reference page. Most document generators do this automatically.
- Put string literals in code font, enclosed in double quotation marks. For example, XML attribute values might be `"wrap_content"` or `"true"`.
- Make sure the spelling of a class name in documentation matches the code, with capital letters and no spaces (for example, `ActionBar`).
  - Don't make class names plural (`Intents`, `Activities`); instead, add a plural noun (`Intent` objects, `Activity` instances). See [Plural product and feature names](https://developers.google.com/style/pluralization#plural-product-and-feature-names).
  - However, if a class has a name that's a common term, you can refer to it with the corresponding English word, in lowercase and _not_ in code font (activities, action bar).

### Classes, interfaces, structs

In the first sentence of a class description, briefly state the intended purpose or function of the class or interface with information that can't be deduced from the name and signature. In additional documentation, elaborate on how to use the API, including how to invoke or instantiate it, key features, and any best practices or pitfalls.

Many documentation tools extract the first sentence of each class description for a list of all classes, so make it unique and descriptive, yet short. Additionally:

- Don't repeat the class name in the first sentence.
- Don't say "this class will/does ..."
- Don't use a period before the actual end of the sentence, because some generators terminate the "short description" at the first period. For example, some terminate at _e.g._, so use _for example_ instead.

Example first sentence, from Android's [`ActionBar` class](http://developer.android.com/reference/android/app/ActionBar.html):

> _A primary toolbar within the activity that may display the activity title, application-level navigation affordances, and other interactive items._

### Members

Make descriptions for members (constants and fields) as brief as possible. Link to relevant methods that use the constant or field.

Example, the `ActionBar` class's [`DISPLAY_SHOW_HOME`](http://developer.android.com/reference/android/app/ActionBar.html#DISPLAY_SHOW_HOME) constant:

> _Show 'home' elements in this action bar, leaving more space for other navigation elements. This includes logo and icon._
>
> _See also: `setDisplayOptions(int)`, `setDisplayOptions(int, int)`_

### Methods

In the first sentence of a method description, briefly state what action the method performs. In subsequent sentences, explain why and how to use it, state any prerequisites before calling it, give details about exceptions that may occur, and specify any related APIs.

Document any dependencies (such as [Android permissions](http://developer.android.com/guide/topics/security/permissions.html)) needed to call the method, and how it behaves if a dependency is missing (for example, "the method throws a [SecurityException](http://developer.android.com/reference/java/lang/SecurityException.html)" or "the method returns null").

Example, Android's [`Activity.isChangingConfigurations` method](http://developer.android.com/reference/android/app/Activity.html#isChangingConfigurations()):

> _Checks whether this activity is in the process of being destroyed in order to be recreated with a new configuration. This is often used in `onStop` to determine whether the state needs to be cleaned up or if it's passed on to the next instance of the activity using `onRetainNonConfigurationInstance`._

Use present tense for all descriptions, for example:

- _Adds a new bird to the ornithology list._
- _Returns a bird._

#### Description

- If a method performs an operation and returns data, start with a verb describing the operation, for example: _Adds a new bird to the ornithology list and returns the ID of the new entry._
- If it's a "getter" method that returns a boolean, start with "Checks whether ...."
- If it's a "getter" method that returns something other than a boolean, start with "Gets the ...."
- If it has no return value, start with a verb like one of the following:
  - Turning on an ability or setting: "Sets the ...."
  - Updating a property: "Updates the ...."
  - Deleting something: "Deletes the ...."
  - Registering a callback or other element for later reference: "Registers ...."
  - For a callback: "Called by ...." (Usually for a method named starting with "on", such as `onBufferingUpdate`.) For example, "Called by Android when ...." Then, later in the description: "Subclasses implement this method to ...."
- If it's a convenience method that constructs the class object, start with "Creates a ...."

#### Parameters

- Capitalize the first word, and end the sentence or phrase with a period.
- Begin descriptions of non-boolean parameters with "The" or "A" if possible:
  - _The ID of the bird you want to get._
  - _A description of the bird._
- For boolean parameters that tell the API to do or not do something, state what the API does if the parameter is true and if it's false. For example: _`enableCertificateValidation`: If true, validates the SSL certificate before proceeding. If false, trusts the certificate without validating it._
- For boolean parameters that declare the already-established state of something (rather than telling the API to do something), use the format "True if ...; false otherwise." For example: _True if the zoom is set; false otherwise._
- In this context, don't put the words "true" and "false" in code font or quotation marks.
- For parameters with default behavior, explain the behavior for each value or range of values, and then say what the default value is. Use the format _Default:_ to explain the default value.

#### Return values

Be as brief as possible; put detailed information in the class description.

- If the return value is anything other than a boolean, start with "The ...", for example: _The bird specified by the given ID._
- If the return value is a boolean, use "True if ...; false otherwise.", for example: _True if the bird is in the sanctuary; false otherwise._

#### Exceptions

In languages where the reference generator automatically inserts the word "Throws", begin with "If ...":

- _If no key is assigned._

Otherwise, begin with "Thrown when ...":

- _Thrown when no key is assigned._

#### Deprecations

When something is deprecated, tell the user what to use as a replacement. If you track your API with version numbers, mention which version it was first deprecated in.

Only the first sentence of a description appears in the summary section and index, so put the most important information there. Subsequent sentences can explain why something is deprecated and any other information useful to a developer.

If a method is deprecated, tell the reader what to do to make their code work.

##### Examples

> _Deprecated. Use #CameraPose instead._

> _Deprecated. Access this field using the `getField` method._

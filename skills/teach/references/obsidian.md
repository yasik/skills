# Writing the lesson into an Obsidian vault

When the chosen output is Obsidian, the finished lesson becomes a Markdown note
inside the user's vault. This covers locating vaults, picking one, and where and
how to write the note.

## What a vault is

A vault is just a folder of Markdown files. The tell that a folder *is* a vault is
a `.obsidian/` subdirectory (Obsidian's per-vault config). The note you write is a
plain `.md` file anywhere inside that folder.

## Locating the user's vault(s)

Two complementary approaches — try the registry first, fall back to a search.

### 1. The vault registry (fast, authoritative)

Obsidian records every vault the user has opened in a single JSON file:

| OS | Path |
|---|---|
| macOS | `~/Library/Application Support/obsidian/obsidian.json` |
| Linux | `~/.config/obsidian/obsidian.json` |
| Windows | `%APPDATA%\obsidian\obsidian.json` (i.e. `~/AppData/Roaming/obsidian/obsidian.json`) |

Its shape:

```json
{
  "vaults": {
    "a1b2c3d4e5f6": { "path": "/Users/you/Notes", "ts": 1700000000000, "open": true },
    "9f8e7d6c5b4a": { "path": "/Users/you/Work/Second Brain", "ts": 1699000000000 }
  }
}
```

Collect every `vaults.*.path`. The entry with `"open": true` (or the highest `ts`)
is the most recently used — a good default to suggest. On macOS:

```bash
python3 -c "import json,os; d=json.load(open(os.path.expanduser('~/Library/Application Support/obsidian/obsidian.json'))); [print(v['path']) for v in d['vaults'].values()]"
```

### 2. Filesystem search (fallback)

If the registry is missing — vault never opened in the desktop app, a portable
install, or a non-standard config dir — search for `.obsidian/` directories:

```bash
find ~ -maxdepth 4 -type d -name .obsidian -not -path '*/node_modules/*' 2>/dev/null
```

The parent of each `.obsidian/` is a vault root. The depth limit keeps it fast;
widen `-maxdepth` only if nothing turns up.

## Choosing the vault

- **None found** — say so, and ask the user to paste the vault path. If they'd
  rather not, fall back to writing a plain Markdown file in the working directory.
- **Exactly one** — use it.
- **More than one** — ask which to use with the `AskUserQuestion` tool; list them
  by path (or folder name), and offer the most-recently-used one as the default.

## Where to put the note

### Folder

The default home is a `teach/` folder at the vault root. How a user-named folder
combines with it depends on whether the path is absolute or relative:

- **No folder named** — use `teach/` at the vault root.
- **Relative folder** ("store it in `fund/operations`", "put it in `Learning/CS`")
  — nest it *under* the default `teach/` folder, i.e. write to `teach/fund/operations`.
  The `teach/` prefix is the default home; a relative path lives inside it. The only
  exception is when the user explicitly opts out of it ("not under teach", "at the
  vault root", "directly in `Learning/CS`") — then use the relative path from the
  vault root as given.
- **Absolute path** ("save it to `/Users/me/Notes/Work/ops`", "`~/vault/archive`")
  — use it verbatim as the destination folder. No `teach/` prefix; the user has
  named the exact location.

Create the target folder if it doesn't exist: `mkdir -p "<resolved-folder>"`.

### Filename / note title

Obsidian uses the filename as the note's displayed title, so write a readable,
human title — **not** a hyphenated slug. Title-case the topic with spaces preserved:
capitalize the first word and keep proper nouns and acronyms in their natural casing
(Raft, TLS, HTTP), lowercase the rest. Then add `.md`.

- `Tech fund day to day operations.md` — **not** `tech-fund-day-to-day-operations.md`
- `Raft consensus.md`, `How TLS handshakes work.md`

Strip characters illegal in filenames (`/ \ : * ? " < > |`) — spaces are fine and
preferred. If a file with that name already exists, don't clobber it silently —
append a disambiguator (a date or ` 2`) or ask.

## What to write

- The same chaptered Markdown lesson you'd print to the terminal. Obsidian renders
  standard Markdown, GitHub-style tables, and fenced ` ```mermaid ` blocks (built-in
  Mermaid support), so diagrams and tables carry over unchanged.
- **No ANSI codes.** Terminal-only charting (the `terminal-report` renderer) emits
  escape sequences that show as raw bytes in a file — keep charts here as Markdown
  tables or `mermaid`.
- Optional, if it fits the user's setup: a short YAML frontmatter block
  (`title`, `tags: [teach]`, the source links) at the top. Add `[[wikilinks]]` only
  to notes you know exist — don't invent links.

## After writing

Tell the user the exact path you wrote and which vault it's in, so they can open it.
If you created the `teach/` folder, mention that too.

# Engineering

Andrii's full development workflow, packaged as distinct Agent Skills. Start with
`develop` for an end-to-end task, or select one stage directly. Each stage loads
only the references it needs.

## Workflow

```text
Frame -> Understand -> Design -> Build -> Simplify and Verify
  -> Challenge -> Deliver -> Compound

Validated defect -> earliest affected gate -> recheck affected work
```

The [operating loop and gate table](skills/develop/SKILL.md#operating-loop-and-gates)
define the required result and the user's involvement at each stage. Gates are
evidence requirements, not automatic approval prompts. Delivery follows the
requested scope: a report, local change, PR, release, or deployment. PR watching
runs only when requested; learning capture must justify a useful maintained update.

`develop` carries one working context through the relevant stages. Completed
checks and reviews are reused while their inputs remain valid; nested skills
return evidence for one integrated report. Documentation changes precede final
verification and review. A passed gate advances immediately. Questions are for
material missing information, new authority, an explicitly reserved approval, or
plan review. Plan review depends on the operating mode: an engineer iterates on
the plan in the session, a tracker-assigned task posts the plan as an issue
comment and waits for a human reply, and a headless run proceeds and reports the
plan as its first decision.

| Skill | Use it for |
| --- | --- |
| `develop` | Coordinate a complete task, with explicit scope and completion criteria |
| `design` | Minimal interfaces, justified abstractions, and reviewable increments |
| `debug` | Reproduce a failure and correct its cause |
| `optimize` | Compare measured cost, latency, and quality on controlled inputs |
| `coding-style` | Apply explicit Python and TypeScript coding conventions |
| `unit-test-coverage` | Protect meaningful public behavior with independent assertions |
| `simplify-code` | Reduce unnecessary concepts while preserving behavior |
| `review-code` | Validate correctness, intent, architecture, and consequential risks |
| `docs-sync` | Audit and update public documentation against current code |
| `create-pr` | Prepare and open a PR with the editable template |
| `babysit-pr` | Fix valid feedback and CI failures until current-head readiness |
| `release` | Version, changelog, tag, and publish within explicit authority |

Two support skills are included: `dev-docs` for writing review and
`docs-portal` for the target repository's documentation checks. They satisfy the dependencies
of `docs-sync` without requiring Compound Engineering to be installed.

The stages preserve the user's authority. An implementation request is not a
request to deploy. A PR watch is not merge permission. A report-only review stays
read-only. Existing explicit permissions do not need to be requested again.

## Customize

Edit [the PR template](skills/create-pr/references/pr-template.md) to change the
PR headings and checklist. Its initial contents are Andrii's supplied template.
Checks are marked only when evidence supports them; inapplicable items remain
unchecked with an explanation in Test plan.

When a request does not state a delivery mode, `develop` uses the defaults in
its [authority table](skills/develop/SKILL.md#default-authority): an
implementation request ends in local commits on a feature branch, unpushed.

The [coding-style entrypoint](skills/coding-style/SKILL.md) routes to self-contained
language references. The [unit-test skill](skills/unit-test-coverage/SKILL.md)
requires every test to justify a meaningful regression risk. It uses public
interfaces and adaptable Python, TypeScript, and Go package layouts.

## Install locally

This directory is the plugin root. The following commands are installation
instructions; creating the bundle does not install or enable it automatically.
Run them from the root of this skills repository.

### Claude Code

Load the plugin for one session:

```bash
claude --plugin-dir ./plugins/engineering
```

Or add this repository as a local marketplace from Claude Code, then install
`engineering@yasik-skills`. Pass the absolute repository path to the first command:

```text
/plugin marketplace add /absolute/path/to/skills
/plugin install engineering@yasik-skills
```

Invoke `/engineering:develop`, `/engineering:review-code`, or another stage.
Claude's manifest lives at `.claude-plugin/plugin.json` inside this plugin.
See the [Claude plugin reference](https://code.claude.com/docs/en/plugins-reference).

### Codex

The bundle contains `.codex-plugin/plugin.json` with a `./skills/` entry, matching
the local Codex plugin format. Use the host's local-plugin import when available.
For hosts without that import, install the standard skill folders using the
portable method below with destination `~/.agents/skills`.

Select `develop` or the individual installed skill. Plugin namespacing and UI
commands depend on the host. Do not assume a Claude `/plugin` command exists in
Codex. See [Codex skills](https://developers.openai.com/codex/skills/).

### Pi

Load the package for a session without changing installed package configuration:

```bash
pi -e ./plugins/engineering
```

The package's `pi.skills` points to `./skills`. To keep it installed, use
`pi install ./plugins/engineering`. Invoke `/skill:develop` or another skill.
See [Pi packages](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/packages.md)
and [Pi skills](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/skills.md).

### Hermes, OpenCode, and skill-only hosts

Install each complete skill folder, preserving its references. Use one destination
for the target host:

| Host | Global skill directory |
| --- | --- |
| Codex | `~/.agents/skills` |
| Claude Code without plugin loading | `~/.claude/skills` |
| Hermes | `~/.hermes/skills` |
| OpenCode | `~/.config/opencode/skills` |
| Pi without package loading | `~/.pi/agent/skills` |

For example, link the bundle into Hermes. This skips existing names rather than
overwriting an installed skill. A symlink tracks changes in this checkout:

```bash
engineering_source="$PWD/plugins/engineering/skills"
engineering_destination="$HOME/.hermes/skills"
mkdir -p "$engineering_destination"
for skill_directory in "$engineering_source"/*; do
  skill_name="$(basename "$skill_directory")"
  destination="$engineering_destination/$skill_name"
  if [ -e "$destination" ] || [ -L "$destination" ]; then
    printf 'Already present; inspect before replacing: %s\n' "$destination"
  else
    ln -s "$skill_directory" "$destination"
  fi
done
```

Inspect existing name collisions, especially `dev-docs` and generic names such
as `debug`, `design`, and `release`. A skipped existing skill may be a different
version. Prefer the namespaced plugin where available. If the host does not
follow directory symlinks, copy each folder after checking for an existing name.
Refresh its skill catalog or start a new session after installation.

Hermes and OpenCode use the standard folders; they do not need to interpret the
Claude/Codex manifests. See [Hermes skills](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills)
and [OpenCode skills](https://opencode.ai/docs/skills/).

## Portability and limits

The new workflow skills require no proprietary tool names, custom agent roles,
MCP server, scheduler, or external model provider. Use native tools by capability;
fall back to a local sequential pass when delegation is unavailable. Describe
that pass accurately. PR skills require authenticated GitHub access through a
connector or the `gh` CLI; other forges need adaptation.

`docs-sync` and `docs-portal` discover the repository's public documentation,
canonical source, navigation, and build commands. They preserve the existing
layout and toolchain. If no portal exists, source-level checks apply; the skills
do not require adding a website. Language references use generic examples and
adapt to the target's manifests, runtime, and test runner.

No hooks force every skill to run on every task. No watcher runs when the host
cannot sustain it. `babysit-pr` reports when monitoring ends; scheduling requires
an available, authorized host facility.

## Sources and validation

[PROVENANCE.md](PROVENANCE.md) records each skill's origin, license, and
intentional adaptations. The plugin vendors all skill content under its
own root. It has no symlinks or absolute paths to the author's machine.

Run `claude plugin validate ./plugins/engineering` from the repository root to
validate the Claude manifest. Repository formatting/lint checks are `make format`
and `make lint`. File/schema validation does not replace trying a skill on a real
task; no claim of end-to-end PR mutation or model behavior follows from parsing.

### Evals

[`evals/`](evals/) holds a `claude plugin eval` suite in two groups:

- `trigger`: each workflow skill fires for a typical request, and none fires for
  an unrelated question.
- `behavior`: seeded repositories that test the quality bar. The agent must fix
  the implementation rather than weaken a failing assertion, report a
  pre-existing failure instead of presenting the suite as green, keep a
  report-only review read-only, and resolve a routine ambiguity without asking
  while reporting the assumption.

```bash
claude plugin eval ./plugins/engineering --tag trigger --no-publish
claude plugin eval ./plugins/engineering --tag behavior --scaffold \
  --allow-tools Bash Edit Write --no-publish --max-cost-usd 20
```

Behavior cases run each scaffold script on your machine to build a small Git
repository. By default each case runs three times with and without the plugin,
so the report shows the plugin's effect. Trigger cases cap the agent at three
turns, so their runs end with a turn-limit note; only the grader result counts.
PR watching is not covered because it needs a forge mock.

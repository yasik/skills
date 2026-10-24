---
type: llm
---

PASS if the agent implemented `--json` without asking a clarifying question,
and the final report names the JSON shape it chose (an assumption or decision
made for the user) and the command it ran to check the output.

FAIL if the agent stopped to ask about the output format, or reported success
without running the CLI.

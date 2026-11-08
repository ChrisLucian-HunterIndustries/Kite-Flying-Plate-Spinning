---
name: extract-determinism
description: Use when an agent keeps doing the same rule-based step by reasoning (formatting, validating, laying out files, building commit messages, checking a checklist) - to recommend or build a deterministic tool, script, test, or MCP server that does it exactly the same way every time.
---
# Extract Determinism

LLMs are for judgment. Anything with a right answer that a program can compute should be a program.

## Spot candidates
- You (or the agent) did the same multi-step thing twice in a session, or once per prompt.
- The output must be exact: file paths, JSON/XML shape, commit message format, version pins, checklists.
- A mistake was caused by the agent "remembering" a rule instead of a tool enforcing it.
- A reviewer comment that will be repeated ("don't forget to rebuild", "pin the SHA").

## Choose the cheapest deterministic form
| Need | Build |
|---|---|
| A rule about the code or output | A test or lint rule (fails the build when broken) |
| A repeatable command sequence | A script / package.json or mise task |
| A step the agent must take mid-conversation, with validated inputs | An MCP server tool with a strict input schema |
| A workflow with states (e.g. Red, Green, Refactor) | An MCP server that enforces the state machine |

## Steps
1. Search first: is there already a formatter, linter, CLI, or MCP server for it? Recommend that to the user before building.
2. Otherwise write the smallest tool that does the job, with tests (approval tests suit generated output).
3. Wire it in: add it to AGENTS.md, `.vscode/mcp.json`, package scripts, or CI so it actually gets used.
4. Delete the old instruction that asked the LLM to do it by hand.

## Examples
- Commit messages in Risk-Aware Commit Notation -> the `racn` MCP server.
- Test-first discipline -> the `tdd` MCP server.
- "AGENTS.md must match the wind files" -> an approval test.
- "Pasted HTML must be well-formed XML" -> a test that parses it.

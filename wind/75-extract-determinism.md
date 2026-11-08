---
title: Extract Determinism
kind: checklist
default: true
summary: Turn repetitive or rule-based LLM work into deterministic tools, scripts, and MCP servers.
skills: extract-determinism
---
Anything repetitive, rule-based, or that must be exact should not be re-reasoned by the LLM each time.
- Recommend existing deterministic tools (formatters, linters, CLIs, MCP servers) that already do the job.
- Otherwise build one: a script, test, or MCP server, then use it instead of the LLM from then on.
- Keep the LLM for judgment; give it deterministic tools for everything else.

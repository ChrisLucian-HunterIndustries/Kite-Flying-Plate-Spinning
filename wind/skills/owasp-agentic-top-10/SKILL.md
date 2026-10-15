---
name: owasp-agentic-top-10
description: Use when building or reviewing AI agents, tools, MCP servers, prompts, agent memory, or instruction files (AGENTS.md, SKILL.md) - to walk the change through the OWASP Top 10 for Agentic Applications 2026.
---
# OWASP Agentic Top 10 (2026) Walk

Source: https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/

| ID | Risk | Ask of the change | Typical fix |
|---|---|---|---|
| ASI01 | Agent Goal Hijack | Can text from web pages, issues, files, emails, or tool output redirect what the agent is trying to do? | Separate instructions from data; treat retrieved content as untrusted; confirm goal changes with the user |
| ASI02 | Tool Misuse and Exploitation | Can a legitimate tool be called with harmful arguments (delete, send, pay, push) or chained into damage? | Narrow tool scopes; validate arguments; dry-run and approval for destructive actions |
| ASI03 | Identity and Privilege Abuse | Does the agent run with broader credentials than the task needs, or reuse a user's identity beyond its intent? | Per-task least-privilege, short-lived credentials; never put secrets in prompts |
| ASI04 | Agentic Supply Chain Vulnerabilities | Are new MCP servers, plugins, skills, models, or prompt templates from trusted, pinned sources? | Pin versions; review tool manifests; allow-list servers; scan dependencies |
| ASI05 | Unexpected Code Execution | Can model output reach `eval`, a shell, a code interpreter, or a deserializer? | Sandbox execution; no network or secrets in the sandbox; allow-listed commands |
| ASI06 | Memory and Context Poisoning | Can an attacker plant content in memory, RAG stores, or instruction files that changes future behavior? | Provenance on memory writes; review instruction-file diffs; expire and audit memory |
| ASI07 | Insecure Inter-Agent Communication | Are agent-to-agent messages authenticated, integrity-protected, and validated? | Mutual auth; signed messages; schema validation; no implicit trust between agents |
| ASI08 | Cascading Failures | Can one bad output or hallucination propagate through automated pipelines without a check? | Validation gates between steps; circuit breakers; rate and blast-radius limits |
| ASI09 | Human-Agent Trust Exploitation | Could a confident explanation get a human to approve something harmful? | Show the exact action and diff to approve; highlight risk; require evidence |
| ASI10 | Rogue Agents | Could the agent act outside its mandate, conceal actions, or persist on its own? | Full action logs; kill switch; scoped lifetimes; monitor for out-of-policy behavior |

## Instruction files (AGENTS.md, SKILL.md)
- Treat edits to these files as code: review diffs for injected directives (ASI01, ASI06).
- Never instruct an agent to fetch and follow instructions from an unpinned URL (ASI04).

## Output
- One row per finding: ID, severity, location, issue, fix.

---
name: security-review-owasp
description: Use when reviewing a change for security - to run dependency and secret audits, hunt for authorization flaws such as IDOR, and hand off to the OWASP Top 10 walk.
---
# Security Review (OWASP)

## Automated
- Dependencies: `npm audit`, `pip-audit`, `dotnet list package --vulnerable`, or the ecosystem equivalent. Fix or document every high/critical.
- Secrets: scan the diff for keys, tokens, and connection strings.

## Manual
- IDOR: for every id, key, or path a caller supplies, prove the server checks the caller may access that specific object.
- Trust boundaries: list where untrusted input enters (HTTP, files, queues, LLM output) and confirm it is validated there.
- Category walk: use the `owasp-top-10` skill (plus `owasp-agentic-top-10` or `owasp-iot-top-10` when agents or devices are involved).

## Output
- Table of findings: severity, file, line, issue, fix.

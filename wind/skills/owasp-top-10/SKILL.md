---
name: owasp-top-10
description: Use when reviewing a web app, API, or backend change for security - to walk it through each OWASP Top 10:2025 category with concrete questions and fixes.
---
# OWASP Top 10:2025 Walk

Source: https://owasp.org/Top10/2025/

| ID | Risk | Ask of the change | Typical fix |
|---|---|---|---|
| A01 | Broken Access Control | Can a caller change an id, path, or role claim and reach data or actions that are not theirs (IDOR, SSRF, CORS)? | Deny by default; check ownership server-side on every object; allow-list outbound URLs |
| A02 | Security Misconfiguration | Debug modes, verbose errors, default accounts, permissive CORS, open buckets, missing security headers? | Hardened, repeatable config per environment; least-privilege defaults |
| A03 | Software Supply Chain Failures | New or updated dependencies, build plugins, CI actions, or images? Are they pinned, audited, and from trusted sources? | Lockfiles, `npm audit`/`pip-audit`, pinned action SHAs, SBOM, signed artifacts |
| A04 | Cryptographic Failures | Is sensitive data sent or stored in plain text, with weak algorithms, or with hard-coded keys? | TLS everywhere; vetted libraries; strong hashing for passwords; keys in a secret store |
| A05 | Injection | Is any input concatenated into SQL, shell, HTML (`innerHTML`), LDAP, templates, or LLM prompts? | Parameterized queries; context-aware output encoding; `textContent`; allow-list validation |
| A06 | Insecure Design | Missing threat model, rate limits, abuse cases, or trust boundaries for this feature? | Threat-model the flow; add limits and business-rule checks |
| A07 | Authentication Failures | Credential stuffing, weak passwords, missing MFA, session fixation, tokens that never expire? | MFA; rotate sessions on login; short-lived tokens; breached-password checks |
| A08 | Software or Data Integrity Failures | Untrusted deserialization, unsigned updates, or data/code trusted without verifying origin? | Verify signatures and checksums; avoid native deserialization of untrusted data |
| A09 | Security Logging and Alerting Failures | Are logins, access denials, and high-value actions logged and alerted on, without logging secrets or PII? | Structured security events; alerts with owners; redact sensitive fields |
| A10 | Mishandling of Exceptional Conditions | What happens on errors, timeouts, nulls, or partial failures - does it fail open, leak stack traces, or leave inconsistent state? | Fail closed; generic error messages; transactional rollback; test the unhappy paths |

## Output
- One row per finding: ID, severity, file, line, issue, fix. Write "none found" for categories checked and clean.

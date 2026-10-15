---
name: security-review-owasp
description: Use when reviewing a change for security - to walk the OWASP Top 10, run dependency audits, and hunt for authorization flaws such as IDOR.
---
# Security Review (OWASP)

## Automated
- Dependencies: `npm audit`, `pip-audit`, `dotnet list package --vulnerable`, or the ecosystem equivalent. Fix or document every high/critical.
- Secrets: scan the diff for keys, tokens, and connection strings.

## Manual walk (OWASP Top 10)
| Risk | Question to ask of the diff |
|---|---|
| Broken Access Control / IDOR | Can a user change an id in a request and reach another user's data? |
| Cryptographic Failures | Is sensitive data sent or stored unencrypted? |
| Injection / XSS | Is any input concatenated into SQL, shell, HTML (`innerHTML`), or templates? |
| Insecure Design | Are there missing rate limits or trust boundaries? |
| Security Misconfiguration | Debug flags, permissive CORS, default credentials? |
| Vulnerable Components | Covered by the automated audit above. |
| Auth Failures | Session expiry, MFA, credential storage. |
| Integrity Failures | Unsigned updates, untrusted deserialization, CI supply chain. |
| Logging Failures | Are security events logged without logging secrets? |
| SSRF | Can input control a server-side URL fetch? |

## Output
- Table of findings: severity, file, line, issue, fix.

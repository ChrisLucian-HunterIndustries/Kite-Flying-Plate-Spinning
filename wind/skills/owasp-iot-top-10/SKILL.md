---
name: owasp-iot-top-10
description: Use when building or reviewing IoT devices, firmware, gateways, or their cloud, web, and mobile companions - to walk the change through the OWASP IoT Top 10 (2018).
---
# OWASP IoT Top 10 (2018) Walk

Source: https://wiki.owasp.org/index.php/OWASP_Internet_of_Things_Project

| ID | Risk | Ask of the change | Typical fix |
|---|---|---|---|
| I1 | Weak, Guessable, or Hardcoded Passwords | Any shared default, hard-coded, or unchangeable credential or backdoor in firmware or apps? | Unique per-device credentials; force change on setup; no backdoors |
| I2 | Insecure Network Services | Which ports and services are open (telnet, debug, UPnP)? Are they needed and authenticated? | Disable unused services; authenticate and encrypt the rest; fuzz exposed parsers |
| I3 | Insecure Ecosystem Interfaces | Do the cloud API, web portal, and mobile app enforce authN/authZ per device and validate input? | Per-device authorization (no IDOR across devices); input/output filtering; TLS |
| I4 | Lack of Secure Update Mechanism | Are firmware updates signed, verified on device, delivered encrypted, and protected from rollback? | Code signing; secure boot chain; anti-rollback counters; update notifications |
| I5 | Use of Insecure or Outdated Components | Outdated kernels, BusyBox, OpenSSL, SDKs, or untrusted hardware parts? | SBOM for firmware; CVE monitoring; patch cadence; supplier vetting |
| I6 | Insufficient Privacy Protection | What personal data is collected, where is it stored, and is it used only with consent? | Data minimization; consent; retention limits; deletion on reset |
| I7 | Insecure Data Transfer and Storage | Is sensitive data encrypted at rest, in transit, and access-controlled everywhere in the ecosystem? | TLS with certificate validation; encrypted storage; hardware-backed keys |
| I8 | Lack of Device Management | Can the fleet be inventoried, monitored, updated, and securely decommissioned? | Asset inventory; telemetry and alerting; remote update; secure wipe |
| I9 | Insecure Default Settings | Do devices ship insecure, or prevent operators from hardening configuration? | Secure-by-default config; expose hardening options to operators |
| I10 | Lack of Physical Hardening | Are JTAG/UART/SWD debug ports, removable storage, or exposed flash usable by an attacker with physical access? | Disable or lock debug ports; encrypt flash; tamper detection |

## Output
- One row per finding: ID, severity, component (device, firmware, cloud, app), issue, fix.

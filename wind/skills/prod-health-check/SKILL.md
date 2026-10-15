---
name: prod-health-check
description: Use before changing a system that is running somewhere - to capture a baseline of production health (errors, latency, deploy state) so you can tell whether your change made things better or worse.
---
# Prod Health Check

## Steps
1. Identify where the code runs (service, site, package registry, scheduled job). If nothing runs, record "no prod" and stop.
2. Capture a baseline, read-only:
   - Last deploy / release version and whether CI on the default branch is green.
   - Error rate and top errors from logs or monitoring.
   - Latency or job duration trends.
   - Open incidents or alerts.
3. Note anything already broken so it is not blamed on your change.
4. After the change ships, compare against the baseline.

## Guardrails
- Never mutate production while checking it.
- Do not paste secrets or customer data from logs into chat or commits.

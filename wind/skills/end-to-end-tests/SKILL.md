---
name: end-to-end-tests
description: Use after making a change - to prove it works through the real, running system (UI, CLI, API, or built artifact) with an end to end test, not just unit tests.
---
# End to End Tests

An end to end test drives the system from its outermost entry point and asserts on what a user would see.

## Steps
1. Find the entry point a user touches: the page, CLI command, API route, or built file.
2. Reuse the project's existing e2e runner (Playwright, Cypress, `node --test` against the build, etc.) before adding a new one.
3. Write one test for the happy path of the change; add one for the most likely failure path.
4. Run against the real build, not mocks; keep fixtures and test data isolated.
5. Run the suite green before declaring the prompt complete.

## Tips
- Keep e2e tests few and high value; push edge cases down to unit tests.
- If no runner exists, a script that builds and checks the output artifact is a valid first e2e test.
- Flaky e2e tests are bugs: fix the wait or the isolation, never add retries to hide them.

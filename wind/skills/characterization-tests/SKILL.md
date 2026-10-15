---
name: characterization-tests
description: Use before refactoring code that lacks tests - to pin down its current behavior (bugs included) with characterization or approval tests so refactoring is safe.
---
# Characterization Tests

A characterization test records what the code *does*, not what it *should* do.

## Steps
1. Pick the seam: the smallest public entry point that covers the area you will change.
2. Write a test that calls it with representative inputs and asserts on a placeholder value.
3. Run it, let it fail, and paste the actual output in as the expected value (or use an approval-testing library to store a received/approved file).
4. Add inputs until every branch you will touch is executed (check coverage).
5. Run the suite green **before** starting the refactor; keep it green after every step.

## Tips
- Prefer one approval test over many brittle asserts for large outputs.
- Name surprising behavior in the test name instead of fixing it now; fix it later in a separate commit.

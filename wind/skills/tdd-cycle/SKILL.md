---
name: tdd-cycle
description: Use when adding or changing behavior - to drive the change through small Red, Green, Refactor cycles with a failing test first.
---
# TDD Cycle

## Loop
1. **Red** - write the smallest test for the next behavior; run it and watch it fail for the expected reason.
2. **Green** - write the simplest code that passes. Hard-coding is allowed; the next test will force generalization.
3. **Refactor** - remove duplication and improve names with all tests green.
4. Repeat with the next example. Triangulate: add a second example before generalizing.

## Guardrails
- One failing test at a time.
- If a step takes longer than a few minutes, the step is too big - revert and take a smaller one.
- For stateful code, include tests that exercise sequences of calls, not just a single call.

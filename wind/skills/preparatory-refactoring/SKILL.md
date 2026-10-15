---
name: preparatory-refactoring
description: Use when a requested change is awkward to make in the current design - to first refactor (behavior-preserving, tests green) so the change becomes easy, then make the change.
---
# Preparatory Refactoring

"Make the change easy (warning: this may be hard), then make the easy change." - Kent Beck

## Steps
1. Confirm characterization tests exist and pass.
2. Pick the smell from the code smells list that blocks the change.
3. Apply one named refactoring at a time (Extract Function, Move Function, Replace Conditional with Polymorphism, Introduce Parameter Object, ...).
4. Run tests after each step; commit refactorings separately from behavior changes.
5. Stop refactoring as soon as the change is easy - YAGNI applies to design too.

## Pattern hints
- Varying behavior -> Strategy
- Creating families of objects -> Factory
- Wrapping an awkward API -> Adapter / Facade
- Adding behavior without touching a class -> Decorator

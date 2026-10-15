---
name: code-smells-catalog
description: Use when preparing to refactor - to produce a short named list of code smells in the target area that the refactoring step will address.
---
# Code Smells Catalog

Scan the area you will change and list only the smells actually present, each with a location and the refactoring that removes it.

| Smell | Refactoring |
|---|---|
| Long Function | Extract Function |
| Large Class / Long File (>500 lines) | Extract Class, Move Function |
| Duplicated Code | Extract Function, Pull Up Method |
| Long Parameter List | Introduce Parameter Object |
| Primitive Obsession | Replace Primitive with Object |
| Feature Envy | Move Function |
| Data Clumps | Extract Class |
| Shotgun Surgery | Move Function, Combine Functions into Class |
| Divergent Change | Split Phase, Extract Class |
| Switch Statements on type | Replace Conditional with Polymorphism |
| Speculative Generality | Collapse Hierarchy, Inline Function (YAGNI) |
| Mysterious Name | Rename |
| Comments explaining unclear code | Extract Function, Rename |

## Output format
- `<smell>` at `<file>:<symbol>` -> `<refactoring>`

---
name: small-safe-commits
description: Use when committing work - to keep commits tiny, reversible, separated by intent, and labelled with their risk.
---
# Small Safe Commits

## Rules
- One intent per commit: refactoring **or** behavior change **or** tests **or** docs.
- Tests pass before every commit.
- When slicing a large worktree into several commits, order them so each one is green on its own (data and approval targets before the tests that read them), then verify each commit in a throwaway `git worktree`.
- Prefix messages with a risk marker, e.g. Risk-Aware Commit Notation:
  - `.` proven safe (automated refactoring, tests only)
  - `^` validated (tests cover it)
  - `!` risky (behavior change with partial coverage)
  - `@` broken / work in progress
- Followed by an intent letter: `r` refactor, `F` feature, `B` bugfix, `t` test, `d` docs, `e` environment.

## Example
`. r Extract compose function from build script`
`^ F Add skills section to generated AGENTS.md`

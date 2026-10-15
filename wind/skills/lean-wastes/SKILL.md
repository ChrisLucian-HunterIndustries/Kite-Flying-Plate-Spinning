---
name: lean-wastes
description: Use when reviewing a plan, diff, or process for waste - to name which of the seven Lean Software Development wastes is present and the cheapest way to remove it.
---
# Lean Wastes

Poppendieck's seven wastes of software development, with the tell-tale sign and the counter-move.

| Waste | Smell in an agent session | Counter-move |
|---|---|---|
| Partially done work | Uncommitted branches, TODOs, half-wired features | Finish or delete before starting new work |
| Extra features | Options nobody asked for, speculative abstractions | YAGNI - delete it |
| Relearning | Rediscovering the same build command or gotcha | Write a skill or update AGENTS.md |
| Handoffs | Context lost between agents or people | Pass complete context; keep one owner |
| Task switching | Many open threads, nothing finished | Limit work in progress to one item |
| Delays | Waiting on slow tests, reviews, or approvals | Shrink batch size; run targeted tests |
| Defects | Bugs found late | Test first; shift checks left |

## Steps
1. List what was produced in this session.
2. Tag each item with at most one waste from the table.
3. Remove or fix the top waste now; record the rest as follow-ups only if they matter.

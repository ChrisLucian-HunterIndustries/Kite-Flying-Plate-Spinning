---
title: Small Safe Commits
kind: checklist
default: true
summary: Tiny, reversible, risk-labelled commits.
skills: small-safe-commits
mcp: racn
---
Commit in small, safe, reversible steps. Keep refactorings and behavior changes in separate commits.
Run the tests before every commit and state the risk of each commit in its message.
Always commit all work at the end of every prompt using the racn MCP server (Risk-Aware Commit Notation), sliced so every commit stays green.
If racn is not connected, commit with git using the same notation and say so.

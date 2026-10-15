---
name: skill-authoring
description: Use at the end of a task when you wish you had known something at the start - to write a new SKILL.md capturing that knowledge for next time.
---
# Skill Authoring

## Where
- Repository: `.github/skills/<name>/SKILL.md`
- Personal: `~/.copilot/skills/<name>/SKILL.md`

## Template
```markdown
---
name: <kebab-case-name matching the folder>
description: Use when <trigger situation> - to <outcome>.
---
# <Title>

## Steps
1. ...

## Gotchas
- ...
```

## Rules
- The description is the trigger: start with "Use when" and name the situation, not the topic.
- One skill, one job. Keep it under a page.
- Prefer commands and concrete examples over prose.
- Do not duplicate a skill that already exists - update it instead.

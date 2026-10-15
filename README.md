# Kite-Flying-Plate-Spinning
Agentic Instructions bootstrap and associated skills for Kite Flying and Plate Spinning

## 🪁 Wind
Each file in [wind/](./wind) is one element of wind that holds your `AGENTS.md` kite aloft.
Default wind reproduces [AGENTS.md](./AGENTS.md) exactly (guarded by an approval test).

- `kind: principle` - a line in the preamble (e.g. YAGNI)
- `kind: checklist` - a checklist item plus an optional `## Section` (the file body)
- `checklist:` - checklist label when it differs from `title`
- `default: true` - checked by default
- `skills:` - comma-separated skills in [wind/skills/](./wind/skills) that can ride along

Numeric filename prefixes set the order. The id is the filename without prefix.

## Configurator
[configurator/kite-configurator.html](./configurator/kite-configurator.html) is a self-contained, dependency-free snippet:
check wind elements, optionally add their skills, then copy/download `AGENTS.md` and each `SKILL.md`
(save skills to `.github/skills/<name>/SKILL.md`).

### Hosting on Blogger (or similar)
1. Copy the whole contents of `configurator/kite-configurator.html`.
2. Blogger: **Layout -> Add a Gadget -> HTML/JavaScript**, or a post's **HTML view**, and paste.
3. If line breaks get converted to `<br>`, turn off *Settings -> Formatting -> Convert line breaks*.

### Editing wind
1. Edit or add files in `wind/` (and `wind/skills/<name>/SKILL.md`).
2. `npm run build` to regenerate the snippet.
3. `npm test` - fails if the snippet is stale or default wind drifts from `AGENTS.md`.

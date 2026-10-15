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
[configurator/pastable-kite-configurator.html](./configurator/pastable-kite-configurator.html) is the **one file** to paste. Its CSS, markup, script, and every
wind element and skill are inlined - no other files, CDNs, or uploads needed.
Check wind elements, optionally add their skills, then copy/download `AGENTS.md` and each `SKILL.md`
(save skills to `.github/skills/<name>/SKILL.md`).

The other files in `configurator/` (`template.html`, `compose.js`, ...) are build sources. Do not paste those.

### Hosting on Blogger (or similar)
1. Open [configurator/pastable-kite-configurator.html](./configurator/pastable-kite-configurator.html) and copy the whole file (on GitHub: **Raw**, then select all).
2. Blogger: **Layout -> Add a Gadget -> HTML/JavaScript**, or a post's **HTML view**, and paste.
3. If line breaks get converted to `<br>`, turn off *Settings -> Formatting -> Convert line breaks*.

### Editing wind
1. Edit or add files in `wind/` (and `wind/skills/<name>/SKILL.md`).
2. `npm run build` to regenerate `configurator/pastable-kite-configurator.html`.
3. `npm test` - fails if the built file is stale or default wind drifts from `AGENTS.md`.

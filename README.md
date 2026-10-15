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
- `mcp:` - comma-separated MCP servers in [wind/mcp/](./wind/mcp) that can ride along

Numeric filename prefixes set the order. The id is the filename without prefix.

### MCP servers
Each `wind/mcp/<name>.json` holds `name`, `title`, `description`, `repository` (https), and the VS Code
`server` entry. Servers run with `uvx` from a git commit pinned by full SHA (supply-chain safety, OWASP ASI04);
bump the SHA deliberately after reviewing the upstream diff.

| Server | Rides with | Source |
|---|---|---|
| `racn` | Small Safe Commits | [JayBazuzi/RiskAwareCommitNotationMcp](https://github.com/JayBazuzi/RiskAwareCommitNotationMcp) |
| `tdd` | Test-Driven Development | [ChrisLucian-HunterIndustries/TDD-MCP](https://github.com/ChrisLucian-HunterIndustries/TDD-MCP) |

## Configurator
[configurator/pastable-kite-configurator.html](./configurator/pastable-kite-configurator.html) is the **one file** to paste. Its CSS, markup, script, and every
wind element, skill, and MCP server are inlined - no other files, CDNs, or uploads needed.
Check wind elements, optionally add their skills and MCP servers, then copy/download `AGENTS.md`, each `SKILL.md`
(save skills to `.github/skills/<name>/SKILL.md`), and `.vscode/mcp.json` (needs [uv](https://docs.astral.sh/uv/)).
The floating **Download all** button (visible while the configurator is on screen) saves everything as
`kite-agents.zip`, laid out to unzip straight into a repo root: `AGENTS.md`, `.vscode/mcp.json`, `.github/skills/`.

The other files in `configurator/` (`template.html`, `compose.js`, ...) are build sources. Do not paste those.

### Hosting on Blogger (or similar)
1. Open [configurator/pastable-kite-configurator.html](./configurator/pastable-kite-configurator.html) and copy the whole file (on GitHub: **Raw**, then select all).
2. Blogger: **Layout -> Add a Gadget -> HTML/JavaScript**, or a post's **HTML view**, and paste.
3. If line breaks get converted to `<br>`, turn off *Settings -> Formatting -> Convert line breaks*.

### Editing wind
1. Edit or add files in `wind/` (and `wind/skills/<name>/SKILL.md` or `wind/mcp/<name>.json`).
2. `npm run build` to regenerate `configurator/pastable-kite-configurator.html`.
3. `npm test` - fails if the built file is stale or default wind drifts from `AGENTS.md`.

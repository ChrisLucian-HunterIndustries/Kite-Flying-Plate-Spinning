import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import compose from '../configurator/compose.js';
import { loadWindBundle, normalizeEol } from '../configurator/load-winds.mjs';

const root = new URL('../', import.meta.url);
const bundle = loadWindBundle(new URL('wind/', root));
const defaults = bundle.winds.filter((w) => w.default).map((w) => w.id);
const ids = (...names) => names;

test('default winds reproduce AGENTS.md byte-for-byte', () => {
  const expected = normalizeEol(readFileSync(new URL('AGENTS.md', root), 'utf8'));
  assert.equal(compose.composeAgentsMd(bundle.winds, defaults, []), expected);
});

test('no winds yields only the header', () => {
  assert.equal(compose.composeAgentsMd(bundle.winds, [], []), '# Agent Instructions\n');
});

test('principles only omit the checklist manifesto', () => {
  const md = compose.composeAgentsMd(bundle.winds, ids('yagni'), []);
  assert.equal(md, '# Agent Instructions\nFavor YAGNI.\n');
});

test('checklist-only wind without body adds a checklist item but no section', () => {
  const md = compose.composeAgentsMd(bundle.winds, ids('code-smells'), []);
  assert.match(md, /- Prepare a list of code smells/);
  assert.doesNotMatch(md, /## Prepare a list/);
});

test('checklist label can differ from section title', () => {
  const md = compose.composeAgentsMd(bundle.winds, ids('make-it-easy-to-change'), []);
  assert.match(md, /^- Make it easy to change \(which may be hard\) \(refactoring\)$/m);
  assert.match(md, /^## Make it easy to change \(which may be hard\)$/m);
});

test('selection order does not change output order', () => {
  const a = compose.composeAgentsMd(bundle.winds, ids('canary', 'prod-check'), []);
  const b = compose.composeAgentsMd(bundle.winds, ids('prod-check', 'canary'), []);
  assert.equal(a, b);
  assert.ok(a.indexOf('## Prod Check') < a.indexOf('## Canary'));
});

test('skills are listed only when their wind is selected', () => {
  const md = compose.composeAgentsMd(bundle.winds, ids('security-review'), ['security-review-owasp', 'mutation-testing']);
  assert.match(md, /## Skills\n/);
  assert.match(md, /- `security-review-owasp` supports Security Review/);
  assert.doesNotMatch(md, /mutation-testing/);
});

test('included dedupes and records every supporting wind, per add-on key', () => {
  const winds = [
    { id: 'a', title: 'A', kind: 'checklist', skills: ['s'], mcp: ['m'] },
    { id: 'b', title: 'B', kind: 'checklist', skills: ['s'], mcp: [] },
  ];
  assert.deepEqual(compose.included(winds, ['a', 'b'], ['s'], 'skills'), [{ name: 's', winds: ['A', 'B'] }]);
  assert.deepEqual(compose.included(winds, ['a', 'b'], ['m'], 'mcp'), [{ name: 'm', winds: ['A'] }]);
  assert.deepEqual(compose.included(winds, ['b'], ['m'], 'mcp'), []);
});

test('skills section lists every supporting wind', () => {
  const winds = [
    { id: 'a', title: 'A', kind: 'checklist', checklist: 'A', body: '', skills: ['s'] },
    { id: 'b', title: 'B', kind: 'checklist', checklist: 'B', body: '', skills: ['s'] },
  ];
  assert.match(compose.composeAgentsMd(winds, ['a', 'b'], ['s']), /- `s` supports A, B$/m);
});

for (const [id, prefix] of [['owasp-top-10', 'A'], ['owasp-agentic-top-10', 'ASI'], ['owasp-iot-top-10', 'I']]) {
  test(`${id} wind is optional and lists exactly ten risks with a matching skill`, () => {
    const w = bundle.winds.find((x) => x.id === id);
    assert.ok(w, `${id} wind exists`);
    assert.equal(w.default, false);
    assert.equal(w.body.match(new RegExp(`^- ${prefix}\\d+ `, 'gm'))?.length, 10);
    assert.ok(w.skills.includes(id));
  });
}

test('Security Review offers the OWASP Top 10 skill without duplicating its table', () => {
  assert.ok(bundle.winds.find((w) => w.id === 'security-review').skills.includes('owasp-top-10'));
  assert.doesNotMatch(bundle.skills['security-review-owasp'].content, /Broken Access Control/);
});

test('MCP servers are listed only when their wind is selected, after skills', () => {
  const md = compose.composeAgentsMd(bundle.winds, ids('small-safe-commits'), ['small-safe-commits'], ['racn', 'tdd']);
  assert.match(md, /## MCP Servers\nUse these MCP servers/);
  assert.match(md, /^- `racn` supports Small Safe Commits$/m);
  assert.doesNotMatch(md, /`tdd`/);
  assert.ok(md.indexOf('## Skills') < md.indexOf('## MCP Servers'));
});

test('composeMcpJson merges selected servers into VS Code .vscode/mcp.json', () => {
  const json = compose.composeMcpJson(bundle.mcp, ['racn', 'tdd']);
  assert.ok(json.endsWith('}\n'));
  assert.deepEqual(JSON.parse(json), { servers: { racn: bundle.mcp.racn.server, tdd: bundle.mcp.tdd.server } });
  assert.equal(compose.composeMcpJson(bundle.mcp, []), '');
});

for (const [windId, server] of [['small-safe-commits', 'racn'], ['test-driven-development', 'tdd']]) {
  test(`${windId} wind offers the ${server} MCP server`, () => {
    assert.deepEqual(bundle.winds.find((w) => w.id === windId).mcp, [server]);
  });
}

test('every MCP server runs from a git commit pinned by full SHA (supply chain, ASI04)', () => {
  for (const [name, m] of Object.entries(bundle.mcp)) {
    const from = m.server.args[m.server.args.indexOf('--from') + 1];
    assert.match(from, new RegExp(`^git\\+${m.repository.replace(/[.]/g, '\\.')}@[0-9a-f]{40}$`), name);
  }
});

test('skillPath points at the Copilot skills folder', () => {
  assert.equal(compose.skillPath('tdd-cycle'), '.github/skills/tdd-cycle/SKILL.md');
});

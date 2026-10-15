import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseFrontmatter, toWind, loadWindBundle, normalizeEol } from '../configurator/load-winds.mjs';

const wind = (fm, body = 'Body.') => `---\n${fm}\n---\n${body}\n`;

test('normalizeEol converts CRLF to LF', () => {
  assert.equal(normalizeEol('a\r\nb\r\n'), 'a\nb\n');
});

test('parseFrontmatter keeps colons in values and trims surrounding blank lines', () => {
  const { meta, body } = parseFrontmatter('---\ndescription: Use when: x\n---\n\nLine \n\n', 'f');
  assert.equal(meta.description, 'Use when: x');
  assert.equal(body, 'Line ');
});

test('parseFrontmatter rejects missing or malformed frontmatter', () => {
  assert.throws(() => parseFrontmatter('no frontmatter', 'f.md'), /f.md: missing/);
  assert.throws(() => parseFrontmatter('---\nnocolon\n---\n', 'f.md'), /bad frontmatter line/);
});

test('toWind derives id, checklist label, default flag, and skills', () => {
  const w = toWind('42-my-wind.md', wind('title: My Wind\nkind: checklist\ndefault: true\nskills: a, b\nmcp: m'));
  assert.deepEqual(w, {
    id: 'my-wind', title: 'My Wind', checklist: 'My Wind', kind: 'checklist',
    default: true, summary: '', skills: ['a', 'b'], mcp: ['m'], body: 'Body.',
  });
});

test('toWind validates title and kind', () => {
  assert.throws(() => toWind('x.md', wind('kind: checklist')), /title is required/);
  assert.throws(() => toWind('x.md', wind('title: X\nkind: other')), /kind must be/);
});

test('loadWindBundle requires every referenced skill to exist with a matching name', () => {
  const dir = mkdtempSync(join(tmpdir(), 'wind-'));
  try {
    const url = pathToFileURL(dir + '/');
    writeFileSync(join(dir, '01-a.md'), wind('title: A\nkind: checklist\nskills: s'));
    assert.throws(() => loadWindBundle(url), /skill "s" has no/);

    mkdirSync(join(dir, 'skills', 's'), { recursive: true });
    writeFileSync(join(dir, 'skills', 's', 'SKILL.md'), '---\nname: wrong\ndescription: d\n---\n# S\n');
    assert.throws(() => loadWindBundle(url), /name must be "s"/);

    writeFileSync(join(dir, 'skills', 's', 'SKILL.md'), '---\nname: s\ndescription: d\n---\n# S\n');
    const bundle = loadWindBundle(url);
    assert.equal(bundle.winds[0].id, 'a');
    assert.deepEqual(bundle.skills.s, { description: 'd', content: '---\nname: s\ndescription: d\n---\n# S\n' });
    assert.deepEqual(bundle.mcp, {});
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('loadWindBundle requires every referenced MCP server to be fully described', () => {
  const dir = mkdtempSync(join(tmpdir(), 'wind-'));
  const good = {
    name: 'm', title: 'M', description: 'd', repository: 'https://github.com/o/r',
    server: { type: 'stdio', command: 'uvx', args: ['--from', 'git+https://github.com/o/r@abc', 'm'] },
  };
  const writeMcp = (value) => writeFileSync(join(dir, 'mcp', 'm.json'), JSON.stringify(value));
  try {
    const url = pathToFileURL(dir + '/');
    writeFileSync(join(dir, '01-a.md'), wind('title: A\nkind: checklist\nmcp: m'));
    assert.throws(() => loadWindBundle(url), /MCP server "m" has no wind\/mcp\/m.json/);

    mkdirSync(join(dir, 'mcp'));
    writeMcp({ ...good, name: 'x' });
    assert.throws(() => loadWindBundle(url), /m.json: name must be "m"/);
    writeMcp({ ...good, repository: 'http://github.com/o/r' });
    assert.throws(() => loadWindBundle(url), /m.json: repository must be an https URL/);
    writeMcp({ ...good, server: { command: 'uvx' } });
    assert.throws(() => loadWindBundle(url), /m.json: server needs a command and args/);
    writeMcp({ ...good, title: '' });
    assert.throws(() => loadWindBundle(url), /m.json: title and description are required/);

    writeMcp(good);
    const { name, ...rest } = good;
    assert.deepEqual(loadWindBundle(url).mcp, { m: rest });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

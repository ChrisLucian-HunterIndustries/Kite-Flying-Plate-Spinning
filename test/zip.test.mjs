import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { crc32 } from 'node:zlib';
import zip from '../configurator/zip.js';

const files = [
  { path: 'AGENTS.md', content: '# Agent Instructions\n# 🪁\n' },
  { path: '.vscode/mcp.json', content: '{\n  "servers": {}\n}\n' },
  { path: '.github/skills/tdd-cycle/SKILL.md', content: '---\nname: tdd-cycle\n---\nRed, Green, Refactor – done.\n' },
];

test('crc32 matches zlib for ASCII and multi-byte UTF-8', () => {
  for (const text of ['', 'hello', '# 🪁 – ünïcödé']) {
    assert.equal(zip.crc32(new TextEncoder().encode(text)), crc32(text), text);
  }
});

test('an empty archive is just the 22-byte end-of-central-directory record', () => {
  const bytes = zip.createZip([]);
  assert.equal(bytes.length, 22);
  assert.equal(new DataView(bytes.buffer).getUint32(0, true), 0x06054b50);
});

test('Python zipfile reads every path and byte back intact', (t) => {
  const reader = [
    'import sys, zipfile, io, json',
    'z = zipfile.ZipFile(io.BytesIO(sys.stdin.buffer.read()))',
    'assert z.testzip() is None',
    'print(json.dumps({i.filename: z.read(i).decode("utf-8") for i in z.infolist()}))',
  ].join('\n');
  const run = spawnSync('python', ['-c', reader], { input: Buffer.from(zip.createZip(files)) });
  if (run.error) return t.skip('python not available');
  assert.equal(run.status, 0, run.stderr.toString());
  assert.deepEqual(JSON.parse(run.stdout.toString()), Object.fromEntries(files.map((f) => [f.path, f.content])));
});

test('rejects paths that could escape the extraction folder', () => {
  for (const path of ['/etc/passwd', '../x', 'a/../../x', 'a\\b', 'C:/x', '']) {
    assert.throws(() => zip.createZip([{ path, content: '' }]), /unsafe zip path/, path);
  }
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import vm from 'node:vm';
import { buildSnippet, toSafeScriptJson, OUTPUT } from '../configurator/build.mjs';

const snippet = buildSnippet();

test('committed pastable-kite-configurator.html is up to date (run npm run build)', () => {
  assert.equal(readFileSync(OUTPUT, 'utf8').replace(/\r\n/g, '\n'), snippet);
});

test('the single paste-ready file lives in configurator/ and says to paste it', () => {
  assert.equal(OUTPUT.href, new URL('../configurator/pastable-kite-configurator.html', import.meta.url).href);
  assert.match(snippet.split('\n')[0], /^<!-- Kite Configurator: paste this whole file/);
  assert.match(snippet.split('\n')[0], /NOT into Theme > Edit HTML/);
});

test('the template warns not to paste it and points at the built file', () => {
  const firstLine = readFileSync(new URL('../configurator/template.html', import.meta.url), 'utf8').split(/\r?\n/)[0];
  assert.match(firstLine, /DO NOT PASTE/);
  assert.match(firstLine, / pastable-kite-configurator\.html /);
});

test('the zip writer is inlined and a Download all button is wired up', () => {
  assert.match(snippet, /root\.KiteZip = factory\(\)/);
  assert.match(snippet, /data-kc-download="all"/);
});

test('snippet is well-formed XML so Blogger layout gadgets accept it', (t) => {
  const parser = [
    'import sys, xml.etree.ElementTree as ET',
    'ET.fromstring(b"<gadget>" + sys.stdin.buffer.read() + b"</gadget>")',
  ].join('\n');
  const run = spawnSync('python', ['-c', parser], { input: snippet, encoding: 'utf8' });
  if (run.error) return t.skip('python not available');
  assert.equal(run.status, 0, run.stderr);
});

test('inlined code cannot end the CDATA section early', () => {
  assert.equal(snippet.split(']]>').length - 1, 1);
});

test('markup has no empty elements that an XML round-trip could collapse to <tag/>', () => {
  const markup = snippet.slice(0, snippet.indexOf('<script>'));
  assert.deepEqual(markup.match(/<([a-z0-9]+)\b[^<>]*><\/\1>/g) ?? [], []);
});

test('snippet is a self-contained fragment for Blogger', () => {
  assert.doesNotMatch(snippet, /<html|<head|<body|<link/i);
  assert.doesNotMatch(snippet, /\s(src|href)\s*=\s*["']?(https?:)?\/\//i);
  assert.doesNotMatch(snippet, /__KITE_/);
  assert.match(snippet, /\/\/<!\[CDATA\[[\s\S]*\/\/\]\]>/);
});

test('embedded data cannot break out of the script or CDATA block', () => {
  const json = toSafeScriptJson({ evil: '</script><script>alert(1)</script>]]>&\u2028' });
  assert.doesNotMatch(json, /[<>&\u2028]/);
  assert.deepEqual(JSON.parse(json), { evil: '</script><script>alert(1)</script>]]>&\u2028' });
});

test('inline script parses as JavaScript', () => {
  const script = /<script>\n([\s\S]*?)<\/script>/.exec(snippet)[1];
  assert.doesNotThrow(() => new vm.Script(script));
});

test('every script tag is closed exactly once', () => {
  assert.equal((snippet.match(/<script/g) || []).length, (snippet.match(/<\/script>/g) || []).length);
});

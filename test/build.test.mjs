import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { buildSnippet, toSafeScriptJson, OUTPUT } from '../configurator/build.mjs';

const snippet = buildSnippet();

test('committed kite-configurator.html is up to date (run npm run build)', () => {
  assert.equal(readFileSync(OUTPUT, 'utf8').replace(/\r\n/g, '\n'), snippet);
});

test('snippet is a self-contained fragment for Blogger', () => {
  assert.doesNotMatch(snippet, /<html|<head|<body|<link|src=|https?:\/\//i);
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

/* Minimal dependency-free ZIP writer (stored, UTF-8 names). UMD: inlined into the Blogger snippet and required by Node tests. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.KiteZip = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var UTF8_FLAG = 0x0800;
  var DOS_DATE_1980_01_01 = 0x0021;

  var CRC_TABLE = (function () {
    var table = new Uint32Array(256);
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[n] = c >>> 0;
    }
    return table;
  })();

  function crc32(bytes) {
    var crc = 0xffffffff;
    for (var i = 0; i < bytes.length; i++) crc = CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
    return (crc ^ 0xffffffff) >>> 0;
  }

  function assertSafePath(path) {
    var unsafe = !path || path.charAt(0) === '/' || path.indexOf('\\') >= 0 || /^[A-Za-z]:/.test(path)
      || path.split('/').indexOf('..') >= 0;
    if (unsafe) throw new Error('unsafe zip path: "' + path + '"');
  }

  function header(signature, fields) {
    var view = new DataView(new ArrayBuffer(4 + fields.reduce(function (n, f) { return n + f[1]; }, 0)));
    view.setUint32(0, signature, true);
    var at = 4;
    fields.forEach(function (f) {
      if (f[1] === 2) view.setUint16(at, f[0], true); else view.setUint32(at, f[0], true);
      at += f[1];
    });
    return new Uint8Array(view.buffer);
  }

  function entryFields(entry) {
    return [[20, 2], [UTF8_FLAG, 2], [0, 2], [0, 2], [DOS_DATE_1980_01_01, 2],
      [entry.crc, 4], [entry.data.length, 4], [entry.data.length, 4], [entry.name.length, 2], [0, 2]];
  }

  function createZip(files) {
    var encoder = new TextEncoder();
    var chunks = [];
    var central = [];
    var offset = 0;
    files.forEach(function (file) {
      assertSafePath(file.path);
      var entry = { name: encoder.encode(file.path), data: encoder.encode(file.content) };
      entry.crc = crc32(entry.data);
      var local = header(0x04034b50, entryFields(entry));
      chunks.push(local, entry.name, entry.data);
      central.push(header(0x02014b50, [[20, 2]].concat(entryFields(entry), [[0, 2], [0, 2], [0, 2], [0, 4], [offset, 4]])), entry.name);
      offset += local.length + entry.name.length + entry.data.length;
    });
    var centralSize = central.reduce(function (n, c) { return n + c.length; }, 0);
    var end = header(0x06054b50, [[0, 2], [0, 2], [files.length, 2], [files.length, 2], [centralSize, 4], [offset, 4], [0, 2]]);
    var parts = chunks.concat(central, [end]);
    var out = new Uint8Array(parts.reduce(function (n, p) { return n + p.length; }, 0));
    parts.reduce(function (at, p) { out.set(p, at); return at + p.length; }, 0);
    return out;
  }

  return { createZip: createZip, crc32: crc32 };
});

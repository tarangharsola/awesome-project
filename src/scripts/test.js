const { test } = require('tap');
const { resolve } = require('path');
const { readFileSync } = require('fs');

module.exports = function (tap) {
  tap.test('editor functionality', function (t) {
    const editor = require('./editor');
    const editorHtml = readFileSync(resolve(__dirname, 'index.html'), 'utf8');
    t.ok(editorHtml.includes('<div id="editor">'), 'Editor HTML rendered correctly');
    t.end();
  });
};
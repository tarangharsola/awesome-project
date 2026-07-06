const { test } = require('tap');
const { build } = require('./build');

module.exports = function test() {
  test('editor functionality', function(t) {
    const editor = require('./editor');
    t.ok(editor);
  });
};
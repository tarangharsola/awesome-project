const { test } = require('tap');
const { build } = require('./build');

module.exports = function (tap) {
  tap.test('editor functionality', function (t) {
    build(t);
    t.end();
  });
};
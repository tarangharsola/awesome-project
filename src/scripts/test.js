const { test } = require('tap');
const { build } = require('./ci');

build();

test('build script runs without errors', (t) => {
  t.pass('build script runs without errors');
  t.end();
});

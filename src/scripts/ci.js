const { spawnSync } = require('child_process');
const { test } = require('tap');

const buildScript = require('./build.js');

test('build script', (t) => {
  const buildResult = buildScript();
  t.ok(buildResult.success);
  t.end();
});

test('test script', (t) => {
  const testResult = require('./test.js');
  t.ok(testResult.success);
  t.end();
});
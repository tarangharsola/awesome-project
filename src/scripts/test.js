const { spawnSync } = require('child_process');
const { test } = require('tap');

const buildScript = require('./build.js');

test('test script', (t) => {
  const testResult = spawnSync('jest', ['--config', 'jest.config.js']);
  t.ok(testResult.status === 0);
  t.end();
});
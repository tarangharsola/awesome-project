const { test } = require('ava');
const { join } = require('path');
const { resolve } = require('path');
const { readFileSync } = require('fs');
const { existsSync } = require('fs');
const { spawnSync } = require('child_process');

const buildDir = join(__dirname, 'build');
const testDir = join(__dirname, 'test');

test('test directory exists', t => {
  t.true(existsSync(testDir));
});

test('build directory exists', t => {
  t.true(existsSync(buildDir));
});

test('test files exist', t => {
  const testFiles = readFileSync(join(testDir, 'test.txt'), 'utf8').split('\n');
  testFiles.forEach(file => {
    t.true(existsSync(resolve(testDir, file)));
  });
});

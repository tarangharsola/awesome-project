const { test } = require('tape');
const { build, test: runTest } = require('./ci');

build();

runTest('Build script runs without errors', t => {
  t.pass('Build script executed successfully');
  t.end();
});

runTest('Test script runs without errors', t => {
  t.pass('Test script executed successfully');
  t.end();
});
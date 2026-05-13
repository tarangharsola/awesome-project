const assert = require('assert');
const { join } = require('path');
const { resolve } = require('path');
const { spawnSync } = require('child_process');

const buildScript = resolve(__dirname, '../scripts/build.js');
const testScript = resolve(__dirname, '../scripts/test.js');

describe('Build and tests', () => {
  it('should build successfully', () => {
    const buildOutput = spawnSync('node', [buildScript]).stdout.toString();
    assert(buildOutput.includes('Build successful'), 'Build failed');
  });

  it('should run tests successfully', () => {
    const testOutput = spawnSync('node', [testScript]).stdout.toString();
    assert(testOutput.includes('Tests successful'), 'Tests failed');
  });
});
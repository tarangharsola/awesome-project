const { spawnSync } = require('child_process');
const { execSync } = require('child_process');
const { test, describe, it } = require('jest');

const buildScript = require('./build');

describe('build script', () => {
  it('should build the application', () => {
    const result = buildScript();
    expect(result).toBe('build successful');
  });
});

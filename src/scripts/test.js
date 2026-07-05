const { test, describe, it } = require('jest');
const { execSync } = require('child_process');

const buildScript = require('./build');

describe('tests', () => {
  it('should run tests', () => {
    const result = execSync('jest');
    expect(result).toBe('test successful');
  });
});

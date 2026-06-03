const { execSync } = require('child_process');
const { test, describe } = require('jest');

describe('build script', () => {
  it('should build the application', () => {
    const buildOutput = execSync('npm run build');
    expect(buildOutput).toBeTruthy();
  });
});
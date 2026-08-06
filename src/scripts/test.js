const { spawnSync } = require('child_process');
const { execSync } = require('child_process');

module.exports = function test() {
  const testCommand = 'jest';

  console.log('Running tests...');

  const testResult = spawnSync(testCommand, { shell: true });
  if (testResult.status !== 0) {
    console.error('Tests failed.');
    process.exit(1);
  }

  console.log('Tests successful.');
};
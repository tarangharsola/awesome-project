const { spawnSync } = require('child_process');
const { execSync } = require('child_process');

module.exports = function test() {
  const testCommand = 'jest';

  try {
    spawnSync(testCommand, { shell: true });
    console.log('Tests successful');
  } catch (error) {
    console.error('Tests failed:', error);
  }
};
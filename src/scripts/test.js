const { spawnSync } = require('child_process');
const { execSync } = require('child_process');

module.exports = function test() {
  const test = spawnSync('jest');
  if (test.status !== 0) {
    console.error('Tests failed');
    process.exit(1);
  }
};
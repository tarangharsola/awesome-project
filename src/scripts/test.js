const { spawnSync } = require('child_process');
const { execSync } = require('child_process');

module.exports = function test() {
  const build = spawnSync('npm', ['run', 'build'], { stdio: 'inherit' });
  if (build.status !== 0) {
    process.exit(build.status);
  }
  const test = spawnSync('jest', { stdio: 'inherit' });
  if (test.status !== 0) {
    process.exit(test.status);
  }
  console.log('Tests successful');
};
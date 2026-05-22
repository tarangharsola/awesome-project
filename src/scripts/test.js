const { spawnSync } = require('child_process');
const { execSync } = require('child_process');

module.exports = function test() {
  const build = spawnSync('npm', ['run', 'build'], { stdio: 'inherit' });
  if (build.status !== 0) {
    process.exit(1);
  }
  const test = spawnSync('jest', { stdio: 'inherit' });
  if (test.status !== 0) {
    process.exit(1);
  }
};

const { spawnSync } = require('child_process');
const { test } = require('tap');

module.exports = function ci() {
  const build = spawnSync('npm', ['run', 'build'], { stdio: 'inherit' });
  if (build.status !== 0) {
    process.exit(build.status);
  }
  const testRun = spawnSync('npm', ['run', 'test'], { stdio: 'inherit' });
  if (testRun.status !== 0) {
    process.exit(testRun.status);
  }
};
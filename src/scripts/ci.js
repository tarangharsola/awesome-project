const { spawnSync } = require('child_process');
const { test } = require('tap');

module.exports = function (tap) {
  const build = spawnSync('npm', ['run', 'build'], { stdio: 'inherit' });
  if (build.status !== 0) {
    tap.fail('Build failed');
  }
  const testRunner = spawnSync('npm', ['run', 'test'], { stdio: 'inherit' });
  if (testRunner.status !== 0) {
    tap.fail('Tests failed');
  }
};
const { spawnSync } = require('child_process');
const { execSync } = require('child_process');

module.exports = function ci() {
  const build = spawnSync('npm', ['run', 'build']);
  if (build.status !== 0) {
    console.error('Build failed');
    process.exit(1);
  }

  const test = spawnSync('npm', ['run', 'test']);
  if (test.status !== 0) {
    console.error('Tests failed');
    process.exit(1);
  }
};
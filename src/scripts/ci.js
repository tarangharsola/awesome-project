const { spawnSync } = require('child_process');
const { execSync } = require('child_process');

module.exports = function ci() {
  const build = spawnSync('npm', ['run', 'build'], { stdio: 'inherit' });
  if (build.status !== 0) {
    process.exit(build.status);
  }
  const test = spawnSync('npm', ['run', 'test'], { stdio: 'inherit' });
  if (test.status !== 0) {
    process.exit(test.status);
  }
  console.log('CI validation successful');
};
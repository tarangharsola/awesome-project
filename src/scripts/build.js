const { spawnSync } = require('child_process');
const { execSync } = require('child_process');

module.exports = function build() {
  const build = spawnSync('webpack', { stdio: 'inherit' });
  if (build.status !== 0) {
    process.exit(build.status);
  }
  console.log('Build successful');
};
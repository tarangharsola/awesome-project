const { spawnSync } = require('child_process');
const { execSync } = require('child_process');

module.exports = function build() {
  const build = spawnSync('webpack', ['--mode', 'production']);
  if (build.status !== 0) {
    console.error('Build failed');
    process.exit(1);
  }
};
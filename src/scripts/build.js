const { spawnSync } = require('child_process');

module.exports = function build() {
  // Run build script
  spawnSync('npm', ['run', 'build'], { stdio: 'inherit' });
};
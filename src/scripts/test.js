const { spawnSync } = require('child_process');

module.exports = function test() {
  // Run tests
  spawnSync('npm', ['run', 'test'], { stdio: 'inherit' });
};
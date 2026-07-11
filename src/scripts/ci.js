const { spawnSync } = require('child_process');
const { test } = require('tap');

module.exports = function() {
  test('build script', t => {
    const build = spawnSync('npm', ['run', 'build']);
    t.ok(build.status === 0, 'Build script should exit with code 0');
    t.end();
  });
};
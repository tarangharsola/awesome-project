const { execSync } = require('child_process');
const { test } = require('tap');

module.exports = function ci() {
  test('build script', function(t) {
    const build = execSync('npm run build', { stdio: 'inherit' });
    t.ok(build);
  });
};
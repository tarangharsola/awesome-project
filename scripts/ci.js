const { execSync } = require('child_process');
const { test } = require('tap');

module.exports = function (tap) {
  tap.test('build script', function (t) {
    try {
      const buildOutput = execSync('npm run build', { stdio: 'pipe' });
      t.pass('Build script executed successfully');
    } catch (error) {
      t.fail('Build script failed');
    }
    t.end();
  });
};
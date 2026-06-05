const { execSync } = require('child_process');
const { test } = require('tap');

module.exports = function (tap) {
  tap.test('build script', function (t) {
    try {
      execSync('npm run build', { stdio: 'ignore' });
      t.pass('build script executed successfully');
    } catch (err) {
      t.fail('build script failed');
    }
    t.end();
  });
};
const { execSync } = require('child_process');
const { test } = require('tap');

module.exports = function ci() {
  test('build script runs without errors', function(t) {
    const buildScript = 'npm run build';
    try {
      execSync(buildScript, { stdio: 'inherit' });
      t.pass('build script ran without errors');
    } catch (error) {
      t.fail('build script failed with error: ' + error);
    }
  });
};
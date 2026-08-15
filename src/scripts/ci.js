const { execSync } = require('child_process');
const { test } = require('tap');

module.exports = function (t) {
  t.test('build script', function (t) {
    const buildOutput = execSync('npm run build', { stdio: 'pipe' });
    t.ok(buildOutput.toString().includes('build successful'), 'build script executed successfully');
    t.end();
  });
};
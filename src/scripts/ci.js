const { execSync } = require('child_process');
const { test } = require('tap');
test('build script', t => {
  try {
    execSync('npm run build', { stdio: 'inherit' });
    t.pass('build script executed successfully');
  } catch (err) {
    t.fail('build script failed');
  }
  t.end();
});

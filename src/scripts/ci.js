const { execSync } = require('child_process');
const { test } = require('tap');
test('build script', async (t) => {
  try {
    const build = execSync('npm run build', { stdio: 'inherit' });
    t.pass('Build script executed successfully');
  } catch (error) {
    t.fail('Build script failed');
  }
});
test('test script', async (t) => {
  try {
    const test = execSync('npm run test', { stdio: 'inherit' });
    t.pass('Test script executed successfully');
  } catch (error) {
    t.fail('Test script failed');
  }
});
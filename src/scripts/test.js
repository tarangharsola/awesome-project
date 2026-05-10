const { test } = require('tap');
const { join } = require('path');
const { execSync } = require('child_process');

const buildDir = join(__dirname, 'build');

test('build', (t) => {
  t.ok(require.resolve(join(buildDir, 'index.js')));
  t.end();
});

test('test', (t) => {
  const testOutput = execSync('npm run test', { shell: true, stdio: 'pipe' });
  t.ok(testOutput.toString().includes('OK'));
  t.end();
});
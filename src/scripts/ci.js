const { spawnSync } = require('child_process');
const { test } = require('ava');

const build = spawnSync('npm', ['run', 'build']);
if (build.status !== 0) {
  process.exit(build.status);
}

test('build script runs without errors', t => {
  t.pass();
});

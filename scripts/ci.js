import { spawnSync } from 'child_process';
import { test } from 'tap';

test('build script', async (t) => {
  const result = spawnSync('npm', ['run', 'build']);
  t.ok(result.status === 0);
});

test('test script', async (t) => {
  const result = spawnSync('npm', ['run', 'test']);
  t.ok(result.status === 0);
});

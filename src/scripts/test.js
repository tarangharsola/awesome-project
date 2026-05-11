// eslint-disable-next-line
import { test } from 'tape';
import { resolve } from 'path';

const testScript = resolve(__dirname, '../scripts/test.js');

test('basic tests', async t => {
  const buildScript = resolve(__dirname, '../scripts/build.js');
  const testCommand = `node ${buildScript} test`;
  const output = await execa(testCommand);
  t.ok(output.stdout.includes('passed'));
});

export default test;
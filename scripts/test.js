// eslint-disable-next-line
import { test } from 'tape';
import { ci } from './ci';

test('build and test', async t => {
  const { build, test } = await ci();
  t.equal(build.toString(), 'build output', 'build output is correct');
  t.equal(test.toString(), 'test output', 'test output is correct');
  t.end();
})
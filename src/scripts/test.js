// eslint-disable-next-line
import { test } from 'tape';

test('App renders correctly', async t => {
  const app = await import('./App.test.tsx');
  t.ok(app.default);
  t.end();
});
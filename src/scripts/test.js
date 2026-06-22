// eslint-disable-next-line
import { test } from 'tape';

export default function test() {
  test('editor', t => {
    const editor = new Editor();
    t.ok(editor instanceof Editor);
    t.end();
  });
}
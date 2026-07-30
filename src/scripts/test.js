// eslint-disable-next-line
import { test } from 'tape';

export default function test() {
  test('Editor renders correctly', t => {
    const editor = new Editor();
    t.ok(editor.render(), 'Editor rendered correctly');
    t.end();
  });
}
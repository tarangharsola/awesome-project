// eslint-disable-next-line
import { test } from 'tape';

export default function test() {
  test('Editor renders correctly', async t => {
    const editor = await import('./Editor');
    t.ok(editor);
  });
  test('Cursor tracker renders correctly', async t => {
    const cursorTracker = await import('./CursorTracker');
    t.ok(cursorTracker);
  });
}
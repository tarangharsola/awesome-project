{"import { test } from 'jest';

test('editor works', () => {
  const editor = new Editor();
  expect(editor.getValue()).toBe('');
});
}
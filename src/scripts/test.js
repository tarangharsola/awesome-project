// eslint-disable-next-line
import { test } from 'jest';

export default function test() {
  test('editor renders', () => {
    const editor = document.getElementById('editor');
    expect(editor).toBeInTheDocument();
  });
}
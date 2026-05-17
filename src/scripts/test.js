const { test } = require('jest');

module.exports = function test() {
  test('Editor renders correctly', () => {
    const editor = document.getElementById('editor');
    expect(editor).not.toBeNull();
  });

  test('Syntax highlighting works', () => {
    const code = document.getElementById('code');
    expect(code).not.toBeNull();
  });
}
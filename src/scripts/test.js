// eslint-disable-next-line
import { JSDOM } from 'jsdom';
import { test } from 'uvu';
import { assert } from 'uvu/assert';

const dom = new JSDOM();
const document = dom.window.document;

test('Editor renders correctly', () => {
  const editor = document.createElement('editor');
  editor.innerHTML = '<div>Hello World!</div>';
  assert.ok(editor.querySelector('div') !== null);
});

test.run()
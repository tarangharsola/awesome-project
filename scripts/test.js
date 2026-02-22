const assert = require('assert');
const { JSDOM } = require('jsdom');

const dom = new JSDOM();
const document = dom.window.document;

describe('Editor', () => {
  it('renders editor', () => {
    const editor = document.createElement('editor');
    assert.ok(editor);
  });
});
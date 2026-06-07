const assert = require('assert');
const fs = require('fs');

describe('Editor', () => {
  it('should render editor', () => {
    const editor = require('./Editor');
    assert.ok(editor);
  });
});
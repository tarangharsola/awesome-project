const assert = require('assert');
const fs = require('fs');

describe('Collaborative Editor', () => {
  it('should run without errors', () => {
    assert.doesNotThrow(() => {
      require('./main.js');
    });
  });
});
const assert = require('assert');
const fs = require('fs');

describe('Editor', () => {
  it('should render editor', () => {
    const editor = require('./Editor');
    assert(editor);
  });
});

describe('WebSocket', () => {
  it('should establish connection', () => {
    const WebSocket = require('./WebSocket');
    const ws = new WebSocket();
    assert(ws);
  });
});
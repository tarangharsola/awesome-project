const assert = require('assert');
const fs = require('fs');
const path = require('path');

const testEditor = require('./testEditor');
const testWebSocket = require('./testWebSocket');

describe('Editor', () => {
  it('should render editor', () => {
    const editor = testEditor();
    assert.ok(editor);
  });
});

describe('WebSocket', () => {
  it('should establish connection', () => {
    const webSocket = testWebSocket();
    assert.ok(webSocket);
  });
});
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const test = () => {
  try {
    const editor = require('./editor');
    const users = require('./users');
    const webSocket = require('./webSocket');

    const editorInstance = editor.createEditor();
    const usersInstance = users.createUserList();
    const webSocketInstance = webSocket.createWebSocket();

    assert.ok(editorInstance);
    assert.ok(usersInstance);
    assert.ok(webSocketInstance);
  } catch (error) {
    console.error(error);
  }
};

test();
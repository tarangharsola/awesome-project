const { test } = require('tape');
const { join } = require('path');
const { resolve } = require('path');
const { readFileSync } = require('fs');

const testDir = resolve(__dirname, 'tests');

test('Editor functionality', t => {
  // Test editor functionality
  const editor = require('./editor');
  const code = readFileSync(join(testDir, 'editor.test.js'), 'utf8');
  editor(code);
  t.end();
});
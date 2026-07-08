const { test } = require('jest');
const { resolve } = require('path');
const { existsSync } = require('fs');

module.exports = function test() {
  const testScript = resolve(__dirname, '../scripts/test.js');
  if (existsSync(testScript)) {
    console.log('Running tests...');
    test();
  } else {
    console.log('Test script not found.');
  }
};
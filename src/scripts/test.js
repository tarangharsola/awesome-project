const { test } = require('tape');
const { join } = require('path');
const buildScript = require('./build.js');

module.exports = function test() {
  console.log('Running tests...');
  buildScript();
  console.log('Tests complete.');
};
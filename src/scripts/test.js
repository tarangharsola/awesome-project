const { test, describe } = require('jest');
const { join } = require('path');
const { readFileSync } = require('fs');
const { resolve } = require('path');

const buildScript = require('./ci').default;

describe('build script', () => {
  it('should build the app', () => {
    buildScript();
  });
});
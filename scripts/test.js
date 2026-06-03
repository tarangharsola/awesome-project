const { test, describe } = require('jest');
const { join } = require('path');
const { resolve } = require('path');

const rootDir = resolve(__dirname, '..');
const testDir = join(rootDir, 'src', 'tests');

describe('editor tests', () => {
  it('should render editor', () => {
    // TODO: implement test
  });
});
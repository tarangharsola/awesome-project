const assert = require('assert');
const fs = require('fs');
const path = require('path');

const testDir = path.join(__dirname, 'tests');
const testFiles = fs.readdirSync(testDir);

testFiles.forEach((file) => {
  const filePath = path.join(testDir, file);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const expectedContent = require(filePath);
  assert.strictEqual(fileContent, expectedContent);
});
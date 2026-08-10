const { execSync } = require('child_process');
const { resolve } = require('path');
const { readFileSync } = require('fs');

module.exports = function() {
  const buildScript = readFileSync(resolve(__dirname, '../scripts/build.js'), 'utf8');
  const testScript = readFileSync(resolve(__dirname, '../scripts/test.js'), 'utf8');
  const testResults = execSync('jest', { stdio: 'pipe' });
  if (testResults.status !== 0) {
    throw new Error('Tests failed');
  }
  execSync(buildScript);
};
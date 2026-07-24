const childProcess = require('child_process');
const fs = require('fs');

module.exports = function runTests() {
  const testResults = childProcess.execSync('jest', { stdio: 'pipe' })
    .toString()
    .split('\n')
    .filter(line => line.includes('PASS') || line.includes('FAIL'))
    .map(line => line.trim());

  const testSummary = testResults.join('\n');
  fs.writeFileSync('test-results.txt', testSummary);
};
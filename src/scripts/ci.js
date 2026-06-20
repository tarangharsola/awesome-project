const childProcess = require('child_process');
const fs = require('fs');

module.exports = function runTests() {
  const testResults = childProcess.execSync('jest', { stdio: 'inherit' });
  if (testResults.status !== 0) {
    process.exit(1);
  }
};
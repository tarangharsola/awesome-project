const childProcess = require('child_process');
const fs = require('fs');

module.exports = function() {
  // Run tests
  childProcess.execSync('jest');
  // Build the app
  childProcess.execSync('npm run build');
};
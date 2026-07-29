const childProcess = require('child_process');
const fs = require('fs');

module.exports = function ci() {
  // Run tests and build script
  childProcess.execSync('jest');
  childProcess.execSync('npm run build');
};
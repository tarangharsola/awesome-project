// This is a basic CI script to validate the app
const childProcess = require('child_process');
const fs = require('fs');

module.exports = function() {
  // Run tests and build script
  childProcess.execSync('npm run test && npm run build');
};
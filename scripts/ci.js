// Import required modules
const childProcess = require('child_process');
const fs = require('fs');

// Define build script
module.exports = function build() {
  // Run tests and build the app
  childProcess.execSync('npm run test');
  childProcess.execSync('npm run build');
};
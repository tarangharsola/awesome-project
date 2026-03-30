// Import required modules
const childProcess = require('child_process');
const fs = require('fs');

// Define build script
function build() {
  // Run tests
  childProcess.execSync('jest');
  // Build application
  childProcess.execSync('npm run build');
}

// Export build function
module.exports = build;
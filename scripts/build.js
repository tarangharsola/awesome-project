// Import required modules
const childProcess = require('child_process');

// Define build script
module.exports = function buildScript() {
  // Run build process
  childProcess.execSync('webpack');
};
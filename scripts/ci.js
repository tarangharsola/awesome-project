// Import required modules
const childProcess = require('child_process');

// Define CI script
module.exports = function ciScript() {
  // Run tests and build script
  childProcess.execSync('npm test && npm run build');
};
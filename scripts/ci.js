// Import required modules
const childProcess = require('child_process');

// Run tests and build script
module.exports = () => {
  childProcess.execSync('npm run build');
  childProcess.execSync('npm run test');
};
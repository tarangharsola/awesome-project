// This is a basic CI script to validate the app
const { execSync } = require('child_process');

module.exports = function ci() {
  // Run tests and build script
  execSync('npm run test');
  execSync('npm run build');
};
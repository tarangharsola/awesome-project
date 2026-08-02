// This is a basic CI script to validate the app
const { execSync } = require('child_process');

module.exports = function() {
  // Run tests and build script
  execSync('jest');
  execSync('npm run build');
};
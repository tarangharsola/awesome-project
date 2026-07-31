// This script is used for continuous integration and validation
const { execSync } = require('child_process');

module.exports = function() {
  // Run tests and build script
  execSync('npm test');
  execSync('npm run build');
};
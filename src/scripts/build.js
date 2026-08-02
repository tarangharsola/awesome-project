// This is a basic build script to compile the app
const { execSync } = require('child_process');

module.exports = function() {
  // Run build process
  execSync('npm run build');
};
// Import required modules
const { execSync } = require('child_process');

// Run tests and build script
module.exports = function() {
  console.log('Running tests...');
  execSync('jest');
  console.log('Building script...');
  execSync('npm run build');
};
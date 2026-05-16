// Import required modules
const { execSync } = require('child_process');

// Define test and build scripts
const testScript = 'node src/scripts/ci.js';
const buildScript = 'node src/scripts/build.js';

// Run tests and build script on CI
module.exports = () => {
  console.log('Running tests...');
  execSync(testScript);
  console.log('Building project...');
  execSync(buildScript);
};
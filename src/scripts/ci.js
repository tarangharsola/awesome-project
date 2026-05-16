// Import required modules
const { execSync } = require('child_process');

// Define test and build scripts
const testScript = 'jest';
const buildScript = 'npm run build';

// Run tests and build script on CI
module.exports = () => {
  console.log('Running tests...');
  execSync(testScript);
  console.log('Building project...');
  execSync(buildScript);
};
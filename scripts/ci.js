// Import required modules
const { execSync } = require('child_process');

// Define test and build scripts
const testScript = './src/scripts/test.js';
const buildScript = './src/scripts/build.js';

// Run tests and build script
execSync(testScript);
execSync(buildScript);

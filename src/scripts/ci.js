// Import required modules
const { execSync } = require('child_process');

// Define test and build scripts
const testScript = 'jest';
const buildScript = 'npm run build';

// Run tests and build
execSync(testScript);
execSync(buildScript);

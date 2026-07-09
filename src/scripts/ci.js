// Import required modules
const { execSync } = require('child_process');

// Define build and test scripts
const buildScript = 'npm run build';
const testScript = 'npm run test';

// Run build and test scripts
execSync(buildScript);
execSync(testScript);

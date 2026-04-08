// Define build script
const { execSync } = require('child_process');

// Run tests and build
execSync('jest');
execSync('webpack');
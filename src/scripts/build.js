// Build script
const { execSync } = require('child_process');

// Run Jest tests
execSync('jest --config src/scripts/test.js');

// Build production bundle
execSync('webpack --config webpack.config.js');
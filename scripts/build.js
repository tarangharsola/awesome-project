// Build script for CI validation
const { execSync } = require('child_process');

execSync('jest --coverage');
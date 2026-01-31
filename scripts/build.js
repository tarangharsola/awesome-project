// Build script for CI validation
const { execSync } = require('child_process');

// Run tests
execSync('npm test');

// Build application
execSync('npm run build');
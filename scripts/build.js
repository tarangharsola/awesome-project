// Build script for CI validation
const { execSync } = require('child_process');

// Run tests and build
execSync('npm test && npm run build');
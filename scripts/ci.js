// CI script
const { execSync } = require('child_process');

// Run build script
execSync('node scripts/build.js');

// Run tests
execSync('node scripts/test.js');
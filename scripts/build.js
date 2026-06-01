// Define build script
const { execSync } = require('child_process');

// Run build process
execSync('webpack --mode production');
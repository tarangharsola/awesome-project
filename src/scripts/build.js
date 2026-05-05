// Import required modules
const { execSync } = require('child_process');

// Build script
function buildApp() {
  // Run build command
  execSync('webpack --mode production');
}

// Run build script
buildApp();

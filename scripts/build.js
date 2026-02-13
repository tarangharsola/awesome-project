// Import required modules
const { execSync } = require('child_process');

// Define build script
module.exports = function build() {
  // Run build process
  execSync('webpack --mode production');
};
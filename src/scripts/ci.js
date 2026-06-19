// Import required modules
const { execSync } = require('child_process');

// Define the build script
module.exports = {
  build: () => {
    // Run the build command
    execSync('npm run build');
  }
};
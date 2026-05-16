// Import required modules
const { execSync } = require('child_process');

// Define build script
module.exports = () => {
  console.log('Building project...');
  execSync('webpack');
};
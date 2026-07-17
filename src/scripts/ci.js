// Import required modules
const { execSync } = require('child_process');

// Define build and test commands
const build = () => {
  console.log('Building application...');
  execSync('npm run build');
};

const test = () => {
  console.log('Running tests...');
  execSync('npm run test');
};

// Export build and test functions
module.exports = { build, test };
// Import required modules
const { execSync } = require('child_process');

// Define build script
module.exports = function build() {
  // Run ESLint and Prettier
  execSync('eslint src/**/*.{ts,tsx} --fix');
  execSync('prettier --write src/**/*.{ts,tsx}');
};
// Build script for production
const { execSync } = require('child_process');

module.exports = function build() {
  // Clean build directory
  execSync('rm -rf dist');

  // Compile TypeScript
  execSync('tsc -p tsconfig.json');

  // Copy static assets
  execSync('cp -r public/* dist/');

  // Bundle JavaScript
  execSync('webpack --mode production');
};
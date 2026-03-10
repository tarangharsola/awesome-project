const { execSync } = require('child_process');

module.exports = function build() {
  // Run tests
  execSync('jest');
  // Build production bundle
  execSync('webpack --mode production');
};
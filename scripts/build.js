// Build script for CI validation
const { execSync } = require('child_process');

module.exports = function build() {
  execSync('webpack --mode production');
  execSync('webpack --mode development');
};
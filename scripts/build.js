// Build script for CI validation
const { execSync } = require('child_process');

module.exports = function build() {
  execSync('jest --coverage');
};
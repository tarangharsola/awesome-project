const { execSync } = require('child_process');
const { resolve } = require('path');

module.exports = function ci() {
  // Run tests and build script
  execSync('npm run test && npm run build', { stdio: 'inherit' });
};
const { execSync } = require('child_process');

module.exports = function ci() {
  // Run tests and build script
  execSync('npm run test && npm run build');
};
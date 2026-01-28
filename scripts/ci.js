const { execSync } = require('child_process');

module.exports = function ci() {
  execSync('npm run build');
  execSync('jest');
};
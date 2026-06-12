{"const { execSync } = require('child_process');

module.exports = function ci() {
  execSync('jest');
  execSync('npm run build');
};"
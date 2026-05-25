{"const { execSync } = require('child_process');

module.exports = function() {
  execSync('jest');
  execSync('npm run build');
};"
{"const { execSync } = require('child_process');

module.exports = function() {
  execSync('npm run build');
  execSync('jest');
};

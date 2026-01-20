const { execSync } = require('child_process');

module.exports = function runCi() {
  console.log('Running CI script');
  execSync('npm run build');
  execSync('jest');
};
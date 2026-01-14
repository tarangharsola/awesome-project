const { execSync } = require('child_process');

module.exports = function ci() {
  const build = execSync('npm run build');
  const test = execSync('jest');
  console.log('Build and test results:', build.toString(), test.toString());
};
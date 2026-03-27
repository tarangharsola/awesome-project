const { execSync } = require('child_process');

module.exports = () => {
  // Run tests
  execSync('jest');

  // Build application
  execSync('webpack');
};
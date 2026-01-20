const { execSync } = require('child_process');

module.exports = function build() {
  console.log('Building application');
  execSync('webpack');
};
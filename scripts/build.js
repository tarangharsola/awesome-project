{"const { execSync } = require('child_process');

module.exports = function build() {
  execSync('webpack');
};"
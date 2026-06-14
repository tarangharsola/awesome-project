const { execSync } = require('child_process');

module.exports = function build() {
  const buildScript = 'webpack --mode production';
  execSync(buildScript, { stdio: 'inherit' });
};
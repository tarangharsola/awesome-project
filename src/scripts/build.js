const { spawnSync } = require('child_process');
const { execSync } = require('child_process');

module.exports = function build() {
  const buildCommand = 'webpack';

  console.log('Building...');

  const buildResult = spawnSync(buildCommand, { shell: true });
  if (buildResult.status !== 0) {
    console.error('Build failed.');
    process.exit(1);
  }

  console.log('Build successful.');
};
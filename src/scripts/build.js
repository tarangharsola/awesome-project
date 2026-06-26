const { spawnSync } = require('child_process');
const { execSync } = require('child_process');

module.exports = function build() {
  const buildCommand = 'webpack';

  try {
    spawnSync(buildCommand, { shell: true });
    console.log('Build successful');
  } catch (error) {
    console.error('Build failed:', error);
  }
};
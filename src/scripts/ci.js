const { spawnSync } = require('child_process');
const { execSync } = require('child_process');

module.exports = function ci() {
  const buildCommand = 'npm run build';
  const testCommand = 'npm run test';

  console.log('Building and testing...');

  const buildResult = spawnSync(buildCommand, { shell: true });
  if (buildResult.status !== 0) {
    console.error('Build failed.');
    process.exit(1);
  }

  const testResult = spawnSync(testCommand, { shell: true });
  if (testResult.status !== 0) {
    console.error('Tests failed.');
    process.exit(1);
  }

  console.log('Build and test successful.');
};
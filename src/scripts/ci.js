const { spawnSync } = require('child_process');
const { execSync } = require('child_process');

module.exports = function ci() {
  const buildCommand = 'npm run build';
  const testCommand = 'npm run test';
  const lintCommand = 'npm run lint';

  try {
    spawnSync(buildCommand, { shell: true });
    console.log('Build successful');
  } catch (error) {
    console.error('Build failed:', error);
  }

  try {
    spawnSync(testCommand, { shell: true });
    console.log('Tests successful');
  } catch (error) {
    console.error('Tests failed:', error);
  }

  try {
    spawnSync(lintCommand, { shell: true });
    console.log('Linting successful');
  } catch (error) {
    console.error('Linting failed:', error);
  }
};
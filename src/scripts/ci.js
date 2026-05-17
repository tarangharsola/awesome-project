const { spawn } = require('child_process');
const { execSync } = require('child_process');

module.exports = function ci() {
  const buildCommand = 'npm run build';
  const testCommand = 'npm run test';

  console.log('Building and testing...');

  const buildProcess = spawn(buildCommand, { shell: true });
  const testProcess = spawn(testCommand, { shell: true });

  buildProcess.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  testProcess.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  buildProcess.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  testProcess.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  buildProcess.on('close', (code) => {
    if (code !== 0) {
      console.error('Build failed with code', code);
      process.exit(1);
    }
  });

  testProcess.on('close', (code) => {
    if (code !== 0) {
      console.error('Tests failed with code', code);
      process.exit(1);
    }
  });
};
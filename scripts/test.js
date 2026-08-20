#!/usr/bin/env node
const { execSync } = require('child_process');

function run(command) {
  console.log(`Running: ${command}`);
  execSync(command, { stdio: 'inherit' });
}

try {
  // Execute Jest in CI mode
  run('npx jest --ci');
  console.log('Tests passed');
  process.exit(0);
} catch (err) {
  console.error('Tests failed');
  process.exit(1);
}

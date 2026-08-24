#!/usr/bin/env node
const { execSync } = require('child_process');

function run(cmd) {
  console.log(`Running: ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

try {
  run('npm run build');
  run('npm test -- --watchAll=false');
  console.log('CI passed');
  process.exit(0);
} catch (e) {
  console.error('CI failed');
  process.exit(1);
}

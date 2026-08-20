#!/usr/bin/env node
const { execSync } = require('child_process');

function run(command) {
  console.log(`Running: ${command}`);
  execSync(command, { stdio: 'inherit' });
}

try {
  // TypeScript type checking
  run('npx tsc --noEmit');
  // Attempt Vite build, fallback to npm build script
  try {
    run('npx vite build');
  } catch {
    try {
      run('npm run build');
    } catch {
      console.error('No known build tool found.');
      process.exit(1);
    }
  }
  console.log('Build succeeded');
  process.exit(0);
} catch (err) {
  console.error('Build failed');
  process.exit(1);
}

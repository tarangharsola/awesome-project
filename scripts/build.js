const { execSync } = require('child_process');
try {
  execSync('tsc --noEmit', { stdio: 'inherit' });
  console.log('TypeScript type‑check passed.');
} catch (e) {
  console.error('TypeScript type‑check failed.');
  process.exit(1);
}
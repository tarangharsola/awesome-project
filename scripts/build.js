const { execSync } = require('child_process');

try {
  console.log('Running TypeScript build (type‑check only)...');
  // Perform a type‑only compilation; no output files are emitted.
  execSync('npx tsc --noEmit', { stdio: 'inherit' });
  console.log('Build succeeded');
  process.exit(0);
} catch (err) {
  console.error('Build failed');
  process.exit(1);
}
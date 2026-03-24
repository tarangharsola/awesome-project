// Import required modules
import { spawnSync } from 'child_process';
import { resolve } from 'path';

// Build script for CI validation
export default async () => {
  // Run Jest tests
  const jestResult = spawnSync('jest', { stdio: 'inherit' });
  if (jestResult.status !== 0) {
    throw new Error('Jest tests failed');
  }

  // Build application
  const buildResult = spawnSync('webpack', { stdio: 'inherit' });
  if (buildResult.status !== 0) {
    throw new Error('Webpack build failed');
  }
};
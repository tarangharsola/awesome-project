// Import required modules
import { spawnSync } from 'child_process';
import { resolve } from 'path';
import { readFileSync } from 'fs';

// Define the build script
const build = () => {
  // Compile TypeScript files
  const tsConfig = readFileSync(resolve(__dirname, 'tsconfig.json'), 'utf8');
  const tsConfigJson = JSON.parse(tsConfig);
  const compilerOptions = tsConfigJson.compilerOptions;
  const sourceFiles = tsConfigJson.include;

  const tsBuild = spawnSync('tsc', {
    cwd: resolve(__dirname, '..'),
    stdio: 'inherit',
  });

  // Copy static assets
  const staticAssets = spawnSync('cp', {
    cwd: resolve(__dirname, '..'),
    stdio: 'inherit',
  });

  // Bundle JavaScript files
  const bundle = spawnSync('webpack', {
    cwd: resolve(__dirname, '..'),
    stdio: 'inherit',
  });
};

// Run the build script
build();
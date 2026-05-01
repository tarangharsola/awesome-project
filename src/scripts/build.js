import { spawn } from 'child_process';
import { resolve } from 'path';
import { build } from './build';

const buildCommand = 'tsc --build src';

const buildProcess = spawn(buildCommand, {
  cwd: resolve(__dirname, '..'),
  stdio: 'inherit',
});

buildProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`Build failed with code ${code}`);
    process.exit(code);
  }
});
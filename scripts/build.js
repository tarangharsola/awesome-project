import { spawn } from 'child_process';
import { resolve } from 'path';

const build = () => {
  const child = spawn('webpack', ['--mode', 'production'], {
    cwd: resolve(__dirname, '..'),
    stdio: 'inherit',
  });
  return new Promise((resolve, reject) => {
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Build failed with code ${code}`));
      }
    });
  });
};

export default build;
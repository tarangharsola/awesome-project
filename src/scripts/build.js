// eslint-disable-next-line
import { spawn } from 'child_process';

export default function build() {
  console.log('Building application...');
  const buildProcess = spawn('webpack', ['--mode', 'production']);
  buildProcess.stdout.on('data', (data) => {
    console.log(data.toString());
  });
  buildProcess.stderr.on('data', (data) => {
    console.error(data.toString());
  });
  return new Promise((resolve, reject) => {
    buildProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Build failed with code ${code}`));
      }
    });
  });
}
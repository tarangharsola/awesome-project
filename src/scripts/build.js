// eslint-disable-next-line
import { spawnSync } from 'child_process';

export default function build() {
  console.log('Building application...');
  const buildResults = spawnSync('webpack', { stdio: 'inherit' });
  console.log('Build completed.');
  process.exit(buildResults.status);
}
// eslint-disable-next-line
import { spawnSync } from 'child_process';

const buildApp = () => {
  console.log('Building app...');
  const result = spawnSync('webpack', ['--mode', 'production'], { stdio: 'inherit' });
  console.log(result);
};

module.exports = buildApp;
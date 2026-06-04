// eslint-disable-next-line
import { spawnSync } from 'child_process';

const build = () => {
  const result = spawnSync('webpack', { stdio: 'inherit' });
  if (result.status !== 0) {
    throw new Error('Build failed');
  }
};

export default build;
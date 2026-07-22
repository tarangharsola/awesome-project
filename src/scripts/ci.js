// eslint-disable-next-line
import { execSync } from 'child_process';

const build = () => {
  console.log('Building application...');
  execSync('npm run build');
  console.log('Build complete.');
};

export default build;
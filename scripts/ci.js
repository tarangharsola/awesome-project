import { execSync } from 'child_process';

const build = () => {
  execSync('npm run build');
};

const test = () => {
  execSync('npm run test');
};

export { build, test };
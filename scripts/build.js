import { execSync } from 'child_process';
import { resolve } from 'path';

const build = () => {
  const buildCommand = `webpack --mode production --config webpack.config.js`;
  execSync(buildCommand, { stdio: 'inherit' });
};

export default build;
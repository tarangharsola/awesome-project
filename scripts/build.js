import { execSync } from 'child_process';
import { resolve } from 'path';

const build = () => {
  const buildDir = resolve(__dirname, '../build');
  execSync(`webpack --mode production --config webpack.config.js --output-path ${buildDir}`);
};

export default build;
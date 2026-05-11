// eslint-disable-next-line
import { execSync } from 'child_process';
import { resolve } from 'path';

const build = () => {
  const buildScript = resolve(__dirname, '../scripts/build.js');
  execSync(`node ${buildScript}`);
};

export default build;
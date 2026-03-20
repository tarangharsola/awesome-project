import { execSync } from 'child_process';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const build = () => {
  const packageJson = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf8'));
  const buildCommand = `npm run build -- --mode production --env ${packageJson.version}`;
  execSync(buildCommand);
};

build();
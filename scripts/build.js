import { execSync } from 'child_process';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const build = () => {
  const packageJson = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf8'));
  const buildCommand = `tsc --build src --outDir dist --module commonjs --target es6 --jsx react`;
  execSync(buildCommand);
  console.log('Build complete.');
};

build();
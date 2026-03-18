import { execSync } from 'child_process';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const build = () => {
  const packageJson = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf8'));
  const buildCommand = `tsc --build src --outDir dist --module es6 --target es6 --jsx react --sourceMap --strict --noEmitOnError`;
  execSync(buildCommand);
};

build();
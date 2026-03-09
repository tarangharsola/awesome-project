import { execSync } from 'child_process';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const build = () => {
  const tsConfig = readFileSync(resolve(__dirname, '../tsconfig.json'), 'utf8');
  const tsConfigJson = JSON.parse(tsConfig);
  const tsConfigPaths = tsConfigJson.compilerOptions.paths;
  const tsConfigOutDir = tsConfigJson.compilerOptions.outDir;

  execSync(`tsc --build ${resolve(__dirname, '../tsconfig.json')} --outDir ${tsConfigOutDir}`);
};

export default build;
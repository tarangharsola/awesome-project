import { execSync } from 'child_process';
import { resolve } from 'path';
import { existsSync } from 'fs';

const buildDir = resolve(__dirname, '../build');
const srcDir = resolve(__dirname, '../src');

if (existsSync(buildDir)) {
  execSync(`rm -rf ${buildDir}`);
}

execSync(`webpack --mode production --config webpack.config.js`);

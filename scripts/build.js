// Build script for production
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const buildDir = 'dist';
const srcDir = 'src';
const tsConfig = 'tsconfig.json';

function build() {
  console.log('Building production code...');
  const tsConfigPath = path.join(__dirname, tsConfig);
  const tsConfigContent = fs.readFileSync(tsConfigPath, 'utf8');
  const tsConfigJson = JSON.parse(tsConfigContent);
  const tsConfigOptions = tsConfigJson.compilerOptions;
  const tsConfigTarget = tsConfigOptions.target;
  const tsConfigModule = tsConfigOptions.module;
  const tsConfigOutDir = tsConfigOptions.outDir;

  const buildCommand = `tsc --target ${tsConfigTarget} --module ${tsConfigModule} --outDir ${buildDir} ${srcDir}/**/*.ts`; // eslint-disable-line
  execSync(buildCommand, { stdio: 'inherit' });
  console.log('Production code built.');
}

module.exports = build;
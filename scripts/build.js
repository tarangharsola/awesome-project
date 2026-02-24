// Build script
const { execSync } = require('child_process');
const path = require('path');
const buildDir = 'dist';
const srcDir = 'src';
const entryPoints = ['index.tsx'];
const outDir = path.join(buildDir, 'js');
const cssOutDir = path.join(buildDir, 'css');
const htmlOutDir = path.join(buildDir, 'html');

execSync(`mkdir -p ${buildDir}`);

entryPoints.forEach((entryPoint) => {
  const entryPointPath = path.join(srcDir, entryPoint);
  const outputFileName = path.basename(entryPointPath, '.ts') + '.js';
  const outputFilePath = path.join(outDir, outputFileName);
  const cssOutputFileName = path.basename(entryPointPath, '.ts') + '.css';
  const cssOutputFilePath = path.join(cssOutDir, cssOutputFileName);
  const htmlOutputFileName = path.basename(entryPointPath, '.ts') + '.html';
  const htmlOutputFilePath = path.join(htmlOutDir, htmlOutputFileName);

  execSync(`tsc --outFile ${outputFilePath} ${entryPointPath}`);
  execSync(`tsc --outFile ${cssOutputFilePath} ${entryPointPath}`);
  execSync(`tsc --outFile ${htmlOutputFilePath} ${entryPointPath}`);
});
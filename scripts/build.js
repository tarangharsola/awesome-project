import { execSync } from 'child_process';
import { resolve } from 'path';
import { build } from 'esbuild';

const buildDir = resolve(__dirname, '../dist');

build({
  entryPoints: ['src/index.tsx'],
  outdir: buildDir,
  bundle: true,
  minify: true,
  platform: 'browser',
  format: 'cjs',
  external: ['react', 'react-dom'],
});

execSync(`cp ${resolve(__dirname, '../src/styles/base.css')} ${buildDir}/base.css`);

import { build } from 'esbuild';
import { resolve } from 'path';

const buildConfig = {
  entryPoints: ['src/index.tsx'],
  outdir: 'public',
  bundle: true,
  minify: true,
  sourcemap: true,
};

build(buildConfig).then(() => {
  console.log('Build complete');
});

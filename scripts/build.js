import { build } from 'esbuild';

build(
  {
    entryPoints: ['src/index.tsx'],
    bundle: true,
    outfile: 'public/bundle.js',
    platform: 'browser',
    format: 'iife',
    minify: true,
    treeShaking: true,
  },
  (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(result);
  }
);
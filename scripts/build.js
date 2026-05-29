import { build } from 'esbuild';

build(
  {
    entryPoints: ['src/index.tsx'],
    outdir: 'public',
    bundle: true,
    minify: true,
  },
  (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
    }
  }
);

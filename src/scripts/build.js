import { build } from 'esbuild';

build(
  {
    entryPoints: ['src/index.tsx'],
    outdir: 'public',
    bundle: true,
    minify: true,
  }
).catch((err) => {
  console.error(err);
});
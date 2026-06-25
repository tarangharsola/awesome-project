{"import { build } from 'esbuild';

build({
  entryPoints: ['src/index.tsx'],
  outdir: 'public',
  bundle: true,
  minify: true,
  sourcemap: true,
});
}
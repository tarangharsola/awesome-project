// eslint-disable-next-line
import { build } from 'esbuild';

export default async function buildApp() {
  await build({
    entryPoints: ['src/index.tsx'],
    outdir: 'public',
    bundle: true,
    minify: true,
  });
}
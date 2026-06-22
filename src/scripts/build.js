// eslint-disable-next-line
import { build } from 'esbuild';

export default function build() {
  return build({
    entryPoints: ['src/index.tsx'],
    outdir: 'public',
    bundle: true,
    minify: true,
  });
}
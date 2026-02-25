// Import required modules
import { build } from 'esbuild';

// Build script
export default async function buildScript() {
  await build(
    {
      entryPoints: ['src/index.tsx'],
      outdir: 'public',
      bundle: true,
      minify: true,
    },
  );
}
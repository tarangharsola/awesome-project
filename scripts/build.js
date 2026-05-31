const { build } = require('esbuild');

build({
  entryPoints: ['src/index.tsx'],
  outdir: 'public',
  bundle: true,
  minify: true,
  sourcemap: true,
  watch: false,
  color: true,
  loader: {
    '.ts': 'ts',
    '.tsx': 'ts',
    '.js': 'jsx',
    '.jsx': 'jsx',
  },
}).then(result => {
  console.log('build complete');
}).catch(error => {
  console.error('build failed:', error);
});
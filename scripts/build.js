// Import required modules
import { build } from 'esbuild';

// Define build configuration
const buildConfig = {
  entryPoints: ['src/index.ts'],
  outfile: 'public/bundle.js',
  platform: 'browser',
  bundle: true,
  minify: true,
};

// Perform build
build(buildConfig).then(() => {
  console.log('Build complete.');
}).catch((error) => {
  console.error('Build failed:', error);
});
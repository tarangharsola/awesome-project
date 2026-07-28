// Import required modules
const { build } = require('webpack');

// Define build configuration
const buildConfig = {
  // Define entry points
  entry: './src/index.tsx',
  // Define output configuration
  output: {
    path: './dist',
    filename: 'bundle.js'
  }
};

// Run build
build(buildConfig);

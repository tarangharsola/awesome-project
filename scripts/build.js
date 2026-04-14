// Import required modules
import { execSync } from 'child_process';
import { resolve } from 'path';
import { readFileSync } from 'fs';

// Define the build script
function build() {
  // Run the build process
  execSync('webpack --mode production');
}

// Export the build function
export { build };
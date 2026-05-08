// Import required modules
const { execSync } = require('child_process');

// Define test and build scripts
const testScript = 'jest';
const buildScript = 'npm run build';

// Define CI validation function
function validateCI() {
  try {
    // Run tests
    execSync(testScript);
    // Build application
    execSync(buildScript);
    console.log('CI validation successful');
  } catch (error) {
    console.error('CI validation failed:', error);
  }
}

// Call CI validation function
validateCI();
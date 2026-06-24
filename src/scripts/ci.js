// This script will be executed by CI to validate the app
const { execSync } = require('child_process');
const buildScript = require('./build.js');
execSync(buildScript);

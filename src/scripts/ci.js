const { execSync } = require('child_process');
const buildScript = 'npm run build';
execSync(buildScript);
execSync('jest');
const { execSync } = require('child_process');
const buildScript = 'npm run build';
execSync(buildScript, { stdio: 'inherit' });
execSync('jest', { stdio: 'inherit' });
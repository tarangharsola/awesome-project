const { spawnSync } = require('child_process');
const buildScript = function() {
  console.log('Running build script...');
  const buildResult = spawnSync('webpack', ['--mode', 'production']);
  if (buildResult.status !== 0) {
    throw new Error('Build failed with code ' + buildResult.status);
  }
  console.log('Build complete.');
};
module.exports = buildScript;
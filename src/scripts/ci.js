const { spawnSync } = require('child_process');
const { execSync } = require('child_process');

module.exports = {
  run: () => {
    const build = spawnSync('npm', ['run', 'build'], { shell: true });
    if (build.status !== 0) {
      console.error('Build failed');
      process.exit(1);
    }

    const test = spawnSync('npm', ['run', 'test'], { shell: true });
    if (test.status !== 0) {
      console.error('Tests failed');
      process.exit(1);
    }
  }
};
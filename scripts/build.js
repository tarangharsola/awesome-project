const { spawnSync } = require('child_process');
const { resolve } = require('path');
const { existsSync } = require('fs');

const buildDir = resolve(__dirname, 'build');

if (!existsSync(buildDir)) {
  spawnSync('mkdir', ['-p', buildDir]);
}

const build = spawnSync('webpack', ['--mode', 'production', '--config', 'webpack.config.js']);
if (build.status !== 0) {
  process.exit(build.status);
}

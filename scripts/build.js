const { execSync } = require('child_process');
const build = () => {
  execSync('webpack --mode production');
};

build();
const { execSync } = require('child_process');
const build = () => {
  execSync('npm run build');
};
const test = () => {
  execSync('npm run test');
};
module.exports = { build, test };

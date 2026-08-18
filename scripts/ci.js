// CI script: run build and test, exit with appropriate status code
const { execSync } = require('child_process');
function run(command, name) {
  try {
    console.log(`Running ${name}...`);
    execSync(command, { stdio: 'inherit' });
    console.log(`${name} succeeded`);
  } catch (err) {
    console.error(`${name} failed`);
    process.exit(1);
  }
}
run('npm run build', 'build');
run('npm run test', 'test');
process.exit(0);

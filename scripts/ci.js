// Run tests and build script
const runTests = async () => {
  console.log('Running tests...');
  await runTestsInDirectory('src/components/__tests__');
};

const runBuildScript = async () => {
  console.log('Running build script...');
  await runBuildScriptInDirectory('scripts/build.js');
};

runTests().then(runBuildScript).catch((error) => {
  console.error('Error running tests or build script:', error);
});
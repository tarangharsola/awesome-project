const { build } = require('./build');
const { test } = require('./test');

module.exports = function build() {
  test();
  console.log('Build complete.');
};
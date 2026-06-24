// Import required modules
const { build } = require('webpack');

// Build script
module.exports = function() {
  console.log('Building script...');
  build();
};
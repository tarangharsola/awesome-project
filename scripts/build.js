// Build script for production
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const config = require('./webpack.config');

module.exports = function build() {
  console.log('Building production bundle...');
  const bundlePath = path.join(__dirname, 'dist', 'bundle.js');
  const stats = webpack(config).run((err, stats) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stats.toString({ colors: true }));
    fs.writeFileSync(bundlePath, stats.compilation.assets['main.js'].source());
  });
  return stats;
};
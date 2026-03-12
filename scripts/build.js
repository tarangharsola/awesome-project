const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');

const buildDir = path.join(__dirname, 'dist');

fs.mkdirSync(buildDir, { recursive: true });

webpack(config, (err, stats) => {
  if (err) {
    console.error(err);
  } else {
    console.log(stats.toString());
  }
});
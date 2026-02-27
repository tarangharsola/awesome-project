const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const config = require('./webpack.config');

fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8'));
webpack(config, (err, stats) => {
  if (err) {
    console.error(err);
  } else {
    console.log(stats.toString());
  }
})
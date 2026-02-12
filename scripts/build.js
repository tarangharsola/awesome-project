// Build script for production
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');

module.exports = function build() {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve(stats);
      }
    });
  });
};
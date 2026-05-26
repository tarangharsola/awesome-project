const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

module.exports = function() {
  return gulp.src('src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(ts())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
};
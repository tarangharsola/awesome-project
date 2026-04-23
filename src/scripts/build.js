// Import required modules
const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

// Define build task
gulp.task('build', () => {
  return browserify('src/index.tsx')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public'));
});
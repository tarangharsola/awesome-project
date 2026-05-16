// Import required modules
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const browserify = require('browserify');
const uglify = require('gulp-uglify');

// Define build task
gulp.task('build', () => {
  // Browserify and uglify code
  return browserify('src/index.tsx')
    .bundle()
    .pipe(uglify())
    .pipe(gulp.dest('public/'));
});

// Define default task
gulp.task('default', ['build']);
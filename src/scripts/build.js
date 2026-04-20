// Import required modules
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

// Define build task
gulp.task('build', function() {
  return gulp.src(['src/scripts/*.js'])
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/scripts'));
});

// Run build task
gulp.task('default', ['build'], function() {
  console.log('Build complete.');
});
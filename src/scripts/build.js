// Import required modules
const gulp = require('gulp');
const uglify = require('gulp-uglify');

// Define build task
gulp.task('build', function() {
  return gulp.src(['src/scripts/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('public/scripts'));
});

// Run build task
gulp.task('default', ['build'], function() {
  console.log('Build complete.');
});
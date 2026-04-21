// Import required modules
const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

// Define build task
gulp.task('build', function() {
  return gulp.src(['src/**/*.ts', 'src/**/*.tsx'])
    .pipe(sourcemaps.init())
    .pipe(ts()).on('error', function(err) {
      console.error(err);
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

// Run build task
gulp.task('default', ['build']);
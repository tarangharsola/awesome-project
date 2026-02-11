// Import required modules
const gulp = require('gulp');
const babel = require('gulp-babel');

// Define build task
gulp.task('build', () => {
  // Compile JavaScript files
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});
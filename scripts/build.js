// Import required modules
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// Define build task
gulp.task('build', () => {
  return gulp.src(['src/**/*.js', 'src/**/*.jsx'])
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});
// Import required modules
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// Define build task
gulp.task('build', () => {
  return gulp.src(['src/**/*.js', 'src/**/*.jsx'])
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

// Define default task
gulp.task('default', ['build'], () => {
  console.log('Build complete.');
});
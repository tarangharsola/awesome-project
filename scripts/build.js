// Define build script
const gulp = require('gulp');
const ts = require('gulp-typescript');
gulp.task('build', () => {
  return gulp.src(['src/**/*.ts', 'src/**/*.tsx'])
    .pipe(ts())
    .pipe(gulp.dest('dist'));
});
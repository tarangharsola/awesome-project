// Import required modules
const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

// Define build task
gulp.task('build', () => {
  return gulp.src('src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(ts())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

// Run build task
gulp.run('build');

// Import required modules
const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

// Define build task
gulp.task('build', () => {
  return gulp.src(['src/**/*.ts', 'src/**/*.tsx'])
    .pipe(sourcemaps.init())
    .pipe(ts.createProject('tsconfig.json')())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});
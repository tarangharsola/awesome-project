// Import required modules
const gulp = require('gulp');
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');

// Define build task
gulp.task('build', () => {
  return gulp.src(['src/**/*.ts', 'src/**/*.tsx'])
    .pipe(ts.createProject('tsconfig.json')())
    .js.pipe(gulp.dest('dist'));
});

// Define test task
gulp.task('test', () => {
  return gulp.src(['src/**/*.ts', 'src/**/*.tsx'])
    .pipe(ts.createProject('tsconfig.json')())
    .js.pipe(gulp.dest('dist'));
});

// Define default task
gulp.task('default', ['build', 'test']);
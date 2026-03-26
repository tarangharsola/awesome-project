// Import required modules
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

// Build script
gulp.task('build', () => {
  return gulp.src(['src/**/*.js', 'src/**/*.ts'], { base: '.' })
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});
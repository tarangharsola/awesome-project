// Import required modules
const gulp = require('gulp');
const uglify = require('gulp-uglify');

// Define build task
gulp.task('build', function() {
  return gulp.src(['src/**/*.js', 'src/**/*.ts'])
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

// Run build task
gulp.build();
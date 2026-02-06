// Import required modules
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// Build script
gulp.task('build', () => {
  return gulp.src(['src/**/*.js', 'src/**/*.jsx'])
    .pipe(babel({
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-transform-runtime']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

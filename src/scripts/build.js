// Import required modules
const gulp = require('gulp');
const babel = require('gulp-babel');

// Build script
gulp.task('build', () => {
  return gulp.src('src/**/*.tsx')
    .pipe(babel({
      presets: ['@babel/preset-react', '@babel/preset-env']
    }))
    .pipe(gulp.dest('public/'));
});
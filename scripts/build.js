// Import required modules
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// Define build task
gulp.task('build', () => {
  return gulp.src(['src/**/*.ts', 'src/**/*.tsx'])
    .pipe(babel({
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: ['@babel/plugin-transform-runtime']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});
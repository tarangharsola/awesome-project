// Import required modules
const gulp = require('gulp');
const babel = require('gulp-babel');

// Define build task
gulp.task('build', () => {
  return gulp.src('src/**/*.{ts,tsx}')
    .pipe(babel({
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: ['@babel/plugin-transform-runtime']
    }))
    .pipe(gulp.dest('dist'));
});

// Run build task
gulp.task('default', ['build'], () => {
  console.log('Build complete.');
});
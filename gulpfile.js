var gulp   = require('gulp'),
    eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('lint', function() {
  return gulp.src('./src/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
 });

gulp.task('scripts', function() {
  return gulp.src("./src/*.js")
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['lint', 'scripts']);

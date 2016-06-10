var gulp   = require('gulp'),
    eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

gulp.task('lint', function() {
  return gulp.src('./src/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
 });

gulp.task('scripts', function() {
  return gulp.src("./src/js/*.js")
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function () {
  gulp.src('./src/scss/**/*.{scss,sass}')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest('./dist'));
})

gulp.task('default', ['lint', 'scripts', 'sass']);

gulp.task('watch', function() {
  gulp.watch('./src/**/*.{scss,sass,js}', ['sass', 'scripts'])
})

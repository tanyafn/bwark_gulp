var gulp   = require('gulp');
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var jade = require('gulp-jade');

var paths = {
  js: './src/js/*.js',
  sass: './src/scss/*.{scss,sass}',
  jade: 'src/templates/*.jade',
  tmp: './tmp',
  index: './tmp/index.html',
  dist: './dist'
}

gulp.task('lint', function() {
  return gulp.src(paths.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
 });

gulp.task('scripts', function() {
  return gulp.src(paths.js)
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('sass', function () {
  gulp.src(paths.sass)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest(paths.dist));
})

gulp.task('jade', function() {
  return gulp.src(paths.jade)
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('default', ['lint', 'scripts', 'sass', 'jade']);

gulp.task('watch', function() {
  gulp.watch('./src/**/*.{scss,sass,js,jade}', ['sass', 'scripts', 'jade'])
})

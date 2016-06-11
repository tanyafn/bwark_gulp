var gulp   = require('gulp');
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass   = require('gulp-sass');
var jade   = require('gulp-jade');
var gls    = require('gulp-live-server');
var neat = require('node-neat');
var refills = require('node-refills');

var paths = {
  js:    './src/js/*.js',
  sass:  './src/scss/*.{scss,sass}',
  jade:  ['src/templates/**/*.jade', '!src/templates/partials/*', '!src/templates/layout.jade'],
  build: './build'
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
    .pipe(gulp.dest(paths.build));
});

gulp.task('sass', function () {
  var includePaths = require('node-refills').includePaths;
  
  return gulp.src(paths.sass)
    .pipe(sass({ outputStyle: 'compressed', includePaths: includePaths}))
    .pipe(gulp.dest(paths.build));
})

gulp.task('jade', function() {
  return gulp.src(paths.jade)
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest(paths.build));
});

gulp.task('default', ['lint',  'jade', 'scripts', 'sass']);

gulp.task('serve', function() {
  var server = gls.static(paths.build, 3000);
  server.start();

  gulp.watch(['build/*.html', 'build/*.css'], function (file) {
    server.notify.apply(server, [file]);
  });
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*.{scss,sass,js,jade}', ['sass', 'scripts', 'jade'])
})

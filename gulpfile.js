var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var port = process.env.PORT || 8080;
var sass = require('gulp-sass');

var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var postcssImport = require('postcss-import');
var autoprefixer = require('autoprefixer');
var cssNext = require('postcss-cssnext');

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    proxy: 'http://localhost:' + port,
    open: false,
    notify: false
  });

});

gulp.task('styles', function() {

  var processors = [
    postcssImport,
    autoprefixer,
    cssNext
  ];

  return gulp.src('./css/index.css')
  .pipe(sourcemaps.init())
  .pipe(postcss(processors))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./assets/css'))
  .pipe(browserSync.stream());
});

gulp.task('sass', function() {
  return gulp.src('./sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./assets/css'))
  .pipe(browserSync.stream());
});

// gulp.task('watch', ['sass'], function() {
//   gulp.watch('sass/**/*.scss', ['sass']);
//   gulp.watch('./**/*.hbs').on('change', browserSync.reload);
// });

gulp.task('watch', ['styles'], function() {
  gulp.watch('css/**/*.css', ['styles']);
  gulp.watch('./**/*.hbs').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);

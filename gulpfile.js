var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var port = process.env.PORT || 8080;
var sass = require('gulp-sass');

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    proxy: 'http://localhost:' + port,
    open: false,
    notify: false
  });

});

gulp.task('sass', function() {
  return gulp.src('./sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./assets/css'))
  .pipe(browserSync.stream());
});

gulp.task('watch', ['sass'], function() {
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('./**/*.hbs').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);

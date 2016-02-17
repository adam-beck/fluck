var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var port = process.env.PORT || 8080;

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var postcssImport = require('postcss-import');
var autoprefixer = require('autoprefixer');
var cssNext = require('postcss-cssnext');
var exit = require('gulp-exit');

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    proxy: 'http://localhost:' + port,
    open: false,
    notify: false
  });
});

function compile(watch) {

  var b = browserify({
    entries: ['./src/index.js'],
    cache: {},
    packageCache: {},
    plugin: [watchify]
  }).transform(babelify, {
    presets: ['es2015']
  });

  function bundle() {
    console.log('bundling scripts');
    b.bundle()
    .on('error', function (err) {
      console.error(err);
      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(gulp.dest('./assets/js'))
    .pipe(browserSync.stream({once: true}));
  }


  if (watch) {
    b.on('update', bundle);
    bundle();
  } else {
    bundle().pipe(exit());
  }
}

function watch() {
  return compile(true);
};

gulp.task('build', function() { return compile(); });

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

gulp.task('watch', ['styles'], function() {
  gulp.watch('css/**/*.css', ['styles']);
  gulp.watch('./**/*.hbs').on('change', browserSync.reload);
  return watch();
});

gulp.task('default', ['serve']);

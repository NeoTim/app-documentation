var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var to5 = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var gutil = require('gulp-util');
var assign = Object.assign || require('object.assign');
var sass;
var minfy;
var concat;
var prefixer;
var stripCssComments;
var isSassDepsRequired = false;
var pkg = paths('package.json');

function requireSassDeps(){
  isSassDepsRequired = true;
  sass = require('gulp-sass');
  minfy = require('gulp-minify-css');
  concat = require('gulp-concat');
  prefixer = require('gulp-autoprefixer');
  stripCssComments = require('gulp-strip-css-comments');
}

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('build-system', function () {
  return gulp.src(paths.source)
    .pipe(plumber())
    .pipe(changed(paths.output, {extension: '.js'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(to5(assign({}, compilerOptions, {modules:'system'})))
    .pipe(sourcemaps.write({includeContent: true}))
    .pipe(gulp.dest(paths.output));
});

// copies changed html files to the output directory
gulp.task('build-html', function () {
  return gulp.src(paths.html)
    .pipe(changed(paths.output, {extension: '.html'}))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-css', function() {
  return gulp.src([paths.style, paths.less])
    .pipe(plumber())
    .pipe(changed(paths.output, {extension: '.css'}))
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-sass', function() {
  if (!gutil.env.dev) {
    return gulp.src(paths.app('*.css')).pipe(gulp.dest(paths.output))
  }
  if (!isSassDepsRequired) requireSassDeps();
  return gulp.src(paths.sass)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass(paths.sassOptions()))
    .pipe(prefixer())
    .pipe(stripCssComments())
    .pipe(gutil.env.min ? minfy() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.output))
    .pipe(gulp.dest(paths.app()))
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function(callback) {
  return runSequence('clean',
    ['build-system', 'build-html', 'build-css', 'build-sass'],
  callback);
});

var gulp = require('gulp');
var paths = require('../paths');
var browserSync = require('browser-sync');
var gutil = require('gulp-util');
// outputs changes to files to the console
function reportChange(event){
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

// this task wil watch for changes
// to js, html, and css files and call the
// reportChange method. Also, by depending on the
// serve task, it will instantiate a browserSync session
gulp.task('watch', ['serve'], function() {
  if (gutil.env.lint) {
    gulp.watch(paths.source, ['build-system', 'lint',  browserSync.reload]).on('change', reportChange);
  } else {
    gulp.watch(paths.source, ['build-system',  browserSync.reload]).on('change', reportChange);
  }
  gulp.watch(paths.html, ['build-html', browserSync.reload]).on('change', reportChange);
  gulp.watch([paths.style, paths.less], ['build-css', browserSync.reload]).on('change', reportChange);
  if (gutil.env.dev) {
    gulp.watch(paths.sass, ['build-sass', browserSync.reload]).on('change', reportChange);
  }
});

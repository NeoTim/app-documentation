var path = require('path');
var neat = require('node-neat');
var assign = Object.assign || require('object.assign');
var appRoot = 'src/';
var outputRoot = 'dist/';

var cwd = path.join.bind(path, process.cwd());

var app  = cwd.bind(cwd, 'src')
var out  = cwd.bind(cwd, 'dist')
var test = cwd.bind(cwd, 'test')
var npm  = cwd.bind(cwd, 'node_modules')



assign(cwd, {
  app: app,
  doc: cwd('doc'),
  e2eSpecsSrc:  test('e2e/src/*.js'),
  e2eSpecsDist: test('e2e/dist/'),
  html: app('**/*.html'),
  less: app('**/*.less'),
  npm: npm,
  out: out,
  output: out(),
  root: app(),
  sass: app('**/*.scss'),
  source: app('**/*.js'),
  style: cwd('styles/**/*.less'),
  test: test,
  sassOptions: {
    errLogToConsole: true,
    includePaths: neat.includePaths.concat(npm('sassdash/scss'), npm('include-media/dist/_include-media.scss'))
  }
});
module.exports = cwd;


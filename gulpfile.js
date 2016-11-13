var $ = {
  package: require('./package.json'),
  config: require('./project/config.js'),
  path: {
    system: require('./project/path.system.js'),
    react: require('./project/path.react.js'),
    app: require('./project/path.app.js'),
    sass: require('./project/path.sass.js'),
    template: require('./project/path.template.js'),
    task: require('./project/path.task.js')
  },
  browserSync: require('browser-sync'),
  sequence: require('run-sequence'),
  rimraf: require('rimraf'),
  gulp: require('gulp'),
  $gulp: require('gulp-load-plugins')({
    lazy: false,
    rename: {
      'gulp-replace-task': 'replace'
    }
  })
};

$.debug = true;

$.path.task.forEach(function(taskPath) {
  var builder = require(taskPath)($);
});

$.gulp.task('default', function() {
  $.sequence(
    [
      'js:process',
      'react:process',
      'scss:process',
      'jade:process',
      'img:sprite',
      'copy:libs',
      'scss:release',
      'copy:resource'
    ],
    'service:server'
  );
});

$.gulp.task('build', function(cb) {
  $.debug = false;

  $.sequence(
    'service:clean',
    'js:lint',
    [
      'js:release',
      'react:process',
      'scss:release',
      'jade:process',
      'img:sprite',
      'copy:libs',
      'copy:resource'
    ],
    'service:server',
    function(cb) {
      console.log('Built has been completed.');
    }
  );
});
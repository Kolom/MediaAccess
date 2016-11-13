var builder = function($) {

  $.gulp.task('react:process', function() {

    return $.gulp.src($.path.react)
      .pipe($.$gulp.sourcemaps.init())
      .pipe($.$gulp.concat('react-components.js', {newLine: ';'}))
      .pipe($.$gulp.sourcemaps.write('./'))
      .pipe($.gulp.dest($.config.root + '/assets/js'));
  });
};

module.exports = builder;

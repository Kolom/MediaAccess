var builder = function($) {

  $.gulp.task('copy:libs', function() {

    return $.gulp.src('./source/libs/**/*.*')
      .pipe($.$gulp.changed($.config.root))
      .pipe($.gulp.dest($.config.root + '/assets/libs'))
  });
};

module.exports = builder;

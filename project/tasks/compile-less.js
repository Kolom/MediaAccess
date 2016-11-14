// var builder = function($) {

//   $.gulp.task('less:process', function(done) {

//     return $.gulp.src($.path.less)

//         .pipe(less({
//           paths: [ path.join(__dirname, 'less', 'includes') ]
//         }))
//         .pipe(cssmin())
//         .pipe(rename({suffix: '.min'}))
//         .pipe($.gulp.dest('build/assets/css'))
//   });
// };

var builder = function($) {

  $.gulp.task('less:process', function() {
    return $.gulp.src('./source/less/application.less')

      .pipe($.less({
       paths: [ $.path.less.join(__dirname, 'less', 'includes') ]
      }))

      .pipe($.cssmin())
      .pipe($.rename({suffix: '.min'}))
      .pipe($.gulp.dest($.config.root + '/assets/css'))
  });
};

module.exports = builder;
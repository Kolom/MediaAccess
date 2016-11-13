var builder = function($) {
  var gulp = require('gulp');
  var spritesmith = require('gulp.spritesmith');
  var buffer = require('vinyl-buffer');
  var csso = require('gulp-csso');
  var imagemin = require('gulp-imagemin');
  var merge = require('merge-stream');

  gulp.task('img:sprite', function () {
    var spriteData = gulp.src('./source/sprites/*.png').pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: '_sprite.scss',
      padding: 10
    }));

    // Pipe image stream through image optimizer and onto disk
    var imgStream = spriteData.img
      // DEV: We must buffer our stream into a Buffer for `imagemin`
      .pipe(buffer())
      .pipe(imagemin())
      .pipe(gulp.dest($.config.root + '/assets/css'));

    // Pipe CSS stream through CSS optimizer and onto disk
    var cssStream = spriteData.css
      //.pipe(csso())
      .pipe(gulp.dest('./source/scss/common/'));

    // Return a merged stream to handle both `end` events
    return merge(imgStream, cssStream);
  });
};
module.exports = builder;

'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var path  = require('path');
var plumber = require('gulp-plumber');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
// var sourcemaps = require('gulp-sourcemaps');
var buildErrorHandler = require('./../utilities/build-error-handler').handleBuildError;

gulp.task('less:build-styles', function(done) {
  gulp.src('src/less/application.less')
  // .pipe(sourcemaps.init())
  .pipe(plumber({
    errorHandler: buildErrorHandler
  }))
  .pipe(less({
    paths: [ path.join(__dirname, 'less', 'includes') ]
  }))
  .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  // .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('build/css'))
  ;

  done();
});

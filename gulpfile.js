var gulp = require('gulp')
var rollup = require('rollup')
var commonjs = require('rollup-plugin-commonjs')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')

var rollupHandle =  rollup.rollup({
  input: './index.js',
  plugins: [
    commonjs()
  ]
})

gulp.task('common', function (callback) {
  rollupHandle
  .then(function (handle) {
    return handle.write({
      file: './dist/index.common.js',
      format: 'cjs',
      exports: 'named'
    })
  })
  .then(function () {
    callback()
  })
})

gulp.task('esm', function (callback) {
  rollupHandle
  .then(function (handle) {
    return handle.write({
      file: './dist/index.esm.js',
      format: 'es',
      exports: 'named'
    })
  })
  .then(function () {
    callback()
  })
})

gulp.task('unpkg', function (callback) {
  rollupHandle
  .then(function (handle) {
    return handle.write({
      file: './dist/index.js',
      format: 'iife',
      name: 'isbot',
      exports: 'named'
    })
  })
  .then(function () {
    callback()
  })
})

gulp.task('unpkg:min', ['unpkg'], function () {
  gulp.src('./dist/index.js')
    .pipe(uglify({ mangle: false }))
    .pipe(rename('index.min.js'))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('default', ['common', 'esm', 'unpkg', 'unpkg:min'])

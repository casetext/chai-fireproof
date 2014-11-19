
'use strict';

var rmdir = require('rimraf'),
  gulp = require('gulp-help')(require('gulp')),
  rename = require('gulp-rename'),
  mocha = require('gulp-mocha'),
  concat = require('gulp-concat'),
  bump = require('gulp-bump'),
  wrap = require('gulp-wrap'),
  jsdoc2md = require('gulp-jsdoc-to-markdown'),
  filter = require('gulp-filter'),
  git = require('gulp-git'),
  tagVersion = require('gulp-tag-version'),
  version = require('./package.json').version,
  Fireproof = require('fireproof'),
  gutil = require('gulp-util');


Fireproof.bless(require('q'));

function npmPublish(done) {

  var spawn = require('child_process').spawn;

  spawn('npm', ['publish'], { stdio: 'inherit' })
  .on('error', done)
  .on('close', done);

}

function inc(importance, done) {

  gulp.src(['./package.json'])
  .pipe(bump({type: importance}))
  .pipe(gulp.dest('./'))
  .pipe(git.commit('new release'))
  .pipe(filter('package.json'))
  .pipe(tagVersion())
  .on('end', function() {

    git.push('origin', 'master', { args: ' --tags'}, function(err) {
      if (err) {
        throw err;
      }
      npmPublish(done);
    });

  });

}


gulp.task('clean', 'Remove all build files', function(done) {
  rmdir('./dist', done);
});


gulp.task('build', 'Builds the Javascript for distribution.', ['clean'], function() {

  return gulp.src([
    'lib/log.js',
    'lib/assertion-extensions.js',
    'lib/security.js'
    ])
  .pipe(concat('chai-fireproof.js'))
  .pipe(wrap({ src: 'umd.template' }, { version: version }))
  .pipe(gulp.dest('./dist'));

});


gulp.task('docs', 'Generates a new version of the docs.', ['build'], function() {

  return gulp.src(['dist/chai-fireproof.js'])
  .pipe(jsdoc2md())
  .pipe(rename(function(path) {
    path.basename = 'api';
    path.extname = '.md';
  }))
  .pipe(gulp.dest('./'));

});


gulp.task('test:setup', 'Set up tests.', ['build'], function() {


  var Firebase = require('firebase'),
    chai = require('chai');

  require('./dist/chai-fireproof');
  global.chai = chai;
  global.expect = chai.expect;

  if (!process.env.FIREBASE_TEST_URL || !process.env.FIREBASE_TEST_SECRET) {

    gutil.log('Please set FIREBASE_TEST_URL and FIREBASE_TEST_SECRET.');
    process.exit(1);

  }

  global.root = new Fireproof(new Firebase(process.env.FIREBASE_TEST_URL));
  global.authToken = process.env.FIREBASE_TEST_SECRET;

});

gulp.task('test', 'Runs tests and exits.', ['test:setup'], function() {

  function testsDone(e) {
    process.exit(e ? 1 : 0);
  }

  var tests;
  if (process.env.ONLY) {
    tests = './test/spec/' + process.env.ONLY + '.js';
  } else {
    tests = './test/spec/**/*.js';
  }

  return gulp.src(tests, { read: false })
  .pipe(mocha({ slow: 1000, timeout: 5000 }))
  .on('error', testsDone)
  .on('end', testsDone);

});

gulp.task('bump', 'Publishes a new bugfix version.', function(done) {
  inc('patch', done);
});


gulp.task('bump:minor', 'Publishes a new minor version.', function(done) {
  inc('minor', done);
});


gulp.task('bump:major', 'Publishes a new major version.', function(done) {
  inc('major', done);
});


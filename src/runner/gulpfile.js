/* eslint-disable strict */'use strict';/* eslint-enable strict */

//-------------------------------------
// Vars / Imports

var argv = require('yargs').argv;
var logger = require('bedrock-utils/src/logger.js');
var suite = require('../index.js');
var gulp = require('gulp');
var path = argv.path;

//-------------------------------------
// Functions

//-------------------------------------
// Runtime

// Prepare to scaff
gulp.task('scaff', function (cb) {
    logger.log('Bedrock scaffolding', 'Welcome! Lets scaffold.\r\n');
    suite.run(path).then(cb).catch(cb);
});

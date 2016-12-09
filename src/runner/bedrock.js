#!/usr/bin/env node

/* eslint-disable strict */'use strict';/* eslint-enable strict */

var argv = require('yargs').argv;
var logger = require('bedrock-utils/src/logger.js');
var suite = require('../index.js');
var path = argv.path;

//-------------------------------------
// Functions

//-------------------------------------
// Runtime

logger.log('Bedrock scaffolding', 'Welcome! Lets scaffold.\r\n');
suite.run(path, (err) => { if (err) { throw err; } });

<% if (hasFlow) { %>/*@flow*/<% } %>/* eslint-disable strict */'use strict';/* eslint-enable strict */

// require('core-js/es6/promise');<% if (hasJquery) { %>
var $ = require('jquery');
var header = require('blocks/header.js');

// Save elements
var body = $('body');
var headerEl = body.find('.header');

// Lets initialize general stuff
body.removeClass('no-script');

// Initialize components
// ...

// Initialize blocks
header.init(headerEl);
<% } %>

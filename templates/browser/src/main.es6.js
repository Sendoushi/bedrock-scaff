<% if (hasFlow) { %>/*@flow*/<% } %>/* eslint-disable strict */'use strict';/* eslint-enable strict */

// import 'core-js/es6/promise';<% if (hasJquery) { %>
import $ from 'jquery';<% } %>
import header from 'blocks/header.js';

// Save elements
const body = $('body');
const header = body.find('.header');

// Lets initialize general stuff
body.removeClass('no-script');

// Initialize components
// ...

// Initialize blocks
header.init(headerEl);
<% if } %>

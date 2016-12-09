/* eslint-disable strict */'use strict';/* eslint-enable */

const path = require('path');
const glob = require('glob');

// --------------------------------
// Imports test modules

<% if (isNode) { %>const styleguide = glob.sync('./styleguide/**/*.spec.js');
const sdk = glob.sync('./sdk/**/*.spec.js');
const specs = glob.sync('./src/**/*.spec.js').concat(sdk).concat(styleguide);<% } else { %>
const specs = glob.sync('./src/**/*.spec.js');<% } %>

// Now lets require it
specs.forEach(val => require(path.join(process.cwd(), val)));

<% if (hasFlow) { %>/*@flow*/<% } %>/* eslint-disable strict */'use strict';/* eslint-enable strict */

<% if (hasJquery) { %>var component = require('bedrock/src/component.js');

<% } %>var DEFAULTS = {};

// --------------------------------
// Functions

/**
 * Creates a custom select
 * @param  {object} comp
 * @return {object}
*/
function init(comp) {
    // Lets cache elements
    // ...

    // Add events
    // ...

    return comp;
}

// --------------------------------
// Export

module.exports = {
    init: function (el, data) {<% if (hasJquery) { %>
        var comp = component.getComp(data, DEFAULTS);
        comp = component.init(el, comp);

        if (!el || !el.length) {
            return comp;
        }

        return init(comp);
    <% } %>},
    destroy: function () {}
};

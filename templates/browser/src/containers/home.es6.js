<% if (hasFlow) { %>/*@flow*/<% } %>/* eslint-disable strict */'use strict';/* eslint-enable strict */

<% if (hasJquery) { %>import component from 'bedrock/src/component.js';

<% } %>const DEFAULTS = {};

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
    init: (el, data) => {<% if (hasJquery) { %>
        let comp = component.getComp(data, DEFAULTS);
        comp = component.init(el, comp);

        if (!el || !el.length) {
            return comp;
        }

        return init(comp);
    <% } %>},
    destroy: () => {}
};

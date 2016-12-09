<% if (hasFlow) { %>/*@flow*/<% } %>/* eslint-disable strict */'use strict';/* eslint-enable strict */

import $ from 'jquery';
import component from 'bedrock/src/component.js';

const DEFAULTS = {};

// --------------------------------
// Functions

/**
 * Handles scroll event
 * @param  {object} comp
 */
function onScroll(comp) {
    const scroll = $(window).scrollTop();
    let headerPos = comp.headerPos;

    if (!headerPos) {
        comp.els.body.removeClass('header-is-fixed');
        headerPos = comp.el.offset().top;

        // Lets cache
        comp.headerPos = headerPos;
    }

    // Lets fix the header
    if (headerPos <= scroll) {
        comp.els.body.addClass('header-is-fixed');
    } else {
        comp.els.body.removeClass('header-is-fixed');
    }
}

/**
 * Creates a custom select
 * @param  {object} comp
 * @return {object}
*/
function init(comp) {
    // Lets cache elements
    comp.els.body = $('body');

    // Add events
    $(window).on('scroll.header', () => {
        window.requestAnimationFrame(() => {
            onScroll(comp);
        });
    });
    $(window).on('resize.header', () => {
        comp.logoThrottler && clearTimeout(comp.logoThrottler);
        comp.throttler && clearTimeout(comp.throttler);
        comp.throttler = setTimeout(() => {
            // Force to recheck the position
            comp.headerPos = null;

            window.requestAnimationFrame(() => {
                onScroll(comp);
            });
        }, 50);
    });

    return comp;
}

// --------------------------------
// Export

module.exports = {
    init: (el, data) => {
        let comp = component.getComp(data, DEFAULTS);
        comp = component.init(el, comp);

        if (!el || !el.length) {
            return comp;
        }

        return init(comp);
    },
    destroy: () => {}
};

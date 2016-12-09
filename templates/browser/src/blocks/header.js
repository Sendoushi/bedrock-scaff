<% if (hasFlow) { %>/*@flow*/<% } %>/* eslint-disable strict */'use strict';/* eslint-enable strict */

var $ = require('jquery');
var component = require('bedrock/src/component.js');

var DEFAULTS = {};

// --------------------------------
// Functions

/**
 * Handles scroll event
 * @param  {object} comp
 */
function onScroll(comp) {
    var scroll = $(window).scrollTop();
    var headerPos = comp.headerPos;

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
    $(window).on('scroll.header', function () {
        window.requestAnimationFrame(function () {
            onScroll(comp);
        });
    });
    $(window).on('resize.header', function () {
        comp.logoThrottler && clearTimeout(comp.logoThrottler);
        comp.throttler && clearTimeout(comp.throttler);
        comp.throttler = setTimeout(function () {
            // Force to recheck the position
            comp.headerPos = null;

            window.requestAnimationFrame(function () {
                onScroll(comp);
            });
        }, 50);
    });

    return comp;
}

// --------------------------------
// Export

module.exports = {
    init: function (el, data) {
        var comp = component.getComp(data, DEFAULTS);
        comp = component.init(el, comp);

        if (!el || !el.length) {
            return comp;
        }

        return init(comp);
    },
    destroy: function () {}
};

/**
 * A set of helpers for work with DOM
 */
'use strict';

var template = require('lodash/string/template');

var dom = {
    /**
     * Returns element with provided id
     *
     * @param {string} id
     * @returns {HTMLElement}
     */
    id: function (id) {
        return window.document.getElementById(id);
    },

    /**
     * Returns templating function, where the body of template is the contents of element
     *
     * @param {string} id
     * @returns {Function}
     */
    tmpl: function (id) {
        return template(dom.html(dom.id(id)));
    },

    /**
     * Sets display:block to element
     *
     * @param {HTMLElement} el
     */
    show: function (el) {
        dom.css(el, 'display', 'block');
    },

    /**
     * Sets display:none to element
     *
     * @param {HTMLElement} el
     */
    hide: function (el) {
        dom.css(el, 'display', 'none');
    },

    /**
     * Sets or gets inner html of the element
     *
     * @param {HTMLElement} el
     * @param {?string} html
     * @returns {*}
     */
    html: function setHtml(el, html) {
        if (!el) {
            return;
        }
        if (html) {
            el.innerHTML = html;
        } else {
            return el.innerHTML;
        }
    },

    /**
     * Sets or gets style property
     *
     * @param {HTMLElement} el
     * @param {string} key
     * @param {?string} val
     */
    css: function (el, key, val) {
        if (!el) {
            return;
        }
        if (val) {
            el.style[key] = val;
        } else {
            el.style[key];
        }
    },

    /**
     * Attachecs event listener
     *
     * @param {string} type
     * @param {HTMLElement} el
     * @param {Function} listener
     */
    on: function (type, el, listener) {
        if (!el) {
            return;
        }
        el.addEventListener(type, listener);
    },

    /**
     * Detaches event listener, the opposite to #on
     *
     * @param {string} type
     * @param {HTMLElement} el
     * @param {Function} listener
     */
    off: function (type, el, fn) {
        if (!el) {
            return;
        }
        el.removeEventListener(type, fn);
    },

    /**
     * Sets or gets element's attribute value
     *
     * @param {HTMLElement} el
     * @param {string} name
     * @param {?string} val
     */
    attr: function (el, name, val) {
        if (!el) {
            return;
        }
        if (val) {
            el.setAttribute(name, val);
        } else {
            return el.getAttribute(name);
        }
    }
};

module.exports = dom;

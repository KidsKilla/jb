'use strict';

var Step = require('./step');
var Parallelogram = require('./parallelogram');

module.exports = Collection;

/**
 * A collection of steps
 * @constructor
 */
function Collection() {
    this.index = 0;
    this._items = [];
}

/**
 * Get step by insex
 *
 * @param {number} index
 * @returns {Step}
 */
Collection.prototype.get = function (index) {
    return this._items[index];
};

/**
 * Add step to collection
 * @param {HTMLElement} el
 * @param {Raphael.Element} circle
 * @returns {Collection}
 */
Collection.prototype.add = function (el, circle) {
    var hillStep = new Step(el).setCircle(circle);
    this._items.push(hillStep);
    return this;
};

/**
 * Creates parallelogram, based on this collection, using provided indexes
 *
 * @param {number} i0
 * @param {number} i1
 * @param {number} i2
 * @returns {Parallelogram}
 */
Collection.prototype.createParallelogram = function (i0, i1, i2) {
    return new Parallelogram(
        this._items[i0].point,
        this._items[i1].point,
        this._items[i2].point
    );
};

/**
 * Starts drag for all steps
 *
 * @param {Function} callback
 */
Collection.prototype.startDrag = function (callback) {
    this._items.forEach(function (step) {
        step.startDrag(callback);
    });
};

/**
 * Returns current step
 *
 * @returns {Step}
 */
Collection.prototype.getCurrent = function () {
    return this._items[this.index];
};

/**
 * Sets index to the next position or to 0 (looped)
 *
 * @returns {Collection}
 */
Collection.prototype.next = function () {
    this.index = ++this.index % this._items.length;
    return this;
};

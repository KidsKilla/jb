'use strict';

var Point = require('./point');

module.exports = Parallelogram;

/**
 * Helper class to calculate center, area ant the bottom coordinate, based on three coordinates
 *
 * @param {Point} top - the coordinate, opposite to "bottom" coordinate
 * @param {Point} a
 * @param {Point} b
 * @constructor
 */
function Parallelogram(top, a, b) {
    this.top = top;
    this.a = a;
    this.b = b;
    this.calc();
}

/**
 * Recalculates center, area ant the bottom coordinate
 *
 * @returns {Parallelogram}
 */
Parallelogram.prototype.calc = function () {
    this.center = this.a.getCenterBetween(this.b);
    this.bottom = this.center.getReflectionOf(this.top);
    this.area = getParallelogramArea(this.top, this.a, this.b);
    return this;
};

function getParallelogramArea(top, a, b) {
    var at = a.distanceTo(top);
    var bt = b.distanceTo(top);
    var ab = a.distanceTo(b);

    /**
     * Calculus:
     *
     * ab = ah + bh
     * h^2 = at^2 - ah^2
     * h^2 = bt^2 - bh^2
     *
     * at^2 - ah^2 = bt^2 - (ab - ah)^2
     * at^2 - ah^2 = bt^2 - ab^2 + 2*ab*ah - ah^2
     *
     * @type {number}
     */
    var ah = (at * at - bt * bt + ab * ab) / (2 * ab);
    var height = Math.sqrt(at * at - ah * ah);

    return ab * height;
}

'use strict';

var dom = require('./dom');
var Point = require('./point');

module.exports = Step;

/**
 * A step for program: different kind of data, used to show one circle
 *
 * @param {HTMLElement} el
 * @constructor
 */
function Step(el) {
    this.title = dom.attr(el, 'title');
    this.html = dom.html(el);
    this.point = null;
    this.circle = null;
}

/**
 * Attaches circle to step
 *
 * @param {Raphael.Element} circle
 * @returns {Step}
 */
Step.prototype.setCircle = function (circle) {
    this.circle = circle.setTitle(this.title);
    return this;
};

/**
 * Shows circle at position
 *
 * @param {number} x
 * @param {number} y
 * @returns {Step}
 */
Step.prototype.show = function (x, y) {
    this.point = new Point(x, y);
    this.circle
        .updateTitle(this.point)
        .showAt(this.point);
    return this;
};

/**
 * Starts drag circle, calling callback on drag event
 *
 * @param {Function} callback
 */
Step.prototype.startDrag = function (callback) {
    this.circle.drag(function (dx, dy, x, y) {
        this.point.x = x;
        this.point.y = y;
        this.circle.updateTitle(this.point);
        callback();
    }.bind(this));
};

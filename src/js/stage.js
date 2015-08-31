'use strict';

var raph = require('./raph');
var View = require('./view');
var Raphael = require('raphael');
var StepsCollection = require('./steps-collection');
var dom = require('./dom');

module.exports = Stage;

/**
 * The program
 *
 * @param {number} x
 * @param {number} y
 * @param {number|string} w
 * @param {number|string} h
 * @constructor
 */
function Stage(x, y, w, h) {
    raph.install();
    this._steps = new StepsCollection();
    this._statusTmplater = null;
    this._statusElement = null;
    this._resetButton = null;
    this._parallelogram = null;

    this._onClick = function (evt) {
        this._nextStep(evt.clientX, evt.clientY);
    }.bind(this);

    this._paper = Raphael(x, y, w, h);
    this._view = new View(this._paper);
}

/**
 * Binds status element to stage: rendered status html will be shown there
 *
 * @param {string} id
 * @returns {Stage}
 */
Stage.prototype.setStatusElement = function (id) {
    this._statusElement = dom.id(id);
    return this;
};

/**
 * Binds reset button to stage
 *
 * @param {string} id
 * @returns {Stage}
 */
Stage.prototype.setResetButton = function (id) {
    this._resetButton = dom.id(id);
    dom.on('click', this._resetButton, this.reset.bind(this));
    return this;
};

/**
 * Initializes steps:
 * receives id of templates to get status text and title for circles
 *
 * @param {string} firstId
 * @param {string} secondId
 * @param {string} thirdId
 * @param {string} fullViewId
 * @returns {Stage}
 */
Stage.prototype.setSteps = function (firstId, secondId, thirdId, fullViewId) {
    this._steps.add(dom.id(firstId), this._view.a);
    this._steps.add(dom.id(secondId), this._view.top);
    this._steps.add(dom.id(thirdId), this._view.b);

    this._statusTmplater = dom.tmpl(fullViewId);

    return this;
};

/**
 * Resets stage state to initial and runs again
 * @returns {Stage}
 */
Stage.prototype.reset = function () {
    dom.hide(this._resetButton);
    this._view.hide();
    this._steps.index = 0;
    this.run();
    return this;
};

/**
 * @returns {Stage}
 */
Stage.prototype.run = function () {
    var firstHtml = this._steps.getCurrent().html;
    this._setStatusHtml(firstHtml);
    this._paper.canvas.addEventListener('click', this._onClick);
    return this;
};

Stage.prototype._nextStep = function (x, y) {
    this._steps.getCurrent().show(x, y);

    dom.show(this._resetButton);

    var isFullViewReady = this._steps.next().index === 0;
    if (isFullViewReady) {
        this._showFullView();
    } else {
        this._setStatusHtml(this._steps.getCurrent().html);
    }
};

Stage.prototype._showFullView = function () {
    dom.off('click', this._paper.canvas, this._onClick);
    this._parallelogram = this._steps.createParallelogram(1, 0, 2);

    this._render();
    this._view.show();

    this._steps.startDrag(
        this._render.bind(this)
    );
};

Stage.prototype._render = function () {
    this._parallelogram.calc();

    var html = this._statusTmplater(this._parallelogram);
    this._setStatusHtml(html);

    this._view.drawParallelogram(this._parallelogram);
};

Stage.prototype._setStatusHtml = function (html) {
    dom.html(this._statusElement, html);
};



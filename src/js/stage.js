'use strict';

var View = require('./view');
var Point = require('./point');
var Parallelogram = require('./parallelogram');
var Raphael = require('raphael');
var template = require('lodash/string/template');

module.exports = Stage;

function Stage(x, y, w, h) {
    this._steps = [];
    this._i = 0;
    this._statusTmplate = null;

    this._onClick = this._onClick_.bind(this);

    this.paper = Raphael(x, y, w, h);
    this.view = new View(this.paper);
}

Stage.prototype.setStatus = function (id) {
    this._statusElement = getElementById(id);
    return this;
};

Stage.prototype.setResetButton = function (id) {
    this._resetButton = getElementById(id);
    this._resetButton.addEventListener('click', this.reset.bind(this));
    return this;
};

Stage.prototype.reset = function () {
    this._resetButton.style.display = 'none';
    this.view.hide();
    this._i = 0;
    this._startSteps();
    return this;
};

Stage.prototype._startSteps = function () {
    this._setStatusHtml(this._steps[0].html);
    this.paper.canvas.addEventListener('click', this._onClick);
};

Stage.prototype.run = function (firstId, secondId, thirdId, lastId) {
    this._steps = [
        new Step(firstId),
        new Step(secondId),
        new Step(thirdId)
    ];

    var lastStep = new Step(lastId);
    this._statusTmplate = template(lastStep.html);

    this._startSteps();;

    return this;
};

Stage.prototype._onClick_ = function callee(evt) {
    this._nextStep(evt.clientX, evt.clientY);
};

Stage.prototype._nextStep = function (x, y) {
    this._resetButton.style.display = 'inline';
    this._setStep(x, y);
    var isOnLast = ++this._i === this._steps.length;
    if (isOnLast) {
        this._start();
    } else {
        this._setStatusHtml(this._steps[this._i].html);
    }
};

Stage.prototype._setStep = function (x, y) {
    var step = this._steps[this._i];
    step.point = new Point(x, y);

    switch (this._i) {
        case 0:
            this.view.setA(x, y);
            break;
        case 1:
            this.view.setTop(x, y);
            break;
        case 2:
            this.view.setB(x, y);
            break;
        default:
            throw new Error('No more steps');
    }
};

Stage.prototype._start = function () {
    this.paper.canvas.removeEventListener('click', this._onClick);

    var par = new Parallelogram(
        this._steps[1].point,
        this._steps[0].point,
        this._steps[2].point
    );

    this._draw(par);
    this.view.show();

    this._startDrag(par);
};

Stage.prototype._draw = function (par) {
    par.calc();

    var html = this._statusTmplate(par);
    this._setStatusHtml(html);

    this.view.drawParallelogram(par);
};

Stage.prototype._setStatusHtml = function (html) {
    this._statusElement.innerHTML = html;
};

Stage.prototype._startDrag = function (par) {
    this._startDragCircle(this.view.a, par.a, par);
    this._startDragCircle(this.view.b, par.b, par);
    this._startDragCircle(this.view.top, par.top, par);
};

Stage.prototype._startDragCircle = function (circle, point, par) {
    circle.drag(function (dx, dy, x, y) {
        point.x = x;
        point.y = y;
        this._draw(par);
    }.bind(this));
};

function Step(id) {
    var el = getElementById(id);
    return {
        id: id,
        el: el,
        html: el.innerHTML,
        point: null,
    };
}

function getElementById(id) {
    return window.document.getElementById(id);
}

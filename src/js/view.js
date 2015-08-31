'use strict';

var Point = require('./point');
var Parallelogram = require('./parallelogram');
var raph = require('./raph');

module.exports = View;

function View(paper) {
    raph.install();

    this.circle = paper.circle().hide();
    this.path = paper.path('').hide();

    this.bottom = paper.circle().attr({r: 3}).hide();
    this.center = paper.circle().attr({r: 1}).hide();

    this.top = paper.circle().attr({r: 11}).hide();
    this.a = paper.circle().attr({r: 11}).hide();
    this.b = paper.circle().attr({r: 11}).hide();

    Object.keys(this).forEach(function (k) {
        this[k].node.setAttribute('id', k);
    }, this);

    this.paper = paper;
}

View.prototype.setTop = function (x, y) {
    return this._setCircle(this.top, x, y);
};

View.prototype.setA = function (x, y) {
    return this._setCircle(this.a, x, y);
};

View.prototype.setB = function (x, y) {
    return this._setCircle(this.b, x, y);
};

View.prototype._setCircle = function (circle, x, y) {
    circle
        .attr({cx: x, cy: y})
        .fadeIn(200)
        .radiusFrom(100, 100);
    return this;
};

View.prototype.show = function () {
    this.circle.fadeIn();
    this.path.fadeIn();

    this.bottom.fadeIn();
    this.center.fadeIn();
};

View.prototype.drawParallelogram = function (par) {
    this.top.attr({
        cx: par.top.x,
        cy: par.top.y
    });
    this.a.attr({
        cx: par.a.x,
        cy: par.a.y
    });
    this.b.attr({
        cx: par.b.x,
        cy: par.b.y
    });

    this.bottom.attr({
        cx: par.bottom.x,
        cy: par.bottom.y
    });

    this.center.attr({
        cx: par.center.x,
        cy: par.center.y
    });

    this.circle.attr({
        cx: par.center.x,
        cy: par.center.y,
        r: Math.sqrt(par.area / Math.PI),
    });

    var coordPairs = [par.b, par.bottom, par.a, par.top]
        .map(function (point) {
            return point.x + ',' + point.y;
        });
    this.path.attr({
        path: 'M' + coordPairs.join('L') + 'Z'
    });
};

View.prototype.hide = function () {
    this.circle.hide();
    this.path.hide();

    this.bottom.hide();
    this.center.hide();

    this.a.hide();
    this.b.hide();
    this.top.hide();
};

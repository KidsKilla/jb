'use strict';

module.exports = View;

/**
 * Draws figure: 3 red circles, blue parallelogram and yellow circle
 * @param {Raphael.Paper} paper
 * @constructor
 */
function View(paper) {
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

    this._paper = paper;
}

/**
 * Shows all stuff except circles: they must be shown separately
 * @returns {View}
 */
View.prototype.show = function () {
    this.circle.fadeIn();
    this.path.fadeIn();

    this.bottom.fadeIn();
    this.center.fadeIn();
    return this;
};

/**
 * Draws figure according to provided parallelogram
 * @param {Parallelogram} par
 * @returns {View}
 */
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
        r: Math.sqrt(par.area / Math.PI)
    });

    var coordPairs = [par.b, par.bottom, par.a, par.top]
        .map(function (point) {
            return point.x + ',' + point.y;
        });
    this.path.attr({
        path: 'M' + coordPairs.join('L') + 'Z'
    });
    return this;
};

/**
 * Hides all figure
 * @returns {View}
 */
View.prototype.hide = function () {
    this.circle.hide();
    this.path.hide();

    this.bottom.hide();
    this.center.hide();

    this.a.hide();
    this.b.hide();
    this.top.hide();
    return this;
};

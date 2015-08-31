'use strict';

var Raphael = require('raphael');

exports.install = function () {
    if (Raphael.el.fadeIn) {
        return;
    }
    Raphael.el.radiusFrom = function (radius, speed) {
        var curRadius = this.attr('r');
        return this
            .attr('r', radius)
            .animate({r: curRadius}, speed || 500);
    };

    Raphael.el.fadeIn = function (speed) {
        return this
            .attr({opacity: 0})
            .show()
            .animate({opacity: 1}, speed || 500);
    };
};

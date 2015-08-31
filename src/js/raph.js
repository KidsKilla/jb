'use strict';

var Raphael = require('raphael');
var template = require('lodash/string/template');

exports.install = function () {
    if (Raphael.el.showAt) {
        return;
    }

    Raphael.el.fadeIn = function (speed) {
        return this
            .attr({opacity: 0})
            .show()
            .animate({opacity: 1}, speed || 500);
    };

    Raphael.el.showAt = function (point, speed) {
        return this
            .attr({
                cx: point.x,
                cy: point.y,
            })
            .fadeIn(speed || 200);
    };

    Raphael.el.setTitle = function (title) {
        title += '\n'
            + 'x: ${x}\n'
            + 'y: ${y}';
        return this.data('title', template(title));
    };

    Raphael.el.updateTitle = function (point) {
        var tmpl = this.data('title');
        return this.attr('title', tmpl(point));
    };
};

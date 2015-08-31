'use strict';

module.exports = Point;

function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.getCenterBetween = function (point) {
    return new Point(
        (this.x + point.x) / 2,
        (this.y + point.y) / 2
    );
};

Point.prototype.getReflectionOf = function (point) {
    return new Point(
        2 * this.x - point.x,
        2 * this.y - point.y
    );
};

Point.prototype.distanceTo = function (point) {
    var xDiff = this.x - point.x;
    var yDiff = this.y - point.y;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
};

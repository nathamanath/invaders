define([],
  function() {

  'use strict';

  /**
   * @class Rectangle
   */
  var Rectangle = function(drawable) {
    this._x = drawable.x();
    this._y = drawable.y();
    this._width = drawable.width();
    this._height = drawable.height();
  };

  /** @lends Rectangle */
  Rectangle.prototype = {
    constructor: 'Rectangle',

    init: function() {

      return this;
    },

    /** @retuens array of pixil coordinates for edges */
    edges: function() {
      var x = this._x;
      var y = this._y;
      var xMax = x + this._width;
      var yMax = y + this._height;
      var out = [];

      for(var i = x, l = xMax; i <= l; i++) {
        for(var j = y, m = yMax; j <= m; j++) {
          if(i === x || j === y || i === xMax || j === yMax) {
            out.push([i, j]);
          }
        }
      }

      return out;
    }
  };

  return Rectangle;

});

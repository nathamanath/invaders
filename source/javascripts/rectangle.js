define([], function() {
  'use strict';

  var Rectangle = function(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.grid = [];
  };

  Rectangle.prototype = {
    // TODO: only need outer coords in matrix
    init: function() {
      for (var x_ = 0; x_ < this.w; x_++) {
        for (var y_ = 0; y_ < this.h; y_++) {
          this.grid.push([this.x + x_, this.y + y_]);
        }
      }

      return this;
    }
  };

  return Rectangle;
})

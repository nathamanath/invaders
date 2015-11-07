define([], function() {
  'use strict';

  var Bitmap = function(imageData){
    this.imageData = imageData;
    this.height = this.imageData.height;
    this.width = this.imageData.width;
    this.x = 0;
    this.y = 0;
  };

  Bitmap.prototype = {
    hitTest: function(rect, color) {
      color = color || 'RGBA(0,0,255,255)';
      for (var i = 0; i < rect.grid.length; i++) {
        var x = rect.grid[i][0];
        var y = rect.grid[i][1];
        var pixel = this.getPixel(x, y);

        // or if pixel if you dont mind what colour
        return pixel === color
      }
      return false;
    },

    fillColor: function(r, g, b, a){
      for (var x = 0; x < this.imageData.width; x++)  {
        for (var y = 0; y < this.imageData.height; y++)  {

          // Index of the pixel in the array
          var idx = (x + y * this.width) * 4;

          this.imageData.data[idx + 0] = r;
          this.imageData.data[idx + 1] = g;
          this.imageData.data[idx + 2] = b;
          this.imageData.data[idx + 3] = a;

        }
      }
    },

    getPixel: function(x, y) {
      var x = x + -this.x;
      var y = y + -this.y;

      var canvasData = this.imageData;

      if(x < 0 || y < 0 || x > canvasData.width || y > canvasData.height) return;

      var r = (y * canvasData.width + x) * 4;
      var g = (y * canvasData.width + x) * 4 + 1;
      var b = (y * canvasData.width + x) * 4 + 2;
      var a = (y * canvasData.width + x) * 4 + 3;

      return 'RGBA(' + canvasData.data[r] + ',' + canvasData.data[g] + ',' + canvasData.data[b] + ',' + canvasData.data[a] + ')';
    }
  };

  return Bitmap;
});

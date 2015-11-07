define(['bitmap', 'mixins/drawable'],
  function(Bitmap, Drawable) {

  'use strict';

  var HOUSE_WIDTH = 100;
  var HOUSE_HEIGHT = 100;

  /**
   * @class House
   */
  var House = function(args) {
    args = args || {};

    this._initDrawable(args);

    this._width = HOUSE_WIDTH;
    this._height = HOUSE_HEIGHT;
  };

  /** @lends House */
  House.prototype = {
    constructor: 'House',

    init: function() {
      this.bitmap = new Bitmap(this.context().createImageData(this.width(), this.height()));
      this.bitmap.fillColor(255, 0, 0, 255);
      this.bitmap.x = this.x();
      this.bitmap.y = this.y();

      this.render();

      return this;
    },

    render: function() {
      this._clearCanvas();
      this.canvas().context().putImageData(this.bitmap.imageData, this.x(), this.y());
    },

    update: function() {
      this.render();
    },

    shot: function(x, y) {
      var diameter = 6;
      var context = this.canvas().context();

      var _x = this.x();
      var _y = this.y();

      context.globalCompositeOperation = "destination-out";
      context.beginPath();
      context.arc(x - diameter / 2, y, diameter, 0, Math.PI*2, true);
      context.fill();

      var newCanvasData = context.getImageData(_x, _y, this.width(), this.height());
      this.bitmap.imageData = newCanvasData;
      context.putImageData(newCanvasData, _x, _y);

      this.update();
    }
  };

  Drawable.call(House.prototype);

  return House;
});

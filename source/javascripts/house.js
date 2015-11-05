define(['bitmap', 'mixins/drawable'],
  function(Bitmap, Drawable) {

  'use strict';

  /**
   * @class House
   */
  var House = function(args) {
    args = args || {};

    this.x(args.x);
    this.y(args.y);

    this._context = args.context;
    this._width = 100;
    this._height = 100;
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

      context.globalCompositeOperation = "destination-out";
      context.beginPath();
      context.arc(x - diameter / 2, y, diameter, 0, Math.PI*2, true);
      context.fill();

      var newCanvasData = context.getImageData(this.x(), this.y(), this.width(), this.height());
      this.bitmap.imageData = newCanvasData;
      context.putImageData(newCanvasData, this.x(), this.y());

      this.update();
    }
  };

  Drawable.call(House.prototype);

  return House;
});

define(['mixins/drawable'],
  function(Drawable) {

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

  House.HOUSE_HEIGHT = HOUSE_HEIGHT;

  /** @lends House */
  House.prototype = {
    constructor: 'House',

    init: function() {

      this.canvas().context().fillStyle = 'red';
      this.canvas().context().fillRect(0, 0, HOUSE_WIDTH, HOUSE_HEIGHT);

      this._imageData = this.canvas().context().getImageData(0, 0, this.width(), this.height());

      this.render();

      return this;
    },

    imageData: function() {
      return this._imageData;
    },

    render: function() {
      //this._clearCanvas();
      this.context().putImageData(this._imageData, this.x(), this.y());
    },

    update: function() {
      this.render();

      this.context().drawImage(this.canvas().el, this.x(), this.y());
    },

    shot: function(x, y) {
      var diameter = 7;
      var context = this.canvas().context();

      var _x = this.x();
      var _y = this.y();

      // Clear a circle on canvas
      context.globalCompositeOperation = "destination-out";
      context.beginPath();
      context.arc((x - _x) - diameter / 2, y - _y, diameter, 0, Math.PI*2, true);
      context.fill();
      context.restore();

      var newCanvasData = context.getImageData(0, 0, this.width(), this.height());

      this._imageData = newCanvasData;

      context.putImageData(newCanvasData, 0, 0);

      this.update();
    }
  };

  Drawable.call(House.prototype);

  return House;
});

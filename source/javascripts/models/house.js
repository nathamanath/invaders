define(['mixins/drawable', 'asset-bank'],
  function(Drawable, AssetBank) {

  'use strict';

  var HOUSE_WIDTH = 100;
  var HOUSE_HEIGHT = 112;

  /**
   * @class House
   */
  var House = function(args) {
    args = args || {};

    this._initDrawable(args);

    this._width = HOUSE_WIDTH;
    this._height = HOUSE_HEIGHT;
  };

  House.HEIGHT = HOUSE_HEIGHT;

  /** @lends House */
  House.prototype = {
    constructor: 'House',

    init: function() {

      this.canvas().fillWithImage(AssetBank.getImage('logo'));

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

    // OPTIMIZE: only draw if changed
    update: function() {
      this.context().drawImage(this.canvas().el, this.x(), this.y());
      this.render();
    },

    // cut out circle around x,y
    shot: function(x, y) {
      var diameter = 8;
      var context = this.canvas().context();

      y = y + (diameter / 2);

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
    },

    // Cut out rectangle form this._imageData
    overlapped: function(x, y, w, h) {
      var context = this.canvas().context();
      var _x = this.x();
      var _y = this.y();

      // Clear a rectangle
      context.globalCompositeOperation = "destination-out";
      context.fillRect(x - _x, y - _y, w, h);
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

define(['mixins/drawable', 'mixins/audible', 'canvas'],
  function(Drawable, Audible, Canvas) {

  'use strict';

  var UFO_WIDTH = 150;
  var UFO_HEIGHT = 100;
  var UFO_SPEED = 5;

  /**
   * @class UFO
   */
  var UFO = function(args) {
    this._initDrawable(args);

    this._canvas = args.canvas;
    this._x = args.x;
  };

  /** @lends UFO */
  UFO.prototype = {
    constructor: 'UFO',

    init: function() {

      this._width = UFO_WIDTH;
      this._height = UFO_HEIGHT;

      this.x(this.width() * -1);

      this._active = true;

      return this;
    },

    WIDTH: UFO_WIDTH,
    HEIGHT: UFO_HEIGHT,

    speed: function() {
      return UFO_SPEED;
    },

    inBounds: function() {
      var x = this.x();
      var y = this.y();
      var canvas = this.parentCanvas();

      return x >= 0 &&
        y >= 0  &&
        x + this.width() < canvas.width &&
        y + this.height() < canvas.height
    },

    update: function() {
      this.x(this.x + this.speed());
    }
  };

  Drawable.call(UFO.prototype);

  return Drawable;

});

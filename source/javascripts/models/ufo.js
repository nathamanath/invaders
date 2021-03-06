define(['mixins/drawable', 'canvas', 'mixins/explosive'],
  function(Drawable, Canvas, Explosive) {

  'use strict';

  var UFO_WIDTH = 80;
  var UFO_HEIGHT = 35;
  var UFO_SPEED = 3;

  /**
   * @class UFO
   */
  var UFO = function(args) {
    this._initDrawable(args);
    this._initExplosive(args);

    this._canvas = args.canvas;
    this._x = args.x;
    this._points = args.score;
  };

  UFO.WIDTH = UFO_WIDTH;
  UFO.HEIGHT = UFO_HEIGHT;

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

    speed: function() {
      return UFO_SPEED;
    },

    inBounds: function() {
      var x = this.x();
      var canvas = this._parentCanvas();

      return x >= (UFO_WIDTH * -1) && x <= canvas.width;
    },

    update: function() {
      this.x(this.x() + this.speed());
    },

    active: function() {
      var active = this.inBounds() && this._active;

      if(!active){
        this._onInactive();
      }

      return active;
    },

    _onInactive: function() {
    },

    shot: function() {
      this._active = false;
      this.explode();
    }
  };

  Drawable.call(UFO.prototype);
  Explosive.call(UFO.prototype, 'ufo');

  return UFO;

});

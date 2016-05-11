define(['mixins/drawable', 'mixins/audible', 'canvas', 'audio-player', 'mixins/explosive'],
  function(Drawable, Audible, Canvas, AudioPlayer, Explosive) {

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

      AudioPlayer.play('bloop', true);

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

    points: function() {
      return (Math.floor(Math.random() * 3) + 1) * 50;
    },

    _onInactive: function() {
      AudioPlayer.stop('bloop');
    },

    shot: function() {
      this._active = false;
      // TODO: spawn score
    }
  };

  Drawable.call(UFO.prototype);
  Explosive.call(UFO.prototype);

  return UFO;

});

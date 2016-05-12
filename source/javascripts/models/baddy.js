define(['mixins/drawable', 'mixins/shooter', 'canvas', 'mixins/animatable', 'mixins/explosive'],
  function(Drawable, Shooter, Canvas, Animatable, Explosive) {

  'use strict';

  var BADDY_WIDTH = 60;
  var BADDY_HEIGHT = 50;
  var BADDY_SPEED = 5;
  var BADDY_COOL_DOWN = 1000;
  var BADDY_TEAM = 3;

  /**
   * @class Baddy
   */
  var Baddy = function(args) {
    args = args || {};

    this._initDrawable(args);
    this._initShooter(args);
    this._initAnimatable(args);
    this._initExplosive(args);

    this._width = args.width;
    this._height = args.height;

    this._lives = 1;
    this._points = args.points;

    this._bulletType = args.bulletType;
  };

  Baddy.WIDTH = BADDY_WIDTH;
  Baddy.HEIGHT = BADDY_HEIGHT;
  Baddy.SPEED = BADDY_SPEED;
  Baddy.TEAM = BADDY_TEAM;

  /** @lends Baddy */
  Baddy.prototype = {
    constructor: 'Baddy',

    init: function() {
      this._active = true;

      return this;
    },

    update: function() {
      this._updateAnimatable();
    },

    shot: function() {
      this._active = false;
      this.explode();
    },

    active: function() {
      return this._active;
    },

    points: function() {
      return this._points;
    }
  };

  Drawable.call(Baddy.prototype);
  Shooter.call(Baddy.prototype, BADDY_TEAM, BADDY_COOL_DOWN, 'DOWN');
  Animatable.call(Baddy.prototype);
  Explosive.call(Baddy.prototype, 'player');

  return Baddy;

});

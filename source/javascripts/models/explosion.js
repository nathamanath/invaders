define(['mixins/drawable', 'canvas', 'asset-bank'],
  function(Drawable, Canvas, AssetBank) {

  'use strict';

  var EXPLOSION_WIDTH = 65;
  var EXPLOSION_HEIGHT = 45;
  var EXPLOSION_DURATION = 100; // ms

  /**
   * @class Explosion
   */
  var Explosion = function(args) {
    args = args || {};

    this._initDrawable(args);

    this._onUpdate = args.onUpdate;
    this._canvas = args.canvas;
  };

  Explosion.WIDTH = EXPLOSION_WIDTH;
  Explosion.HEIGHT = EXPLOSION_HEIGHT;

  /** @lends Explosion */
  Explosion.prototype = {
    constructor: 'Explosion',

    init: function() {
      var self = this;

      this._width = EXPLOSION_WIDTH;
      this._height = EXPLOSION_HEIGHT;

      self._active = true;

      window.setTimeout(function() {
        self._active = false;
        self._onUpdate();
      }, EXPLOSION_DURATION);

      return self;
    },

    // TODO: this is asssigned in factory. can it be moved here?
    update: function() {
    },

    active: function() {
      return this._active;
    }
  };

  Drawable.call(Explosion.prototype);

  return Explosion;

});

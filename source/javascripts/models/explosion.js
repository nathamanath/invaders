define(['mixins/drawable', 'canvas', 'asset-bank'],
  function(Drawable, Canvas, AssetBank) {

  'use strict';

  var EXPLOSION_DURATION = 100; // ms

  /**
   * @class Explosion
   */
  var Explosion = function(args) {
    args = args || {};

    this._initDrawable(args);

    this._onUpdate = args.onUpdate;
    this._canvas = args.canvas;

    this._width = args.width;
    this._height = args.height;
  };

  /** @lends Explosion */
  Explosion.prototype = {
    constructor: 'Explosion',

    init: function() {
      var self = this;

      self._active = true;

      window.setTimeout(function() {
        self._active = false;
        self._onUpdate();
      }, EXPLOSION_DURATION);

      return self;
    },

    // TODO: this is assigned in factory. can it be moved here?
    update: function() {
    },

    active: function() {
      return this._active;
    }
  };

  Drawable.call(Explosion.prototype);

  return Explosion;

});

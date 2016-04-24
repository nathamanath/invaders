define(['mixins/drawable', 'canvas', 'asset-bank'],
  function(Drawable, Canvas, AssetBank) {

  'use strict';

  var EXPLOSION_WIDTH = 65;
  var EXPLOSION_HEIGHT = 45;
  var EXPLOSION_DURATION = 100; // ms

  var preRendered = function() {

    var render = function() {
      var canvas = new Canvas({
        width: EXPLOSION_WIDTH,
        height: EXPLOSION_HEIGHT
      }).init();

      var context = canvas.context();
      var image = AssetBank.getImage('explosion')

      context.drawImage(image, 0, 0, EXPLOSION_WIDTH, EXPLOSION_HEIGHT);

      return function() {
        return canvas;
      }
    };

    preRendered = render();
    return preRendered();
  };

  /**
   * @class Explosion
   */
  var Explosion = function(args) {
    args = args || {};

    this._initDrawable(args);

    this._onUpdate = args.onUpdate;
  };

  /** @lends Explosion */
  Explosion.prototype = {
    constructor: 'Explosion',

    init: function() {
      var self = this;

      this._width = EXPLOSION_WIDTH;
      this._height = EXPLOSION_HEIGHT;

      self._active = true;

      this._canvas = preRendered();

      window.setTimeout(function() {
        self._active = false;
        self._onUpdate();
      }, EXPLOSION_DURATION);

      return self;
    },

    update: function() {
    },

    active: function() {
      return this._active;
    }
  };

  Drawable.call(Explosion.prototype);

  return Explosion;

});

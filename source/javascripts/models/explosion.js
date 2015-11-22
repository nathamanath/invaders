define(['mixins/drawable', 'canvas'],
  function(Drawable, Canvas) {

  'use strict';

  var EXPLOSION_WIDTH = 50;
  var EXPLOSION_HEIGHT = 50;
  var EXPLOSION_DURATION = 100; // ms

  var preRendered = (function() {
    var canvas = new Canvas({
      width: EXPLOSION_WIDTH,
      height: EXPLOSION_HEIGHT
    }).init();

    var context = canvas.context();

    context.fillStyle = 'brown';
    context.fillRect(0, 0, EXPLOSION_WIDTH, EXPLOSION_HEIGHT);

    return canvas;
  })();

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

      this._canvas = preRendered;

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

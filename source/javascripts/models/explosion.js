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
  };

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
      }, EXPLOSION_DURATION);

      self.render();

      return self;
    },

    render: function() {
      this.canvas().context().drawImage(preRendered.el, this.x(), this.y());
    },

    update: function() {
      this._clearCanvas();
      this.render();
    },

    active: function() {
      return this._active;
    }
  };

  Drawable.call(Explosion.prototype);

  return Explosion;

});

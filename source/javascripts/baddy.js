define(['mixins/drawable', 'canvas'],
  function(Drawable, Canvas) {

  'use strict';

  var BADDY_WIDTH = 100;
  var BADDY_HEIGHT = 100;
  var BADDY_SPEED = 5;
  var BADDY_COOL_DOWN = 1000;

  var preRendered = (function() {
    var canvas = new Canvas({
      width: BADDY_WIDTH,
      height: BADDY_HEIGHT
    }).init();

    var context = canvas.context();

    context.fillStyle = 'green';
    context.fillRect(0, 0, BADDY_WIDTH, BADDY_HEIGHT);

    return canvas;
  })();

  /**
   * @class Baddy
   */
  var Baddy = function(args) {
    args = args || {};

    this.x(args.x);
    this.y(args.y);

    this._width = BADDY_WIDTH;
    this._height = BADDY_HEIGHT;

    this._context = args.context;

    this._bullets = args.bullets;
    this.preRenderCanvas = args.preRendered;
  };

  Baddy.WIDTH = BADDY_WIDTH;
  Baddy.HEIGHT = BADDY_HEIGHT;

  /** @lends Baddy */
  Baddy.prototype = {
    constructor: 'Baddy',

    init: function() {
      this._active = true;
      this._ready = true;

      this._render(this.canvas().context());

      return this;
    },

    _render: function(context) {
      context.drawImage(preRendered.el, this.x(), this.y());
    },

    update: function() {
      this._clearCanvas();
      this._render(this.canvas().context());
    },

    shoot: function() {},

    shot: function() {
      this._active = false;
    },

    active: function() {
      return this._active;
    }
  };

  Drawable.call(Baddy.prototype);

  return Baddy;

});

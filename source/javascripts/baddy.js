define(['mixins/drawable', 'canvas'],
  function(Drawable, Canvas) {

  'use strict';

  var BADDY_WIDTH = 50;
  var BADDY_HEIGHT = 50;
  var BADDY_SPEED = 5;
  var BADDY_COOL_DOWN = 1000;

  var top = (function() {
    var canvas = new Canvas({
      width: BADDY_WIDTH,
      height: BADDY_HEIGHT
    }).init();

    var context = canvas.context();

    context.fillStyle = 'green';
    context.fillRect(0, 0, BADDY_WIDTH, BADDY_HEIGHT);

    return canvas;
  })();

  var middle = (function() {
    var canvas = new Canvas({
      width: BADDY_WIDTH,
      height: BADDY_HEIGHT
    }).init();

    var context = canvas.context();

    context.fillStyle = 'brown';
    context.fillRect(0, 0, BADDY_WIDTH, BADDY_HEIGHT);

    return canvas;
  })();

  var bottom = (function() {
    var canvas = new Canvas({
      width: BADDY_WIDTH,
      height: BADDY_HEIGHT
    }).init();

    var context = canvas.context();

    context.fillStyle = 'purple';
    context.fillRect(0, 0, BADDY_WIDTH, BADDY_HEIGHT);

    return canvas;
  })();

  var prerenders = {
    top: top,
    middle: middle,
    bottom: bottom
  }

  /**
   * @class Baddy
   */
  var Baddy = function(args) {
    args = args || {};

    this._type = args.type;

    this.x(args.x);
    this.y(args.y);

    this._width = BADDY_WIDTH;
    this._height = BADDY_HEIGHT;

    this._context = args.context;

    this._bullets = args.bullets;

    this._preRendered = prerenders[args.type];
  };

  Baddy.WIDTH = BADDY_WIDTH;
  Baddy.HEIGHT = BADDY_HEIGHT;
  Baddy.SPEED = BADDY_SPEED;

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
      context.drawImage(this._preRendered.el, this.x(), this.y());
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

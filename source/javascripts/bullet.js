define(['canvas', 'rectangle', 'mixins/drawable'],
  function(Canvas, Rectangle, Drawable) {

  'use strict';

  // We render each type of bullet once,
  // and re use that canvas everywhere
  var preRendered = (function() {
    var canvas = new Canvas({
      width: 5,
      height: 15
    }).init();

    var context = canvas.context();

    context.fillStyle = 'red';
    context.fillRect(0, 0, 5, 15);

    return canvas;
  })();

  var BULLET_SPEED = 10;
  var BULLET_WIDTH = 12;
  var BULLET_HEIGHT = 30;

  var Bullet = function(args) {
    args = args || {};

    this.x(args.x);
    this.y(args.y);

    this._context = args.context;
    this._direction = args.direction;
  }

  Bullet.UP = -1;
  Bullet.DOWN = 1;

  Bullet.prototype = {
    constructor: 'Bullet',

    init: function() {
      this._width = BULLET_WIDTH;
      this._height = BULLET_HEIGHT;

      this._active = true;

      this.render();

      return this;
    },

    render: function() {
      this.canvas().context().drawImage(preRendered.el, this.x(), this.y());
    },

    update: function() {
      this._clearCanvas();
      this.y(this.y() + (5 * this._direction));
      this.render();
    },

    inBounds: function() {
      return this.y() > - this.height() && this.y() < this._parentCanvas().height;
    },

    explode: function() {
      this._active = false;

      // TODO: spawn explosion centered at center of bullet
    },

    active: function() {
      return this.inBounds() && this._active;
    }
  }

  Drawable.call(Bullet.prototype);

  return Bullet;

});

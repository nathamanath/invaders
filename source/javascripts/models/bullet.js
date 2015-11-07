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

    this._initDrawable(args);


    this._team = args.team;
    this._direction = args.direction;
  }

  Bullet.UP = -1;
  Bullet.DOWN = 1;
  Bullet.WIDTH = BULLET_WIDTH;

  Bullet.prototype = {
    constructor: 'Bullet',

    init: function() {
      this._width = BULLET_WIDTH;
      this._height = BULLET_HEIGHT;

      this._active = true;

      this.render();

      return this;
    },

    team: function() {
      return this._team;
    },

    // Bullet can only go up / down so cache x
    render: function() {
      var x = this.x();

      var method = function() {
        this.canvas().context().drawImage(preRendered.el, x, this.y());
      };

      method.call(this);
      this.render = method;
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
    },

    active: function() {
      return this.inBounds() && this._active;
    }
  }

  Drawable.call(Bullet.prototype);

  return Bullet;

});

define(['canvas', 'rectangle', 'mixins/drawable'],
  function(Canvas, Rectangle, Drawable) {

  'use strict';



  var BULLET_SPEED = 10;
  var BULLET_WIDTH = 5;
  var BULLET_HEIGHT = 15;

  // We render each type of bullet once,
  // and re use that canvas everywhere
  var preRendered = (function() {
    var canvas = new Canvas({
      width: BULLET_WIDTH,
      height: BULLET_HEIGHT
    }).init();

    var context = canvas.context();

    context.fillStyle = 'red';
    context.fillRect(0, 0, BULLET_WIDTH, BULLET_HEIGHT);

    return canvas;
  })();

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

      this._canvas = preRendered;

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
    },

    pointyEndY: function() {
      var y;

      if(this._direction === Bullet.UP) {
        y = this.y();
      } else {
        y = this.y() + this.height();
      }

      return y;
    }
  }

  Drawable.call(Bullet.prototype);

  return Bullet;

});

define(['canvas', 'mixins/drawable', 'mixins/animatable', 'mixins/explosive'],
  function(Canvas, Drawable, Animatable, Explosive) {

  'use strict';

  var BULLET_SPEED = 10;
  var BULLET_WIDTH = 9;
  var BULLET_HEIGHT = 21;
  var CHANGE_THRESHOLD = 5;

  var Bullet = function(args) {
    args = args || {};

    this._initDrawable(args);
    this._initAnimatable(args);
    this._initExplosive(args);

    this._width = args.width;
    this._height = args.height;

    this._team = args.team;
    this._direction = args.direction;
    this._canvas = args.canvas;
  }

  Bullet.UP = -1;
  Bullet.DOWN = 1;
  Bullet.WIDTH = BULLET_WIDTH;
  Bullet.HEIGHT = BULLET_HEIGHT;

  Bullet.prototype = {
    constructor: 'Bullet',

    init: function() {

      this._shouldChange = 0;

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
        this.canvas().context().drawImage(this.canvas().el, x, this.y());
      };

      method.call(this);
      this.render = method;
    },

    update: function() {

      if(!this.inBounds()) {
        this.explode();
      }

      if(this._shouldChange >= CHANGE_THRESHOLD) {
        this._updateAnimatable();
        this._shouldChange = 0;
      }

      this._shouldChange++;

      this.y(this.y() + (5 * this._direction));
      this.render();
    },

    inBounds: function() {
      return this.y() > - this.height() && this.y() < this._parentCanvas().height;
    },

    direction: function() {
      return this._direction;
    },

    die: function() {
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
  Animatable.call(Bullet.prototype);
  Explosive.call(Bullet.prototype, 'bullet');

  return Bullet;

});

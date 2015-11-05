define(['canvas', 'keyboard', 'bullet', 'mixins/drawable'],
  function(Canvas, Keyboard, Bullet, Drawable) {

  'use strict';

  var PLAYER_WIDTH = 60;
  var PLAYER_HEIGHT = 60;
  var PLAYER_SPEED = 5;
  var PLAYER_COOL_DOWN = 750;
  var LIVES = 3;

  /**
   * @class Player
   */
  var Player = function(args) {
    args = args || {};

    this.x(args.x);
    this.y(args.y);

    this._width = PLAYER_WIDTH;
    this._height = PLAYER_HEIGHT;

    this._context = args.context;

    this._lives = LIVES;
    this._ready = true;
    this._bullets = args.bullets;
  };

  Player.WIDTH = PLAYER_WIDTH;
  Player.HEIGHT = PLAYER_HEIGHT;

  /** @lends Player */
  Player.prototype = {
    constructor: 'Player',

    init: function() {

      this._preRender();
      this._render(this.canvas().context());

      Keyboard.subscribe('LEFT', this.goLeft, this);
      Keyboard.subscribe('RIGHT', this.goRight, this);
      Keyboard.subscribe('SPACE', this.shoot, this);

      return this;
    },

    speed: function() {
      return PLAYER_SPEED;
    },

    inBounds: function() {
      var x = this.x();
      var y = this.y();
      var canvas = this.parentCanvas();

      return x >= 0 &&
        y >= 0  &&
        x + this.width() < canvas.width &&
        y + this.height() < canvas.height
    },

    goLeft: function() {
      if(this.x() - this.speed() >= 0) {
        this.x(this.x() - this.speed());
        this.update();
      }
    },

    goRight: function() {
      if(this.x() + this.width() + this.speed() <= this._parentCanvas().width) {
        this.x(this.x() + this.speed());
        this.update();
      }
    },

    shoot: function() {
      if(this._ready){
        var bullet = new Bullet({
          x: this.x() + this.width() / 2 - 2,
          y: this.y(),
          context: this.context(),
          direction: Bullet.UP
        }).init();

        this._bullets.push(bullet);

        this._ready = false;

        var self = this;

        window.setTimeout(function() {
          self._ready = true;
        }, PLAYER_COOL_DOWN);
      }
    },

    update: function() {
      this._clearCanvas();
      this._render(this.canvas().context());
    },

    _preRender: function() {
      this.preRenderCanvas = new Canvas({
        width: this.width(),
        height: this.height()
      }).init();

      var context = this.preRenderCanvas.context();
      context.fillStyle = 'blue';
      context.fillRect(0, 0, this.width(), this.height());
    },

    _render: function(context) {
      context.drawImage(this.preRenderCanvas.el, this.x(), this.y());
    }
  };

  Drawable.call(Player.prototype);

  return Player;

});

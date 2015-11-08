define(['canvas', 'keyboard', 'mixins/drawable', 'mixins/shooter'],
  function(Canvas, Keyboard, Drawable, Shooter) {

  'use strict';

  // TODO: Player should implimanr manager interface

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

    this._initDrawable(args);
    this._initShooter(args);

    this._width = PLAYER_WIDTH;
    this._height = PLAYER_HEIGHT;

    this._lives = LIVES;
    this._bullets = args.bullets;
  };

  Player.WIDTH = PLAYER_WIDTH;
  Player.HEIGHT = PLAYER_HEIGHT;

  /** @lends Player */
  Player.prototype = {
    constructor: 'Player',

    init: function() {

      this._active = true;

      this._preRender();
      this._render(this.canvas().context());

      Keyboard.subscribe('LEFT', this.goLeft, this);
      Keyboard.subscribe('RIGHT', this.goRight, this);
      Keyboard.subscribe('SPACE', this.shoot, this);

      console.log('Player has ' + this._lives + ' lives');

      return this;
    },

    speed: function() {
      return PLAYER_SPEED;
    },

    shot: function() {
      if(--this._lives) {
        this._active = false;
      }

      console.log('Player has ' + this._lives + ' lives');
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
  Shooter.call(Player.prototype, 1, PLAYER_COOL_DOWN, 'UP');

  return Player;

});

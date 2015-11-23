define(['canvas', 'keyboard', 'mixins/drawable', 'mixins/shooter', 'mixins/audible'],
  function(Canvas, Keyboard, Drawable, Shooter, Audible) {

  'use strict';

  // TODO: Player should implimanr manager interface

  var PLAYER_WIDTH = 60;
  var PLAYER_HEIGHT = 60;
  var PLAYER_SPEED = 5;
  var PLAYER_COOL_DOWN = 750;
  var LIVES = 3;

  var score = 0;

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

    this._onNoLives = args.onNoLives;
  };

  Player.WIDTH = PLAYER_WIDTH;
  Player.HEIGHT = PLAYER_HEIGHT;

  /** @lends Player */
  Player.prototype = {
    constructor: 'Player',

    init: function() {

      this._active = true;

      this._preRender();

      Keyboard.subscribe('LEFT', this.goLeft, this);
      Keyboard.subscribe('RIGHT', this.goRight, this);
      Keyboard.subscribe('SPACE', this.shoot, this);

      return this;
    },

    speed: function() {
      return PLAYER_SPEED;
    },

    addPoints: function(points) {
      // could do some error checking here...
      score += points;
    },

    score: function() {
      return score;
    },

    shot: function() {
      if(!--this._lives) {
        this._active = false;
        this._onNoLives();
      }
    },

    _onShoot: function() {
      this._playAudio('erm');
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
      }
    },

    goRight: function() {
      if(this.x() + this.width() + this.speed() <= this._parentCanvas().width) {
        this.x(this.x() + this.speed());
      }
    },

    update: function() {
    },

    _preRender: function() {

      var context = this.canvas().context();
      context.fillStyle = 'blue';
      context.fillRect(0, 0, this.width(), this.height());
    },

    lives: function() {
      return this._lives;
    }
  };

  Drawable.call(Player.prototype);
  Shooter.call(Player.prototype, 1, PLAYER_COOL_DOWN, 'UP');
  Audible.call(Player.prototype);

  return Player;

});

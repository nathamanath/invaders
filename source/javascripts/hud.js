define(['mixins/drawable'],
  function(Drawable) {

  'use strict';

  var HUD_HEIGHT = 50;
  var LIFE_WIDTH = 20;
  var LIFE_PADDING = 10;

  /**
   * Present player lives and score
   * @class HUD
   */
  var HUD = function(args) {
    this._initDrawable(args);

    this._lives = this._initialLives = args.lives;
    this._score = 0;

    this._width = args.gameWidth;
    this._height = HUD_HEIGHT;
  };

  /** @lends HUD */
  HUD.prototype = {
    constructor: 'HUD',

    init: function() {
      this._preRender();

      return this;
    },

    _preRender: function() {
      var context = this._canvasContext();

      this._drawLives(context);
      this._drawScore(context);
    },

    _livesX: function() {
      return this._width - ((this._initialLives - i) * (LIFE_WIDTH + LIFE_PADDING));
    },

    _drawLives: function(context) {
      for(var i = 0, l = this._lives; i < l; i++) {
        context.fillStyle = 'blue';
        context.fillRect(this._width - ((this._initialLives - i) * (LIFE_WIDTH + LIFE_PADDING)), LIFE_WIDTH, LIFE_WIDTH, LIFE_WIDTH);
      }
    },

    _clearLives: function() {
      this.canvas().clear(this._width - (this._initialLives * (LIFE_WIDTH + LIFE_PADDING)), LIFE_WIDTH, this._initialLives * (LIFE_WIDTH + LIFE_PADDING));
    },

    _drawScore: function(context) {
      context.fillStyle = "blue";
      context.fillText(this._score, LIFE_PADDING, LIFE_PADDING);
    },

    _clearScore: function() {
      // TODO: Calculate score width
      this.canvas().clear(0, 0, 300, HUD_HEIGHT);
    },

    update: function(lives, score) {
      var context = this._canvasContext();

      if(lives !== this._lives) {
        this._lives = lives;

        this._clearLives()
        this._drawLives(context);
      }

      if(score !== this._score) {
        this._score = score;

        this._clearScore()
        this._drawScore(context);
      }
    }
  };

  Drawable.call(HUD.prototype);

  return HUD;

});

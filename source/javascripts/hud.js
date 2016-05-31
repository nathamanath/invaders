define(['mixins/drawable', 'models/life', 'models/counter'],
  function(Drawable, Life, Counter) {

  'use strict';

  var HUD_HEIGHT = 50;
  var LIFE_PADDING = 10;
  var LEVEL_PADDING = 10;
  var LEVEL_WIDTH = 100;

  /**
   * Present player lives and score
   * @class HUD
   */
  var HUD = function(args) {
    this._initDrawable(args);

    this._lives = this._initialLives = args.lives;
    this._score = 0;
    this._level = args.level;

    this._width = args.gameWidth;
    this._height = HUD_HEIGHT;
  };

  /** @lends HUD */
  HUD.prototype = {
    constructor: 'HUD',

    init: function() {
      this._lifeInstance = new Life().init();
      this._levelCounter = new Counter({ count: this._level }).init();
      this._scoreCounter = new Counter({ count: this._score }).init();

      this._preRender();

      return this;
    },

    _preRender: function() {
      var context = this._canvasContext();

      this._drawLives(context);
      this._drawLevel(context);
      this._drawScore(context);
    },

    _livesX: function() {
      return this._width - ((this._initialLives - i) * (this._lifeInstance.width() + LIFE_PADDING));
    },


    // TODO use lives manager for this
    _drawLives: function(context) {
      var lifeWidth = this._lifeInstance.width();
      var lifeHeight = this._lifeInstance.height();

      for(var i = 0, l = this._lives; i < l; i++) {
        var image = this._lifeInstance.canvas().el;

        context.drawImage(image, this._width - ((this._initialLives - i) * (lifeWidth + LIFE_PADDING)), lifeWidth, lifeWidth, lifeHeight);
      }
    },

    _drawLevel: function(context) {
      context.drawImage(this._levelCounter.canvas().el, this._width / 2, LIFE_PADDING);
    },

    _drawScore: function(context) {
      context.drawImage(this._scoreCounter.canvas().el, LIFE_PADDING, LIFE_PADDING);
    },


    update: function(lives, score, level) {

      // only update if something has changed

      if(this._score !== score || this._lives !== lives || this._level !== level) {

        this._lives = lives;
        this._score = score;
        this._level = level;

        this._clearCanvas();

        var context = this._canvasContext();

        this._levelCounter.update(level);
        this._scoreCounter.update(score);

        this._drawLevel(context);
        this._drawScore(context);
        this._drawLives(context);
      }
    }
  };

  Drawable.call(HUD.prototype);

  return HUD;

});

define(['canvas', 'models/player', 'clock', 'managers/baddys-manager', 'managers/bullets-manager', 'managers/explosions-manager', 'managers/houses-manager', 'collisions'],
  function(Canvas, Player, Clock, BaddysManager, BulletsManager, ExplosionsManager, HousesManager, Collisions) {

  'use strict';

  // TODO: Game should mediate between game objects... reduce coupling

  var MAX_FPS = 60;

  /**
   * Represents a game
   *
   * @class Game
   * @param args.el - dom element to render game into
   * @param [args.fps=60] - fps of game, limited to 60
   */
  var Game = function(args) {
    this.el = args.el;
    this.fps = args.fps || Game.MAX_FPS;
  };

  Game.WIDTH = 800;
  Game.HEIGHT = 800;

  // As game will never run at over MAX_FPSfps
  Game.CLOCK_SPEED = 1000 / MAX_FPS;

  /** @lends Game */
  Game.prototype = {
    constructor: 'Game',

    init: function() {
      this.fps = Math.min(this.fps, Game.MAX_FPS);

      this.canvas = new Canvas({
        width: Game.WIDTH,
        height: Game.HEIGHT
      }).init();

      this.canvas.render(this.el);

      this.context = this.canvas.context();
      this.clock = new Clock(Game.CLOCK_SPEED).start();


      this.player = new Player({
        context: this.context,
        x: this.canvas.width / 2 + Player.WIDTH / 2,
        y: this.canvas.height - Player.HEIGHT,
        bullets: this.bullets
      }).init();

      ExplosionsManager.init(this.context);
      BulletsManager.init(this.context);
      BaddysManager.init(this.context, Game.WIDTH, Game.HEIGHT, this.end);
      HousesManager.init(this.context);

      return this;
    },

    start: function() {
      this._state = 'PLAYING';
      this._updateLoop();
      this._animationLoop();
    },

    end: function() {
      alert('game over');

      this.clock.stop();
      this._state = 'PAUSED';
      BaddysManager.stop();
    },

    /** update all game objects */
    _update: function() {

      var self = this;

      var explosions = ExplosionsManager.explosions();
      var player = self.player;

      Collisions.check(self.player);

      explosions.forEach(function(explosion) {
        if(!explosion.active()) {
          var index = explosions.indexOf(explosion);
          explosion.update();
          explosions.splice(index, 1);
        }
      });

    },

    /** draw a frame to this.canvas */
    _draw: function() {
      this.canvas.clear();

      BulletsManager.draw();
      BaddysManager.draw();
      HousesManager.draw();
      this.player.draw();
      ExplosionsManager.draw();
    },

    /** game logic should happen at same speed whatever the fps */
    _updateLoop: function() {
      this.clock.subscribe(this._update, this);
    },

    /** makes canvas animation happen at your choice of fps */
    _animationLoop: function() {
      var self = this;

      if(this._state === 'PLAYING') {
        window.requestAnimationFrame(function() {
          self._draw();
          self._animationLoop();
        });
      }
    }
  };



  return Game;

});

define(['canvas', 'models/player', 'clock', 'managers/baddys-manager', 'managers/bullets-manager', 'managers/explosions-manager', 'managers/houses-manager', 'collisions', 'hud', 'audio-player', 'managers/ufos-manager'],
  function(Canvas, Player, Clock, BaddysManager, BulletsManager, ExplosionsManager, HousesManager, Collisions, HUD, AudioPlayer, UFOsManager) {

  'use strict';

  var MAX_FPS = 60;
  var level = 1;

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
  Game.HEIGHT = 900;

  // As game will never run at over MAX_FPSfps
  Game.CLOCK_SPEED = 1000 / MAX_FPS;

  /** @lends Game */
  Game.prototype = {
    constructor: 'Game',

    init: function() {

      var self = this;

      this.fps = Math.min(this.fps, Game.MAX_FPS);

      this.canvas = new Canvas({
        width: Game.WIDTH,
        height: Game.HEIGHT
      }).init();

      this.canvas.render(this.el);

      this.context = this.canvas.context();
      this.clock = new Clock(Game.CLOCK_SPEED);


      this.player = new Player({
        context: this.context,
        x: this.canvas.width / 2 + Player.WIDTH / 2,
        y: this.canvas.height - Player.HEIGHT,
        onNoLives: function() { self.end(); }
      }).init();

      this.hud = new HUD({
        context: this.context,
        x: 0,
        y: 0,
        lives: this.player.lives(),
        score: this.player.score(),
        gameWidth: this.canvas.width,
        level: level
      }).init();

      ExplosionsManager.init(this.context);
      BulletsManager.init(this.context);
      BaddysManager.init(
        this.context,
        Game.WIDTH,
        Game.HEIGHT,
        function() { self.end(); },
        function() { self.nextLevel(); }
      );

      HousesManager.init(this.context);
      UFOsManager.init(this.context);

      BaddysManager.clock().subscribe(Collisions.baddysHouses, Collisions);

      return this;
    },

    mute: function() {
      return AudioPlayer.mute();
    },

    volume: function(value) {
      return AudioPlayer.volume(value);
    },

    start: function() {
      this._state = 'PLAYING';
      this.clock.start();
      this._updateLoop();
      this._animationLoop();
    },

    nextLevel: function() {
      BaddysManager.reinit(++level);
      BulletsManager.clear();
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

      var player = self.player;

      Collisions.check(self.player);

      this.hud.update(this.player.lives(), player.score(), level);

      UFOsManager.update();
    },

    /** draw a frame to this.canvas */
    _draw: function() {
      this.canvas.clear();

      // this.drawables.draw();

      BulletsManager.draw();
      BaddysManager.draw();
      HousesManager.draw();
      this.player.draw();
      this.hud.draw();
      ExplosionsManager.draw();
      UFOsManager.draw();
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

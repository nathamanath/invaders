define(['canvas', 'models/player', 'clock', 'models/house', 'rectangle', 'baddy-manager', 'models/explosion', 'bullet-manager'],
  function(Canvas, Player, Clock, House, Rectangle, BaddyManager, Explosion, BulletManager) {

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

      this.bullets = [];
      this.houses = [];
      this.baddys = [];
      this.explosions = [];

      this.player = new Player({
        context: this.context,
        x: this.canvas.width / 2 + Player.WIDTH / 2,
        y: this.canvas.height - Player.HEIGHT,
        bullets: this.bullets
      }).init();

      BulletManager.init(this.context);
      BaddyManager.init(this.context, Game.WIDTH, Game.HEIGHT, this.end, this.bullets);

      // TODO: Bullet manager
      // TODO: House manager
      // TODO: Explosion manager

      for(var i = 0; i < 4; i++) {
        var house = new House({
          context: this.context,
          x: 80 + 180 * i,
          y: 600
        }).init();

        this.houses.push(house);
      }

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
      BaddyManager.stop();
    },

    /** update all game objects */
    _update: function() {

      var self = this;

      var bullets = BulletManager.bullets();
      var houses = self.houses;
      var baddys = BaddyManager.baddys();
      var explosions = self.explosions;
      var player = self.player;

      var playerBullets = bullets.filter(function(bullet) {
        return bullet.team() === player.team();
      });

      var baddyBullets = bullets.filter(function(bullet) {
        return bullet.team() === BaddyManager.TEAM;
      });

      playerBullets.forEach(function(bullet) {
        //check collision with baddys

        baddys.forEach(function(baddy) {
          if(self._colliding(bullet, baddy)) {
            baddy.shot();
            bullet.explode();

            self.explosions.push(new Explosion({
              x: baddy.x(),
              y: baddy.y(),
              context: self.context
            }).init());

          }

          if(!baddy.active()) {
            var index = baddys.indexOf(baddy);
            baddy.update();
            baddys.splice(index, 1);

          }
        });
      });

      baddyBullets.forEach(function(bullet) {
        if(self._colliding(bullet, player)) {
          player.shot();
          bullet.explode();

          self.explosions.push(new Explosion({
            x: player.x(),
            y: player.y(),
            context: self.context
          }).init());
        }
      });

      bullets.forEach(function(bullet) {

        // check all bullets against houses
        houses.forEach(function(house) {
          if(self._colliding(bullet, house)){
            var rect = new Rectangle(bullet.x(), bullet.y(), bullet.width(), bullet.height()).init();
            var hit = house.bitmap.hitTest(rect, 'RGBA(255,0,0,255)');

            if(hit) {
              house.shot(bullet.x() + (bullet.width() / 2), bullet.y());
              bullet.explode();
            }
          }

        });



        if(!bullet.active()) {
          var index = bullets.indexOf(bullet);
          bullets.splice(index, 1);
        }

        bullet.update();
      });

      explosions.forEach(function(explosion) {
        if(!explosion.active()) {
          var index = explosions.indexOf(explosion);
          explosion.update();
          explosions.splice(index, 1);
        }
      });

      // TODO: Baddy collides with house
      // TODO: Baddy collides with player
    },

    /** draw a frame to this.canvas */
    _draw: function() {
      this.canvas.clear();

      BulletManager.draw();

      this.explosions.forEach(function(explosion) {
        explosion.draw();
      });

      this.houses.forEach(function(house) {
        house.draw();
      });

      BaddyManager.draw();

      this.player.draw();
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
    },

    /**
     * are 2 drawables colliding
     */
    _colliding: function(a, b) {
      return a.x() < b.x() + b.width() &&
        a.x() + a.width() > b.x() &&
        a.y() < b.y() + b.height() &&
        a.y() + a.height() > b.y()
    }
  };

  return Game;

});

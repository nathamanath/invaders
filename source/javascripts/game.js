define(['canvas', 'models/player', 'clock', 'rectangle', 'managers/baddys-manager', 'managers/bullets-manager', 'managers/explosions-manager', 'managers/houses-manager'],
  function(Canvas, Player, Clock, Rectangle, BaddysManager, BulletsManager, ExplosionsManager, HousesManager) {

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
      BaddysManager.init(this.context, Game.WIDTH, Game.HEIGHT, this.end, this.bullets);
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

      var bullets = BulletsManager.bullets();
      var houses = HousesManager.houses();
      var baddys = BaddysManager.baddys();
      var explosions = ExplosionsManager.explosions();
      var player = self.player;

      var playerBullets = BulletsManager.teamBullets(player.team());
      var baddyBullets = BulletsManager.teamBullets(BaddysManager.TEAM);

      // OPTIMIZE: So many things can be cached for collision detection.

      playerBullets.forEach(function(bullet) {
        //check collision with baddys
        baddys.forEach(function(baddy) {
          if(self._colliding(bullet, baddy)) {
            baddy.shot();
            bullet.explode();

            ExplosionsManager.new(baddy);
          }

          if(!baddy.active()) {
            var index = baddys.indexOf(baddy);
            baddy.update();
            baddys.splice(index, 1);
          }
        });

        baddyBullets.forEach(function(baddyBullet) {
          if(self._colliding(bullet, baddyBullet)) {
            baddyBullet.explode();
            bullet.explode();

            ExplosionsManager.new(bullet);
          }
        });
      });

      baddyBullets.forEach(function(bullet) {
        if(self._colliding(bullet, player)) {
          player.shot();
          bullet.explode();

          ExplosionsManager.new(player);
        }
      });

      bullets.forEach(function(bullet) {



        // check all bullets against houses
        houses.forEach(function(house) {
          // Only use complex shape collision check if rectangles chack passes
          if(self._colliding(bullet, house)){

            var hit = false;
            var data = house.imageData().data

            var bulletPointyEndY = bullet.pointyEndY();

            var y = (bulletPointyEndY - house.y()) * house.width();
            var houseX = house.x()

            var bulletX = bullet.x();
            var bulletWidth = bullet.width();

            for(var x = bulletX, maxX = x + bulletWidth; x < maxX; x++) {
              if(data[((y + (x - houseX)) * 4) + 3]) {
                hit = true;
                break;
              }
            }

            if(hit) {
              house.shot(bulletX + (bulletWidth / 2), bulletPointyEndY);
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

      // TODO: Baddy collides with house. After complex collision optimization

      //Baddy collides with player
      var lowBaddys = baddys.filter(function(baddy) {
        return baddy.y() + baddy.height() >= player.y();
      });

      lowBaddys.forEach(function(baddy) {
        if(self._colliding(baddy, player)) {
          baddy.shot();
          player.shot();

          ExplosionsManager.new(player);
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
    },

    /**
     * are 2 drawables colliding
     */
    _colliding: function(a, b) {
      var ax = a.x();
      var bx = b.x();
      var ay = a.y();
      var by = b.y();

      return ax < bx + b.width() &&
        ax + a.width() > bx &&
        ay < by + b.height() &&
        ay + a.height() > by;
    }
  };



  return Game;

});

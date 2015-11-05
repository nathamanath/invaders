define(['canvas', 'player', 'clock', 'house', 'rectangle', 'baddyManager'],
  function(Canvas, Player, Clock, House, Rectangle, BaddyManager) {

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

  Game.MAX_FPS = 60;
  Game.WIDTH = 800
  Game.HEIGHT = 800

  // As game will never run at over MAX_FPSfps
  Game.CLOCK_SPEED = 1000 / Game.MAX_FPS;

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

      this.bullets = [];
      this.houses = [];
      this.baddys = [];

      this.player = new Player({
        context: this.context,
        x: this.canvas.width / 2 + Player.WIDTH / 2,
        y: this.canvas.height - Player.HEIGHT,
        bullets: this.bullets
      }).init();



      BaddyManager.init(this.context);


      for(var i = 0; i < 4; i++) {
        var house = new House({
          context: this.context,
          x: 80 + 180 * i,
          y: 500
        }).init();

        this.houses.push(house);
      }

      return this;
    },

    start: function() {
      this._updateLoop();
      this._animationLoop();
    },

    /** update all game objects */
    _update: function() {

      var self = this;

      var bullets = self.bullets;
      var houses = self.houses;
      var baddys = BaddyManager.baddys();

      // OPTIMIZE: Bullet manager object

      bullets.forEach(function(bullet) {
        bullet.update();

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

        baddys.forEach(function(baddy) {
          if(self._colliding(bullet, baddy)) {
            baddy.shot();
            bullet.explode();
          }
        });

        if(!bullet.active()) {
          var index = bullets.indexOf(bullet);
          bullets.splice(index, 1);
        }
      });

      BaddyManager.update();
    },

    /** draw a frame to this.canvas */
    _draw: function() {
      this.canvas.clear();

      this.bullets.forEach(function(bullet) {
        bullet.draw();
      });

      this.houses.forEach(function(house) {
        house.draw();
      });

      BaddyManager.draw();

      this.player.draw();
    },

    /** game logic should happen at same speed whatever the fps */
    _updateLoop: function() {
      var self = this;

      var clock = new Clock(Game.CLOCK_SPEED).start();

      clock.subscribe(this._update, this);
    },

    /** makes canvas animation happen at your choice of fps */
    _animationLoop: function() {
      var self = this;

      window.requestAnimationFrame(function() {
        self._draw();
        self._animationLoop();
      });
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

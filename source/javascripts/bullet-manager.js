define(['models/bullet'],
  function(Bullet) {

  'use strict';

  /** Manages all bullets in game */

  var bullets = [];

  return {
    /** @param context - context to draw bullets onto */
    init: function(context) {
      this._context = context;
    },

    bullets: function() {
      return bullets;
    },

    UP: Bullet.UP,
    DOWN: Bullet.DOWN,
    BULLET_WIDTH: Bullet.WIDTH,
    BULLET_HEIGHT: Bullet.HEIGHT,

    /**
     * Spawn a new bullet
     * @param shooter - Object implimenting shooter and drawable
     */
    fire: function(shooter) {
      bullets.push(new Bullet({
        x: shooter.gunX(),
        y: shooter.gunY(),
        context: this._context,
        direction: shooter.gunDirection(),
        team: shooter.team()
      }).init());
    },

    teamBullets: function(team) {
      return bullets.filter(function(bullet) {
        return bullet.team() === team;
      });
    },

    /** draw all bullets */
    draw: function() {
      bullets.forEach(function(bullet) {
        bullet.draw();
      });
    }
  }
});

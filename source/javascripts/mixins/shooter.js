define(['managers/bullets-manager'],
  function(BulletsManager) {

  'use strict';

  //TODO: How to enforce Drawable on this?

  /**
   * Shooter mixin
   *
   * Behaviour required for a drawable to fire bullets.
   * In this game a shooter can fire in 1 fixed direction.
   */

  return function(team, coolDown, direction) {
    this._initShooter = function(args) {
      this._ready = true;
      this._team = team;
    };

    /** for collision detection... no friendly fire */
    this.team = function() {
      return this._team;
    };

    /** bullets move in this direction */
    this.gunDirection = function() {
      return BulletsManager[direction];
    };

    /** x coordinate for new bullets */
    this.gunX = function() {
      return this.x() + (this.width() / 2) - (BulletsManager.BULLET_WIDTH / 2);
    };

    /** y coordinate for new bullets */
    this.gunY = function() {
      var y = this.y();

      if(this.gunDirection() === BulletsManager.DOWN) {
        y += this.height();
      }

      return y;
    },

    this.shoot = function() {

      var self = this;

      if(self._ready) {
        self._ready = false;

        BulletsManager.fire(self);

        window.setTimeout(function() {
          self._ready = true;
        }, coolDown);
      }
    }

  };
});

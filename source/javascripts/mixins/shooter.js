define(['managers/bullets-manager', 'models/bullet', 'asset-bank'],
  function(BulletsManager, Bullet, AssetBank) {

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
      return Bullet[direction];
    };

    /** x coordinate for new bullets */
    this.gunX = function() {
      return this.x() + (this.width() / 2) - (Bullet.WIDTH / 2);
    };

    /** y coordinate for new bullets */
    this.gunY = function() {
      var y = this.y();

      if(this.gunDirection() === Bullet.DOWN) {
        y += this.height();
      }

      return y;
    },

    this.bulletType = function() {
      // TODO: Set type
      return 'square';
    };

    this.shoot = function() {

      var self = this;

      if(self._ready) {
        self._ready = false;

        // Test audio
        // if(this._team === 1) {
        //   AssetBank.getAudio('erm').play();
        // }

        if(this._onShoot) {
          this._onShoot();
        }


        BulletsManager.add(self);

        window.setTimeout(function() {
          self._ready = true;
        }, coolDown);
      }
    }

  };
});

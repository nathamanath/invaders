define(['managers/baddys-manager', 'managers/bullets-manager', 'managers/explosions-manager', 'managers/houses-manager', 'models/rectangle'],
  function(BaddysManager, BulletsManager, ExplosionsManager, HousesManager, Rectangle) {

  'use strict';

  /**
   * Mediates collisions
   * @class Collisions
   */
  return {
    baddysHouses: function() {
      var self = this;

      var baddys = BaddysManager.baddys();
      var houses = HousesManager.houses();

      // Baddy collides with house
      // Filter out only baddys in houses y range
      var lowishBaddys = baddys.filter(function(baddy) {
        var bottomY = baddy.y() + BaddysManager.BADDY_HEIGHT;
        var houseY = HousesManager.HOUSE_Y;

        return bottomY >= houseY && bottomY <= houseY + HousesManager.HOUSE_HEIGHT;
      });


      lowishBaddys.forEach(function(baddy) {
        var baddyBottomY = baddy.y() + baddy.height();

        houses.forEach(function(house) {

          // baddy is in houses personal space
          if(self._colliding(baddy, house)) {

            // work out overlapping rectangle
            var x = Math.max(0, baddy.x(), house.x());
            var y = Math.max(0, baddy.y(), house.y());
            var w = Math.max(0, Math.min(baddy.x() + baddy.width() - x, house.x() + house.width() - x));
            var h = Math.max(0, Math.min(baddy.y() + baddy.height() - y, house.y() + house.height() - y));

            // cut it out of house image data
            house.overlapped(x, y, w, h);
          };

        });
      });
    },

    check: function(player) {
      var self = this;

      var bullets = BulletsManager.bullets();
      var houses = HousesManager.houses();
      var baddys = BaddysManager.baddys();
      var explosions = ExplosionsManager.explosions();

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

      bullets.forEach(function(bullet) {
        var bulletPointyEndY = bullet.pointyEndY();

        var houseTopY = HousesManager.HOUSE_Y;
        var houseBottomY = houseTopY + HousesManager.HOUSE_HEIGHT;

        var bulletX
        var houseX;
        var bulletWidth;
        var y;
        var hit;
        var data;

        // check all bullets against houses
        houses.forEach(function(house) {

          // Only use complex shape collision check if rectangles check passes && bullet is in house y range
          if(bulletPointyEndY >= houseTopY && bulletPointyEndY <= houseBottomY && self._colliding(bullet, house)){

            hit = false;
            data = house.imageData().data

            y = (bulletPointyEndY - house.y()) * house.width();
            houseX = house.x()

            bulletX = bullet.x();
            bulletWidth = bullet.width();

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

      baddyBullets.forEach(function(bullet) {
        if(self._colliding(bullet, player)) {
          player.shot();
          bullet.explode();

          ExplosionsManager.new(player);
        }
      });

      // Baddy collides with player
      var lowBaddys = baddys.filter(function(baddy) {
        return baddy.y() + BaddysManager.HEIGHT >= player.y();
      });

      lowBaddys.forEach(function(baddy) {
        if(self._colliding(baddy, player)) {
          baddy.shot();
          player.shot();

          ExplosionsManager.new(player);
        }
      });
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
});

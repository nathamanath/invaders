define(['managers/baddys-manager', 'managers/bullets-manager', 'managers/explosions-manager', 'managers/houses-manager', 'managers/ufos-manager'],
  function(BaddysManager, BulletsManager, ExplosionsManager, HousesManager, UFOsManager) {

  'use strict';

  /**
   * Mediates collisions
   * @class Collisions
   */
  return {
    baddysHouses: function() {
      var self = this;

      var baddys = BaddysManager.all();
      var houses = HousesManager.all();

      // Baddy collides with house
      // Filter out only baddys in houses y range
      var lowishBaddys = baddys.filter(function(baddy) {
        var topY = baddy.y();
        var bottomY = topY + BaddysManager.BADDY_HEIGHT;
        var houseY = HousesManager.HOUSE_Y;

        return bottomY >= houseY && topY <= houseY + HousesManager.HOUSE_HEIGHT;
      });


      lowishBaddys.forEach(function(baddy) {

        houses.forEach(function(house) {

          // baddy is in houses personal space
          if(self._colliding(baddy, house)) {

            // work out overlapping rectangle
            var x = Math.max(0, baddy.x(), house.x());
            var y = Math.max(baddy.y(), house.y());
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

      var bullets = BulletsManager.all();
      var houses = HousesManager.all();
      var baddys = BaddysManager.all();
      var explosions = ExplosionsManager.all();

      var playerBullets = BulletsManager.teamBullets(player.team());
      var baddyBullets = BulletsManager.teamBullets(BaddysManager.TEAM);

      // OPTIMIZE: So many things can be cached for collision detection.

      // bullet collides with baddy
      playerBullets.forEach(function(bullet) {
        //check collision with baddys
        baddys.forEach(function(baddy) {
          if(self._colliding(bullet, baddy)) {
            player.addPoints(baddy.points());
            baddy.shot();
            bullet.explode();

            ExplosionsManager.add(baddy);
          }

          if(!baddy.active()) {
            BaddysManager.remove(baddy);
          }
        });


        UFOsManager.all().forEach(function(ufo) {
          if(self._colliding(bullet, ufo)) {
            player.addPoints(ufo.points());
            ufo.shot();
            bullet.explode();

            ExplosionsManager.add(ufo);
          }
        });

        baddyBullets.forEach(function(baddyBullet) {
          if(self._colliding(bullet, baddyBullet)) {
            baddyBullet.explode();
            bullet.explode();

            ExplosionsManager.add(bullet);
          }
        });
      });

      // bullets collide with houses
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
          BulletsManager.remove(bullet);
          ExplosionsManager.add(bullet);
        }

        bullet.update();
      });

      // bullets collide with player
      baddyBullets.forEach(function(bullet) {
        if(self._colliding(bullet, player)) {
          player.shot();
          bullet.explode();

          ExplosionsManager.add(player);

          bullet.update();

          BulletsManager.remove(bullet);
        }
      });

      // Baddy collides with player
      var lowBaddys = baddys.filter(function(baddy) {
        return baddy.y() + BaddysManager.BADDY_HEIGHT >= player.y();
      });

      lowBaddys.forEach(function(baddy) {
        if(self._colliding(baddy, player)) {
          baddy.shot();
          player.shot();

          ExplosionsManager.add(player);
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

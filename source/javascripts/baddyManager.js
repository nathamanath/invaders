define(['baddy', 'clock'],
  function(Baddy, Clock) {

  // TODO: Tidy baddy manager
  // TODO: Baddy manager call update per tick of clock.

  'use strict';

  var baddys = [];
  var direction = 1;

  var ACCELERATION = 1.2;
  var PADDING = 10;
  var RATE = 500;

  var baddyFactory = function(x, y, context, type) {
    return new Baddy({
      x: x,
      y: y,
      context: context,
      type: type
    }).init();
  };

  return {
    init: function(context, gameWidth, gameHeight, onOutOfBounds) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.context = context;
      this.onOutOfBounds = onOutOfBounds;

      var j = 1;
      var self = this;

      ['top', 'middle', 'middle', 'bottom', 'bottom'].forEach(function(type) {

        for(var i = 0; i < 11; i++) {
          self.add(PADDING + ((Baddy.WIDTH + PADDING) * i), PADDING + ((PADDING + Baddy.HEIGHT) * j), type);
        }

        j++;
      });

      this.clock = new Clock(RATE).start();

      var self = this;

      this.clock.subscribe(function() {
        self.update();

      });
    },

    stop: function() {
      this.clock.stop();
    },

    add: function(x, y, type) {
      baddys.push(baddyFactory(x, y, this.context, type));
    },

    draw: function() {
      baddys.forEach(function(baddy) {
        baddy.draw();
      });
    },

    baddys: function() {
      return baddys;
    },

    canMoveXDirection: function() {
      if(direction === 1) {
        var maxX = Math.max.apply(null, this.baddysXs()) + Baddy.WIDTH;

        return maxX + Baddy.SPEED < this.gameWidth;
      } else {
        var minX = Math.min.apply(null, this.baddysXs());

        return minX - Baddy.SPEED > 0;
      }
    },

    inBounds: function() {
      var maxY = baddys[baddys.length -1].y() + Baddy.HEIGHT;

      return maxY < this.gameHeight;
    },

    baddysXs: function() {
      return baddys.map(function(baddy) {
        return baddy.x();
      });
    },

    update: function(playerBullets) {

      baddys.forEach(function(baddy) {
        baddy.x(baddy.x() + 5 * direction);
        baddy.y(baddy.y());
      });

      if(!this.inBounds()) {
        this.onOutOfBounds();
      }

      if(!this.canMoveXDirection()) {
        direction = direction * -1;

        baddys.forEach(function(baddy) {
          baddy.y(baddy.y() + Baddy.HEIGHT / 2);
        });

        this.clock.rate = this.clock.rate / ACCELERATION;
      }

      baddys.forEach(function(baddy) {


        // Remove inactive
        if(!baddy.active()) {
          var index = baddys.indexOf(baddy);
          baddys.splice(index, 1);
        }

        baddy.update();
      });
    }

  };

});

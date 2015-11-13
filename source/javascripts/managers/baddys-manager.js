define(['factories/baddy-factory', 'clock', 'models/baddy'],
  function(BaddyFactory, Clock, Baddy) {

  // TODO: Tidy baddy manager
  // TODO: both factory and manager depend on baddy... make it only one

  'use strict';

  var baddys = [];
  var direction = 1;

  var ACCELERATION = 1.2;
  var PADDING = 10;
  var RATE = 500;
  var SHOOT_ODDS = 0.02

  return {
    BADDY_HEIGHT: Baddy.HEIGHT,
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

      this.clock.subscribe(function() {
        self.update();
      });
    },

    TEAM: Baddy.TEAM,

    stop: function() {
      this.clock.stop();
    },

    add: function(x, y, type) {
      baddys.push(BaddyFactory.new(type, x, y, this.context));
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

    update: function() {

      baddys.forEach(function(baddy) {
        if(Math.random() < SHOOT_ODDS) {
          baddy.shoot();
        }

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

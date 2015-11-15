define(['factories/baddy-factory', 'clock', 'models/baddy', 'mixins/manager'],
  function(BaddyFactory, Clock, Baddy, Manager) {

  // TODO: Tidy baddy manager

  'use strict';

  var baddys = [];
  var direction = 1;

  var ACCELERATION = 1.2;
  var PADDING = 10;
  var RATE = 500;
  var SHOOT_ODDS = 0.02

  /**
   * @class BaddysManager
   */
  var BaddysManager = function(args) {
  };

  /** @lends BaddysManager */
  BaddysManager.prototype = {
    constructor: 'BaddysManager',

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

      this._clock = new Clock(RATE).start();

      this._clock.subscribe(function() {
        self.update();
      });

      return this;
    },

    clock: function() {
      return this._clock;
    },

    _newManagable: function(x, y, type) {
      return BaddyFactory.new(type, x, y, this.context);
    },

    stop: function() {
      this._clock.stop();
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
      var baddys = this._managables;

      var maxY = baddys[baddys.length -1].y() + Baddy.HEIGHT;

      return maxY < this.gameHeight;
    },

    baddysXs: function() {
      return this._managables.map(function(baddy) {
        return baddy.x();
      });
    },

    update: function() {
      var baddys = this._managables;

      // TODO: Filter out bottom of each column. Only these baddys can shoot.

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


  Manager.call(BaddysManager.prototype, { TEAM: Baddy.TEAM, BADDY_HEIGHT: Baddy.HEIGHT });

  var instance = new BaddysManager();

  return instance;

});

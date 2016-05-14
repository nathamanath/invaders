define(['factories/baddy-factory', 'clock', 'models/baddy', 'mixins/manager'],
  function(BaddyFactory, Clock, Baddy, Manager) {

  // TODO: Tidy baddy manager

  'use strict';

  var direction = 1; // 1 || -1. 1 = go right

  var PADDING = 10; // gap around baddies
  var INITIAL_RATE = 500; // move this often at start
  var SHOOT_ODDS = 0.06; // odds that baddy will shoot on update

  /**
   * @class BaddysManager
   */
  var BaddysManager = function(args) {
    this._initManager(args);
  };

  /** @lends BaddysManager */
  BaddysManager.prototype = {
    constructor: 'BaddysManager',

    init: function(context, gameWidth, gameHeight, onOutOfBounds, onNoBaddys) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.context = context;
      this.onOutOfBounds = onOutOfBounds;
      this.onNoBaddys = onNoBaddys;

      this.spawnBaddys();

      this._clock = new Clock(INITIAL_RATE).start();

      var self = this;
      this._clock.subscribe(function() {
        self.update();
      });

      return this;
    },

    spawnBaddys: function() {
      var j = 1;
      var self = this;

      ['top', 'middle', 'middle', 'bottom', 'bottom'].forEach(function(type) {

        for(var i = 0; i < 11; i++) {
          self.add(PADDING + ((Baddy.WIDTH + PADDING) * i), PADDING + ((PADDING + Baddy.HEIGHT) * j), type);
        }

        j++;
      });
    },

    reinit: function(level) {
      var speed = INITIAL_RATE - (50 * level);

      this.speed(speed);

      this.spawnBaddys();
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

    speed: function(speed) {
      if(arguments.length) {
        this.clock().rate = speed;
      }

      return this.clock().rate;
    },

    _bottomBaddys: function() {
      var bottomBaddys = {};
      var baddys = this._managables;
      var baddy;

      for(var i = 0, l = baddys.length; i < l; i++) {
        baddy = baddys[i];

        bottomBaddys[baddy.x()] = baddy;
      }

      return Object.keys(bottomBaddys).map(function(key) {
        return bottomBaddys[key];
      });
    },

    update: function() {
      var baddys = this._managables;

      if(!baddys.length) {
        this.onNoBaddys();
      }

      // Only baddys at the bottom of their column can shoot
      this._bottomBaddys().forEach(function(baddy) {
        if(Math.random() < SHOOT_ODDS) {
          baddy.shoot();
        }
      });

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
      }

      baddys.forEach(function(baddy) {
        baddy.update();
      });

    },

    _afterRemove: function() {
      var remove = Math.pow((55 - this._managables.length) / 15, 2);
      this.clock().rate = this.clock().rate - remove;
    }
  };


  Manager.call(BaddysManager.prototype, { TEAM: Baddy.TEAM, BADDY_HEIGHT: Baddy.HEIGHT });

  var instance = new BaddysManager();

  return instance;

});

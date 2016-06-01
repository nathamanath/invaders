define(['factories/bullet-factory', 'mixins/manager'],
  function(BulletFactory, Manager) {

  'use strict';

  /**
   * Manages all bullets in game
   * @class BulletsManager
   */
  var BulletsManager = function(args) {
    this._initManager(args);
  };

  /** @lends BulletsManager */
  BulletsManager.prototype = {
    constructor: 'BulletsManager',

    init: function(context) {
      this._context = context;

      return this;
    },

    _newManagable: function(shooter) {
      return BulletFactory.new(shooter, this._context);
    },

    /**
     * @param team - team id
     * @returns bullets for team
     */
    teamBullets: function(team) {
      return this.all().filter(function(bullet) {
        return bullet.team() === team;
      });
    },

    clear: function() {
      this._managables = [];
    }
  };

  Manager.call(BulletsManager.prototype);

  // Maybe lazily create this? not much point
  var instance = new BulletsManager();

  return instance;

});

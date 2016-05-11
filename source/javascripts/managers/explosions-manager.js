define(['mixins/manager', 'factories/explosion-factory'],
  function(Manager, ExplosionFactory) {

  'use strict';

  /**
   * @class ExplosionsManager
   */
  var ExplosionsManager = function(args) {

  };

  /** @lends ExplosionsManager */
  ExplosionsManager.prototype = {
    constructor: 'ExplosionsManager',

    init: function(context) {
      this._context = context;
      return this;
    },

    _newManagable: function(explodable) {
      var self = this;

      return ExplosionFactory.new(
        explodable.explosionType(),
        explodable.x() + (explodable.width() / 2),
        explodable.y() + (explodable.height() / 2),
        this._context,
        function() { self.update(); }
      );
    },

    update: function() {
      var self = this;

      this._managables.forEach(function(managable) {
        if(!managable.active()) {
          self.remove(managable);
        }
      });
    }
  };

  Manager.call(ExplosionsManager.prototype);

  var instance = new ExplosionsManager();

  return instance;
});

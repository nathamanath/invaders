define(['models/explosion', 'mixins/manager'],
  function(Explosion, Manager) {

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

      return new Explosion({
        x: explodable.x(),
        y: explodable.y(),
        context: this._context,
        onUpdate: function() { self.update(); }
      }).init()
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

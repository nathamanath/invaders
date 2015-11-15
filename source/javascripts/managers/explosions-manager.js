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
      return new Explosion({
        x: explodable.x(),
        y: explodable.y(),
        context: this._context
      }).init()
    }
  };

  Manager.call(ExplosionsManager.prototype);

  var instance = new ExplosionsManager();

  return instance;
});

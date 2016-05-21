define(['mixins/manager', 'factories/ufo-factory'],
  function(Manager, UFOFactory) {

  'use strict';

  var UFO_Y = 10;
  var UFO_ODDS = 1;

  // TODO: managers could be obj literal composed with manager instance

  /**
   * @class UFOsManager
   */
  var UFOsManager = function(args) {
    this._initManager(args);
  };

  /** @lends UFOsManager */
  UFOsManager.prototype = {
    constructor: 'UFOsManager',

    init: function(context) {
      this._context = context;

      return this;
    },

    _newManagable: function() {
      return UFOFactory.new(this._context, UFO_Y);
    },

    update: function() {
      if(this._managables.length) {
        var managable = this._managables[0];

        managable.update();

        if(!managable.active()) {
          this.remove(managable);
        }
      } else {
        if(Math.random() <= UFO_ODDS) {
          this.add();
        }
      }
    }
  };

  Manager.call(UFOsManager.prototype);

  var instance = new UFOsManager();
  return instance;

});

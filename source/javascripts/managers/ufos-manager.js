define(['mixins/manager'],
  function(Manager) {

  'use strict';

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
      return UFOFactory.new(this._context);
    },
  };

  Manager.call(UFOsManager.prototype);

  var instance = new UFOsManager();
  return instance;

});

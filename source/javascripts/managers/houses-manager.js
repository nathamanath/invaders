define(['models/house', 'mixins/manager'],
  function(House, Manager) {

  'use strict';

  var HOUSE_Y = 650;

  /**
   * @class HousesManager
   */
  var HousesManager = function(args) {

  };

  /** @lends HousesManager */
  HousesManager.prototype = {
    constructor: 'HousesManager',

    init: function(context) {
      this._context = context;

      var x;

      for(var i = 0; i < 4; i++) {
        x = 80 + 180 * i;

        this.add(x, HOUSE_Y);
      }

      return this;
    },

    _newManagable: function(x, y) {
      return new House({
        context: this._context,
        x: x,
        y: y
      }).init()
    }
  };

  Manager.call(HousesManager.prototype, { HOUSE_HEIGHT: House.HEIGHT, HOUSE_Y: HOUSE_Y });

  var instance = new HousesManager();

  return instance;

});

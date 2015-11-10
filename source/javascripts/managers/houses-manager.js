define(['models/house'],
  function(House) {

  'use strict';

  var HOUSE_Y = 600;

  var houses = [];

  var HousesManager = {
    init: function(context) {
      this._context = context;

      for(var i = 0; i < 4; i++) {
        var house = new House({
          context: this._context,
          x: 80 + 180 * i,
          y: 600
        }).init();

        houses.push(house);
      }
    },

    HOUSE_Y: HOUSE_Y,
    HOUSE_HEIGHT: House.HOUSE_HEIGHT,

    houses: function() {
      return houses;
    },

    draw: function() {
      houses.forEach(function(house) {
        house.draw();
      });
    },

    update: function() {
      houses.forEach(function(house) {
        house.update();
      });
    }
  };

  return HousesManager;
});

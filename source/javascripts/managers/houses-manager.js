define(['models/house'],
  function(House) {

  'use strict';

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

define(['baddy'],
  function(Baddy) {

  'use strict';

  var baddys = [];

  baddys.push();

  var baddyFactory = function(x, y, context) {
    return new Baddy({
      x: y,
      y: x,
      context: context
    }).init();
  };

  return {
    init: function(context) {
      this.context = context;

      this.add(100, 100, context);
      debugger
    },

    add: function(x, y, context) {
      baddys.push(baddyFactory(x, y, context));
    },

    draw: function() {
      baddys.forEach(function(baddy) {
        baddy.draw();
      });
    },

    baddys: function() {
      return baddys;
    },

    update: function(playerBullets) {

      // TODO: check for collisions with player bullets here

      baddys.forEach(function(baddy) {

        // Remove inactive
        if(!baddy.active()) {
            var index = baddys.indexOf(baddy);
            baddys.splice(index, 1);
          }
      });
    }

  };

});

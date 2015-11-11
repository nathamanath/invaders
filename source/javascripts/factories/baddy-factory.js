define(['models/baddy'],
  function(Baddy) {

  'use strict';

  var baddys = {};

  return {
    get: function(type, context) {

      var baddy = baddys[type];

      if(!baddy) {
        baddy = baddys[type] = new Baddy({
          type: type,
          // placeholders for now
          x: 0,
          y: 0,
          context: context
        }).init();
      }

      return baddy;
    }
  };

});

define(['models/baddy'],
  function(Baddy) {

  'use strict';

  var baddys = {};

  return {
    get: function(type) {

      var baddy = baddys[type];

      if(!baddy) {
        baddy = baddys[type] = new Baddy({ type: type }).init();
      }

      return baddy;
    }
  };

});

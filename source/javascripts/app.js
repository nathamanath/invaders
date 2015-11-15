define(['game'], function(Game) {
  'use strict';

  return {
    init: function() {
      var el = document.getElementById('game');

      var game = new Game({
        el: el
      }).init();
    }
  };
});

define(['game', 'controls'], function(Game, Controls) {
  'use strict';

  return {
    init: function() {
      var el = document.getElementById('game');

      var game = new Game({
        el: el
      }).init();

      Controls.init(game);
    }
  };
});

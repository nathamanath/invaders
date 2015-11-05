define(['game'], function(Game) {
  return {
    init: function() {
      var el = document.getElementById('game');

      var game = new Game({
        el: el
      }).init();

      game.start();
    }
  }
});

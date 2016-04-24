define(['game', 'controls', 'asset-bank'], function(Game, Controls, AssetBank) {
  'use strict';

  return {
    init: function() {
      var el = document.getElementById('game');

      var game = new Game({
        el: el
      });

      AssetBank.init(function() {
        game.init().start();
        Controls.init(game);
      });

      // Load audio assets
      AssetBank.loadAudio('erm', '/audio/erm.mp3');
      AssetBank.loadAudio('bloop', '/audio/bloop.mp3');

      AssetBank.loadImage('logo', '/images/logo.svg');
    }
  };
});

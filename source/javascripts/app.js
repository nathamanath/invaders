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


      // Load image assets
      AssetBank.loadImage('logo', '/images/logo.svg');

      AssetBank.loadImage('top_baddy_1', '/images/top_baddy_1.svg');
      AssetBank.loadImage('middle_baddy_1', '/images/middle_baddy_1.svg');
      AssetBank.loadImage('bottom_baddy_1', '/images/bottom_baddy_1.svg');
      AssetBank.loadImage('top_baddy_2', '/images/top_baddy_2.svg');
      AssetBank.loadImage('middle_baddy_2', '/images/middle_baddy_2.svg');
      AssetBank.loadImage('bottom_baddy_2', '/images/bottom_baddy_2.svg');

      AssetBank.loadImage('ufo', '/images/ufo.svg');

      AssetBank.loadImage('bullet_1', '/images/bullet_1.svg');
      AssetBank.loadImage('bullet_2', '/images/bullet_2.svg');
      AssetBank.loadImage('bullet_1_1', '/images/bullet_1_1.svg');
      AssetBank.loadImage('bullet_2_1', '/images/bullet_2_1.svg');

      AssetBank.loadImage('explosion', '/images/explosion.svg');
    }
  };
});

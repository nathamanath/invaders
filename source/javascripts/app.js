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
      AssetBank.registerAudio('erm', '/audio/erm.mp3');
      AssetBank.registerAudio('bloop', '/audio/bloop.mp3');


      // Load image assets
      AssetBank.registerImage('logo', '/images/logo.svg');

      AssetBank.registerImage('top_baddy_1', '/images/top_baddy_1.svg');
      AssetBank.registerImage('middle_baddy_1', '/images/middle_baddy_1.svg');
      AssetBank.registerImage('bottom_baddy_1', '/images/bottom_baddy_1.svg');
      AssetBank.registerImage('top_baddy_2', '/images/top_baddy_2.svg');
      AssetBank.registerImage('middle_baddy_2', '/images/middle_baddy_2.svg');
      AssetBank.registerImage('bottom_baddy_2', '/images/bottom_baddy_2.svg');

      AssetBank.registerImage('ufo', '/images/ufo.svg');

      AssetBank.registerImage('bullet_1', '/images/bullet_1.svg');
      AssetBank.registerImage('bullet_2', '/images/bullet_2.svg');
      AssetBank.registerImage('bullet_1_1', '/images/bullet_1_1.svg');
      AssetBank.registerImage('bullet_2_1', '/images/bullet_2_1.svg');

      AssetBank.registerImage('explosion', '/images/explosion.svg');
      AssetBank.registerImage('explosion_1', '/images/explosion_1.svg');

      AssetBank.finalize();
    }
  };
});

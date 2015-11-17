define([],
  function() {

  'use strict';

  var _game;

  return {
    init: function(game) {
      _game = game;

      var mute = document.getElementById('mute');
      var volume = document.getElementById('volume');

      debugger
      volume.value = game.volume();


      // TODO: checkbox for mute
      // TODO: set initial values

      mute.addEventListener('click', function() {

        if(_game.mute()) {
          mute.classList.add('is-active');
        } else {
          mute.classList.remove('is-active');
        }
      });


      volume.addEventListener('change', function() {
        game.volume(volume.value);
      });
    }
  }
});

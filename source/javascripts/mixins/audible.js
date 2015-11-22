define(['audio-player'],
  function(AudioPlayer) {

  'use strict';

  /**
   * Interface between object and audio player
   */
  return function() {

    /** @param name - name of audio in asset bank */
    this._playAudio = function(name, repeat) {
      var repeat = repeat || false;

      AudioPlayer.play(name, repeat);
    };
  };
});

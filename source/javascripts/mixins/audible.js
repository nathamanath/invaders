define(['audio-player'],
  function(AudioPlayer) {

  'use strict';

  /**
   * Interface between object and audio player
   */
  return function() {

    /** @param name - name of audio in asset bank */
    this._playAudio = function(name) {
      var repeat = repeat;

      AudioPlayer.play(name);
    };
  };
});

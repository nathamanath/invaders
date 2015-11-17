define(['asset-bank'],
  function(AssetBank) {

  'use strict';

  var _muted = false;
  var _volume = 1;

  /**
   * Handles all audio playback
   * @class AudioPlayer
   */
  return {
    /**
     * toggle muted
     * @returns {boolean} muted or not
     */
    mute: function() {
      _muted = !_muted;
      return _muted;
    },

    /**
     * get / set volume
     *
     * @param value - number between 0 and 1
     * @returns volumne
     */
    volume: function(value) {
      if(arguments.length) {
        _volume = Math.max(0, Math.min(1, value));
      }

      return _volume;
    },

    /**
     * play audio by name unless muted
     * @param name - name of audio in asset bank to be played
     */
    play: function(name) {
      if(!_muted) {
        var audio = AssetBank.getAudio(name);

        audio.volume = _volume;

        audio.play();
      }
    }

  }

});

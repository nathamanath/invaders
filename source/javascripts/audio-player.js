define(['asset-bank'],
  function(AssetBank) {

  'use strict';

  // TODO: when i mute the game, and then unmute a game, ongoing sounds should be audable

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

      if(arguments.length && typeof value !== 'undefined') {
        _volume = Math.max(0, Math.min(1, value));
      }

      return _volume;
    },

    /**
     * play audio by name unless muted
     * @param name - name of audio in asset bank to be played
     */
    play: function(name, loop) {
      if(!_muted) {
        var audio = AssetBank.getAudio(name);

        audio.volume = _volume;

        if(loop) {
          audio.addEventListener('ended', function() {
            this.currentTime = this.duration - 10;
            this.play();
          });
        }

        audio.play();
      }
    },

    stop: function(name) {
      if(!_muted) {
        var audio = AssetBank.getAudio(name);
        audio.pause();
        audio.currentTime = 0;
      }
    }

  }

});

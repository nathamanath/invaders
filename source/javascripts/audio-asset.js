define(['mixins/asset'],
  function(Asset) {

  'use strict';

  var AudioAsset = function(args) {
    this._initAsset(args);
  };

  AudioAsset.prototype = {
    constructor: 'AudioAsset',

    type: function() {
      return 'audio';
    }
  };

  Asset.call(AudioAsset.prototype, 'oncanplaythrough', Audio);

  return AudioAsset;

});


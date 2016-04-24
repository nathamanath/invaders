define(['mixins/asset'],
  function(Asset) {

  'use strict';

  var AudioAsset = function(args) {
    this._initAsset(args);
  };

  Asset.call(AudioAsset.prototype, 'oncanplaythrough', Audio);

  return AudioAsset;

});


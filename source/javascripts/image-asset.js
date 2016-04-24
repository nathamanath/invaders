define(['mixins/asset'],
  function(Asset) {

  'use strict';

  var ImageAsset = function(args) {
    this._initAsset(args);
  };

  Asset.call(ImageAsset.prototype, 'onload', Image);

  return ImageAsset;

});

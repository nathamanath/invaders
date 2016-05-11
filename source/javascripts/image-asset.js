define(['mixins/asset'],
  function(Asset) {

  'use strict';

  var ImageAsset = function(args) {
    this._initAsset(args);
  };

  ImageAsset.prototype = {
    constructor: 'ImageAsset',

    type: function() {
      return 'image';
    }
  };

  Asset.call(ImageAsset.prototype, 'onload', Image);

  return ImageAsset;

});

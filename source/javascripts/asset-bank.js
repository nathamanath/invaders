define(['mixins/asset'],
  function(Asset) {

  'use strict';

  /**
   * Cache image and audio assets
   * Used to preload game assets
   */


  var AudioAsset = function(args) {
    this._initAsset(args);
  };

  Asset.call(AudioAsset.prototype, 'oncanplay', Audio);


  var ImageAsset = function(args) {
    this._initAsset(args);
  };

  Asset.call(ImageAsset.prototype, 'onload', Image);

  var assets = {};
  var ready = true;

  /** are all assets ready */
  var checkReady = function() {
    var ready = true;

    for(var name in assets) {
      if(!assets[name].ready()) {
        ready = false;
      }
    }

    return ready;
  };

  var assetTypes = {
    image: ImageAsset,
    audio: AudioAsset
  }

  return {
    init: function(onReady) {
      this._onReady = onReady || function() {};
    },

    /**
     * preload an asset
     * @param label - unique label for asset
     * @param path - path to image
     */
    load: function(type, label, path) {
      ready = false;

      if(assets[label]) {
        throw new Error('Asset name is taken.');
      }

      var AssetObject = assetTypes[type];

      assets[label] = new AssetObject({
        label: label,
        path: path,
        onReady: checkReady
      })
    },

    /**
     * get an asset by name
     * @param label - label used when loading asset
     */
    get: function(label) {
      return assets[label].asset;
    }
  };

});

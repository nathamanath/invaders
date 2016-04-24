define(['audio-asset', 'image-asset'],
  function(AudioAsset, ImageAsset) {

  'use strict';

  /**
   * Cache image and audio assets
   * Used to preload game assets
   */

  var assets = {
    image: {},
    audio: {}
  };

  var assetTypes = {
    'image': ImageAsset,
    'audio': AudioAsset
  }

  var ready = true;

  /** are all assets ready */
  var checkReady = function() {
    var ready = true;

    Object.keys(assetTypes).forEach(function(key) {
      var typeAssets = assets[key];

      for(var name in typeAssets) {
        if(!typeAssets[name].ready()) {
          ready = false;
        }
      }
    });

    return ready;
  };


  return {
    init: function(onReady, context) {
      this._onReady = onReady || function() {};
      this._context = context || this;
    },

    /**
     * preload an asset
     * @param type - type of asset being loaded
     * @param label - unique label for asset
     * @param path - path to image
     */
    load: function(type, label, path) {
      ready = false;

      if(assets[type][label]) {
        throw new Error('Asset name is taken.');
      }

      var AssetObject = assetTypes[type];
      var self = this;

      assets[type][label] = new AssetObject({
        label: label,
        path: path,
        onReady: function() {
          if(checkReady()) {
            self._onReady.call(self._context);
          }
        }
      }).init();
    },

    loadImage: function(label, path) {
      return this.load('image', label, path);
    },

    loadAudio: function(label, path) {
      return this.load('audio', label, path);
    },

    /**
     * get an asset by name
     * @param label - label used when loading asset
     */
    get: function(type, label) {
      return assets[type][label].asset();
    },

    getImage: function(label) {
      return this.get('image', label);
    },

    getAudio: function(label) {
      return this.get('audio', label);
    }
  };

});

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

  Asset.call(AudioAsset.prototype, 'oncanplaythrough', Audio);

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
    init: function(onReady, context) {
      this._onReady = onReady || function() {};
      this._context = context || this;
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
      var self = this;

      assets[label] = new AssetObject({
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
      return assets[label].asset();
    },

    getImage: function(label) {
      return this.get('image', label);
    },

    getAudio: function(label) {
      return this.get('audio', label);
    }
  };

});

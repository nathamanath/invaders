define(['image-asset'],
  function(ImageAsset) {

  'use strict';

  /**
   * Cache image and audio assets
   * Used to preload game assets
   */

  var assets = [];

  var assetTypes = {
    'image': ImageAsset
  }

  var AssetBank = {
    init: function(onReady, context) {
      this._onReady = onReady || function() {};
      this._context = context || this;
    },

    _register: function(type, label, path) {
      if(this._get(type, label)) {
        throw new Error('Asset of type ' + type + 'and name ' + name + 'exists');
      }

      assets.push(new assetTypes[type]({
        path: path,
        label: label
      }).init());
    },

    registerImage: function(label, path) {
      this._register('image', label, path);
    },

    /**
     * Load all registered assets
     * call this._onReady when all are loaded
     */
    finalize: function() {
      var readyCounter = 0;
      var self = this;

      assets.forEach(function(asset) {
        asset.load(function() {
          readyCounter++;

          if(readyCounter == assets.length) {
            self._onReady();
          }
        });
      });
    },

    /**
     * get an asset by name
     * @param label - label used when loading asset
     */
    _get: function(type, label) {
      return assets.find(function(asset) {
        return(asset.type() == type && asset.label() == label);
      });
    },

    getImage: function(label) {
      return this._get('image', label).asset();
    }
  };

  return AssetBank;

});

define([],
  function() {

  'use strict';

  /**
   * Cache image and audio assets
   * Used to preload game assets
   */

  var assets = {};
  var ready = true;

  var checkReady = function() {
    var ready = true;

    for(var name in assets) {
      if(!assets[name].ready) {
        ready = false;
      }
    }

    return ready;
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
    load: function(label, path) {
      ready = false;

      if(assets[label]) {
        throw new Error('Asset name is taken.');
      }

      var image = new Image();
      var self = this;

      image.onload = function() {
        assets[label].ready = true;

        if(checkReady()) {
          self._onReady();
        }
      };

      image.src = path;

      assets[label] = {
        ready: false,
        asset: image
      }
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

define([], function() {
  'use strict';

  return function(readyEvent, AssetObject) {

    this._initAsset = function(args) {
      this._path = args.path;
      this._label = args.label;
      this._onReady = args.onReady;
    };

    this.init = function() {

      this._ready = false;
      this._asset = new AssetObject();

      var self = this;
      this._asset[readyEvent] = function() {
        self._onReadyEvent();
        // Ready event fires to often on audio. just want the first one.
        self._onReadyEvent = function() {};
      };

      this._asset.src = this._path;

      return this;
    };

    this._onReadyEvent = function() {
      this._ready = true;
      this._onReady();
      this[readyEvent] = null;
    };

    this.ready = function() {
      return this._ready;
    };

    this.asset = function() {
      return this._asset;
    };

  };
});

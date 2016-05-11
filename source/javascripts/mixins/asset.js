define([], function() {
  'use strict';

  return function(readyEvent, AssetObject) {

    this._initAsset = function(args) {
      this._path = args.path;
      this._label = args.label;
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

      return this;
    };

    this.load = function(callback) {
      this._asset.src = this._path;
      this._onLoad = callback || function() {};
    };

    this._onReadyEvent = function() {
      this._ready = true;
      this[readyEvent] = null;
      this._onLoad();
    };

    this.ready = function() {
      return this._ready;
    };

    this.asset = function() {
      return this._asset;
    };

    this.label = function() {
      return this._label;
    }

  };
});

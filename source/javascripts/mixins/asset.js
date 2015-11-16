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
      this._asset[readyEvent] = this._onReadyEvent;
      this._asset.src = this._path;

      return this;
    };

    this._onReadyEvent = function() {
      this._ready = true;
      this._onReady();
    };

  };
});

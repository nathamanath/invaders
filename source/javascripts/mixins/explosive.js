define(['managers/explosions-manager'],
  function(ExplosionsManager) {

  'use strict';

  return function(type) {

    this.points = function() {
      return this._points || null;
    };

    this._initExplosive = function(args) {
      this._explosionType = type;
    };

    this.explosionType = function() {
      return this._explosionType;
    }

    this.explode = function() {
      this._active = false;
      ExplosionsManager.add(this);
    }

  };

});

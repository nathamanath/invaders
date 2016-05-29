define(['mixins/drawable', 'asset-bank'],
  function(Drawable, AssetBank) {

  'use strict';

  // TODO: Make lives explode when removing

  var LIFE_WIDTH = 20;
  var LIFE_HEIGHT = 23;

  /** @class Life */
  var Life = function(args) {
    this._initDrawable(args);
  };

  /** @lends Life */
  Life.prototype = {
    constructor: 'Life',

    init: function() {
      this._width = LIFE_WIDTH;
      this._height = LIFE_HEIGHT;

      this._preRender();

      return this;
    },

    update: function() {
    },

    _preRender: function() {
      var context = this.canvas().context();
      var image = AssetBank.getImage('logo');

      context.drawImage(image, 0, 0, this._width, this._height);
    }
  };

  Drawable.call(Life.prototype);

  return Life;

});

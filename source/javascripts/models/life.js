define(['mixins/drawable'],
  function(Drawable) {

  'use strict';

  // TODO: Finish and use in HUD

  /** @class Life */
  var Life = function() {};

  /** @lends Life */
  Life.prototype = {
    constructor: 'Life',

    init: function(args) {

      this._initDrawable(args);

      return this;
    }
  };

  Drawable.call(Life.prototype);

  return Life;

});

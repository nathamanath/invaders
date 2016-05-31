define(['mixins/drawable'],
  function(Drawable) {

  'use strict';

  var COUNTER_WIDTH = 50;
  var COUNTER_HEIGHT = 50;

  /** @class Counter */
  var Counter = function(args) {

    args = args || {};

    this._initDrawable(args);

    this._count = args.count || '0';
  };

  /** @lends Counter */
  Counter.prototype = {
    constructor: 'Counter',

    init: function() {

      this._width = COUNTER_WIDTH;
      this._height = COUNTER_HEIGHT;

      this._drawCounter();

      return this;
    },

    update: function(count) {
      if(this._count !== count) {
        this._count = count;
        this.canvas().clear();
        this._drawCounter();
      }
    },

    _drawCounter: function() {
      var context = this.canvas().context();

      context.fillStyle = "white";
      context.font = "bold 16px Arial";
      context.textBaseline = 'top';
      context.fillText(this._count, 0, 0);
    }
  };

  Drawable.call(Counter.prototype);

  return Counter;

});

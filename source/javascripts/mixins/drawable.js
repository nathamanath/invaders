define(['canvas'], function(Canvas) {

  /**
   * Drawable mixin
   * Behaviour required to draw something to a canvas.
   *
   * @example Drawable.call(Class.prototype);
   */

  // TODO: Add prerenders
  var Drawable = function() {

    // render, update?

    /**
     * To be called in constructor
     * @param args - args object passed to constructor
     */
    this._initDrawable = function(args) {
      args = args || {};

      this.x(args.x || 0);
      this.y(args.y || 0);

      this._context = args.context;
    };

    /**
     * get / set x coordinate
     * @param value - new x coordinate
     * @returns x coordinate
     */
    this.x = function(value) {
      if(arguments.length > 0) {
        var rounded = Math.round(value);

        this._oldX = this._x || rounded;
        this._x = rounded;
      }

      return this._x;
    };

    /**
     * get / set y coordinate
     * @param value - new y coordinate
     * @returns y coordinate
     */
    this.y = function(value) {
      if(arguments.length > 0) {
        var rounded = Math.round(value);

        this._oldY = this._y || rounded;
        this._y = rounded;
      }

      return this._y;
    };

    this.oldX = function() {
      return this._oldX;
    };

    this.oldY = function() {
      return this._oldY;
    };

    this.width = function() {
      return this._width;
    };

    this.height = function() {
      return this._height;
    };

    /** @returns context on which to render drawable */
    this.context = function() {
      return this._context;
    };

    this._parentCanvas = function() {
      return this.context().canvas;
    };

    /** @returns pre-render canvas */
    this.canvas = function() {
      return this._canvas || this._setCanvas();
    };

    this._canvasContext = function() {
      return this.canvas().context();
    },

    this._setCanvas = function() {
      return this._canvas = new Canvas({
        width: this.width(),
        height: this.height()
      }).init();
    };

    /** render drawable onto parent canvas */
    this.draw = function() {
      this.context().drawImage(this.canvas().el, this.x(), this.y());
    };

    /** clear pre-render canvas */
    this._clearCanvas = function() {
      this.canvas().clear(0, 0, this.width(), this.height());
    }
  };

  return Drawable;

});

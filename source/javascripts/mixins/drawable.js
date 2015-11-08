define(['canvas'], function(Canvas) {

  /**
   * Drawable mixin
   * Behaviour required to draw something to a canvas.
   *
   * @example Drawable.call(Class.prototype);
   */
  var Drawable = function() {

    // render, update?

    // To be called in constructor
    this._initDrawable = function(args) {
      this.x(args.x);
      this.y(args.y);

      this._context = args.context;
    };

    this.x = function(value) {
      if(arguments.length > 0) {
        var rounded = Math.round(value);

        this._oldX = this._x || rounded;
        this._x = rounded;
      }

      return this._x;
    };

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

    this.context = function() {
      return this._context;
    };

    this._parentCanvas = function() {
      return this.context().canvas;
    };

    this.canvas = function() {
      return this._canvas || this._setCanvas();
    };

    // TODO: can this be in Drawable scope?
    this._setCanvas = function() {
      return this._canvas = new Canvas({
        width: this._parentCanvas().width,
        height: this._parentCanvas().height
      }).init();
    };

    this.draw = function() {
      this.context().drawImage(this.canvas().el, 0, 0);
    };

    this._clearCanvas = function() {
      this.canvas().clear(this.oldX(), this.oldY(), this.width(), this.height());
    }
  };

  return Drawable;

});

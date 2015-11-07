define(['drawable', 'canvas'], function(Drawable, Canvas) {

  /**
   * Prerenderable module
   *
   * Save memory by rendering prerenderables to their own canvas as needed,
   * and then render said canvases to main game canvas via animation loop.
   *
   * Prerenderable canvases are the same size as the main canvas. This solves
   * issuses when working out offsets for collissions etc. when working with
   * nested canvases.
   *
   * @example Prerenderable.call(Class);
   */

  // TODO: Prerenderable mixin
  var Prerenderable = function() {

    /** cache rendering */
    this.prototype._preRender = function() {
      this.canvas = new Canvas({
        width: this.args.context.canvas.width,
        height: this.args.context.canvas.height
      }).init();

      this._render(this.canvas.context());
    };

  };

  return Prerenderable;

});

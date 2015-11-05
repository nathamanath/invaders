define([], function() {

  /**
   * Interface to canvas el
   *
   * @class Canvas
   * @param width - width in px
   * @param height - height in px
   */
  var Canvas = function(args) {
    this.width = args.width;
    this.height = args.height;
  };

  /** @lends Canvas */
  Canvas.prototype = {
    init: function() {
      this.el = document.createElement('canvas');

      this.el.width = this.width;
      this.el.height = this.height;

      return this;
    },

    context: function() {
      return this.el.getContext('2d');
    },

    /**
    * Render to dom
    * @param el - dom node to append canvas
    */
    render: function(el) {
      el.appendChild(this.el);
    },

    /**
     * Clear part or all of canvas
     * @param [x=0]
     * @param [y=0]
     * @param [width=this.width]
     * @param [height=this.height]
     */
    clear: function(x, y, width, height) {
      x = x || 0;
      y = y || 0;
      width = width || this.width;
      height = height || this.height;

      this.context().clearRect(x, y, width, height);
    }
  };

  return Canvas;

});


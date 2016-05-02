define(['mixins/drawable', 'canvas', 'interface'],
  function(Drawable, Canvas, Interface) {

  'use strict';

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
   * @example Prerenderable.call(Class.prototype);
   */

  // TODO: Prerenderable mixin
  // TODO: is this part of drawable?

  return function() {

    Interface.apply(this, ['width', 'height']);

  };

});

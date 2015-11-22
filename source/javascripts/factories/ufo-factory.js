define(['models/ufo', 'canvas'],
  function(UFO, Canvas) {

  'use strict';

  var ufoCanvas = (function() {
    var canvas = new Canvas({
      width: UFO.WIDTH,
      height: UFO.HEIGHT
    }).init();

    var context = canvas.context();

    context.fillStyle = 'pink';
    context.fillRect(0, 0, UFO.WIDTH, UFO.HEIGHT);

    return canvas;
  })();

  return {
    new: function(context, y) {
      return new UFO({
        x: UFO.WIDTH * -1,
        y: y,
        context: context,
        canvas: ufoCanvas
      }).init();
    }
  };
});

define(['models/ufo', 'canvas', 'asset-bank'],
  function(UFO, Canvas, AssetBank) {

  'use strict';

  var ufoCanvas = function() {

    var render = function() {
      var canvas = new Canvas({
        width: UFO.WIDTH,
        height: UFO.HEIGHT
      }).init();

      var context = canvas.context();

      var image = AssetBank.getImage('ufo');
      context.drawImage(image, 0, 0, UFO.WIDTH, UFO.HEIGHT);
    };

    var canvas = render();

    ufoCanvas = function() {
      return canvas;
    };

    return canvas;
  };

  return {
    new: function(context, y) {
      return new UFO({
        x: UFO.WIDTH * -1,
        y: y,
        context: context,
        canvas: ufoCanvas()
      }).init();
    }
  };
});

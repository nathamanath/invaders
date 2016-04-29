define(['models/ufo', 'canvas', 'asset-bank'],
  function(UFO, Canvas, AssetBank) {

  'use strict';

  var ufoCanvas = function() {

    ufoCanvas = Canvas.renderImage({
      width: UFO.WIDTH,
      height: UFO.HEIGHT,
      image: AssetBank.getImage('ufo')
    })

    return ufoCanvas();
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

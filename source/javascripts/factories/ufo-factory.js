define(['models/ufo', 'canvas', 'asset-bank'],
  function(UFO, Canvas, AssetBank) {

  'use strict';

  // TODO: Asign ufo score here

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

      var score = (Math.floor(Math.random() * 3) + 1) * 50;

      return new UFO({
        x: UFO.WIDTH * -1,
        y: y,
        context: context,
        canvas: ufoCanvas(),
        score: score
      }).init();
    }
  };
});

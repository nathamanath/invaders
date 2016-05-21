define(['models/explosion', 'asset-bank', 'canvas'],
  function(Explosion, AssetBank, Canvas) {

  'use strict';

  var prerenders = {};

  // TODO: score explosion for ufo

  // when a character explodes
  prerenders.player = function() {
    prerenders.player = Canvas.renderImage({
      width: 65,
      height: 35,
      image: AssetBank.getImage('explosion')
    });

    return prerenders.player();
  };

  // when a bullet explodes
  prerenders.bullet = function() {
    prerenders.bullet = Canvas.renderImage({
      width: 20,
      height: 20,
      image: AssetBank.getImage('explosion_1')
    });

    return prerenders.bullet();
  };

  var explosionData = {
    player: {
      width: 65,
      height: 35,
      prerender: prerenders.player
    },

    bullet: {
      width: 20,
      height: 20,
      prerender: prerenders.bullet
    },

    ufo: {
      width: 35,
      height: 20,
      prerender: function(score) {

        var width = explosionData.ufo.width;
        var height = explosionData.ufo.height;

        var canvas = new Canvas({
          width: width,
          height: height
        }).init();

        var context = canvas.context();

        // write score to canvas
        // TODO: cache score canvases

        context.fillStyle = 'white';
        context.font = "bold 20px Arial";
        context.textBaseline = 'top';
        context.fillText(score, 0, 0);

        return canvas;
      }
    }
  };

  return {

    new: function(type, x, y, context, onUpdate, score) {

      var data = explosionData[type];

      var width = data.width;
      var height = data.height;

      var args = {
        x: x - width / 2,
        y: y - height / 2,
        context: context,
        canvas: data.prerender(score),
        onUpdate: onUpdate,
        width: width,
        height: height
      }

      return new Explosion(args).init();
    }
  };
});

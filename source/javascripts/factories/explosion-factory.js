define(['models/explosion', 'asset-bank', 'canvas'],
  function(Explosion, AssetBank, Canvas) {

  'use strict';

  var prerenders = {};

  // TODO: pre-render not working here yet

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
      image: AssetBank.getImage('explosion_1') // TODO: graphic for this
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
    }
  };

  return {

    new: function(type, x, y, context, onUpdate) {

      var data = explosionData[type];

      var width = data.width;
      var height = data.height;

      var args = {
        x: x - width / 2,
        y: y - height / 2,
        context: context,
        canvas: data.prerender(),
        onUpdate: onUpdate,
        width: width,
        height: height
      }

      return new Explosion(args).init();
    }
  };
});

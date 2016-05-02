define(['models/explosion', 'asset-bank', 'canvas'],
  function(Explosion, AssetBank, Canvas) {
  'use strict';

  var prerenders = {};

  // TODO: pre-render not working here yet

  // when a character explodes
  prerenders.player = function() {
    prerenders.player = Canvas.renderImage({
      width: Explosion.WIDTH,
      height: Explosion.HEIGHT,
      image: AssetBank.getImage('explosion')
    });

    return prerenders.player();
  };

  // when a bullet explodes
  prerenders.bullet = function() {
    prerenders.bullet = Canvas.renderImage({
      width: Explosion.WIDTH,
      height: Explosion.HEIGHT,
      image: AssetBank.getImage('explosion')
    });

    return prerenders.bullet();
  };

  return {
    new: function(type, x, y, context, onUpdate) {

      var args = {
        x: x,
        y: y,
        context: context,
        canvas: prerenders[type](),
        onUpdate: onUpdate
      }

      return new Explosion(args).init();
    }
  };
});
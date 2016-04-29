define(['models/bullet', 'canvas', 'asset-bank'],
  function(Bullet, Canvas, AssetBank) {

  'use strict';

  var prerenders = {};

  // TODO: bullet svgs
  prerenders.square = (function() {

    prerenders.square = function() {
      var canvas = new Canvas({
        width: Bullet.WIDTH,
        height: Bullet.HEIGHT
      }).init();

      var context = canvas.context();

      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, Bullet.WIDTH, Bullet.HEIGHT);

      return canvas;
    }

    return prerenders.square();
  });


  prerenders.zigzag = function() {

    prerenders.zigzag = Canvas.renderImage({
      width: Bullet.WIDTH,
      height: Bullet.HEIGHT,
      image: AssetBank.getImage('bullet_1')
    })

    return prerenders.zigzag();
  };

  prerenders.cross = function() {

    prerenders.cross = Canvas.renderImage({
      width: Bullet.WIDTH,
      height: Bullet.HEIGHT,
      image: AssetBank.getImage('bullet_2')
    })

    return prerenders.cross();
  };

  // TODO: Speed - player bullet is faster
  // TODO: Bullets explode on out of bounds

  return {
    new: function(shooter, context) {

      var args = {
        x: shooter.gunX(),
        y: shooter.gunY(),
        context: context,
        direction: shooter.gunDirection(),
        team: shooter.team(),
        canvas: prerenders[shooter.bulletType()]()
      }

      return new Bullet(args).init();
    }
  };

});

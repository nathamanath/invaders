define(['models/bullet', 'canvas', 'asset-bank'],
  function(Bullet, Canvas, AssetBank) {

  'use strict';

  var prerenders = {};

  // TODO: bullet svgs
  prerenders.square = (function() {

    prerenders.square = function() {
      var canvas = new Canvas({
        width: 6,
        height: 14
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
      width: 9,
      height: 21,
      image: AssetBank.getImage('bullet_1')
    })

    return prerenders.zigzag();
  };

  prerenders.zigzag2 = function() {

    prerenders.zigzag = Canvas.renderImage({
      width: 9,
      height: 21,
      image: AssetBank.getImage('bullet_1_1')
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

  prerenders.cross2 = function() {

    prerenders.cross = Canvas.renderImage({
      width: Bullet.WIDTH,
      height: Bullet.HEIGHT,
      image: AssetBank.getImage('bullet_2_1')
    })

    return prerenders.cross();
  };


  var bulletData = {
    square: {
      width: 6,
      height: 14,
      frames: [
        prerenders.square
      ]
    },

    cross: {
      width: 9,
      height: 21,
      frames: [
        prerenders.cross,
        prerenders.cross2
      ]
    },

    zigzag: {
      width: 9,
      height: 21,
      frames: [
        prerenders.zigzag,
        prerenders.zigzag2
      ]
    }
  };

  // TODO: Speed - player bullet is faster
  // TODO: Bullets should explode on out of bounds

  return {
    new: function(shooter, context) {

      var sizeData = bulletData[shooter.bulletType()];

      var args = {
        x: shooter.gunX(),
        y: shooter.gunY(),
        context: context,
        direction: shooter.gunDirection(),
        team: shooter.team(),
        width: sizeData.width,
        height: sizeData.height
      };

      var bullet = new Bullet(args).init();

      sizeData.frames.forEach(function(prerender) {
        bullet.addFrame(prerender());
      });

      return bullet;
    }
  };

});

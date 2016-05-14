define(['models/baddy', 'canvas', 'asset-bank'],
  function(Baddy, Canvas, AssetBank) {

  'use strict';

  var prerenders = {};

  prerenders.top1 = function() {
    prerenders.top = Canvas.renderImage({
      width: 40,
      height: 40,
      image: AssetBank.getImage('top_baddy_1')
    });

    return prerenders.top();
  };

  prerenders.top2 = function() {
    prerenders.top = Canvas.renderImage({
      width: 40,
      height: 40,
      image: AssetBank.getImage('top_baddy_2')
    });

    return prerenders.top();
  };

  prerenders.middle1 = function() {
    prerenders.middle = Canvas.renderImage({
      width: 60,
      height: 40,
      image: AssetBank.getImage('middle_baddy_1')
    });

    return prerenders.middle();
  };

  prerenders.middle2 = function() {
    prerenders.middle = Canvas.renderImage({
      width: 60,
      height: 40,
      image: AssetBank.getImage('middle_baddy_2')
    });

    return prerenders.middle();
  };

  prerenders.bottom1 = function() {
    prerenders.bottom = Canvas.renderImage({
      width: 60,
      height: 40,
      image: AssetBank.getImage('bottom_baddy_1')
    });

    return prerenders.bottom();
  };

  prerenders.bottom2 = function() {
    prerenders.bottom = Canvas.renderImage({
      width: 60,
      height: 40,
      image: AssetBank.getImage('bottom_baddy_2')
    });

    return prerenders.bottom();
  };


  var bullets = [
    'zigzag',
    'cross',
    'square'
  ];

  var baddyData = {
    top: {
      width: 40,
      height: 40,
      points: 30,
      frames: [
        prerenders.top1,
        prerenders.top2
      ]
    },

    middle: {
      width: 60,
      height: 40,
      points: 20,
      frames: [
        prerenders.middle1,
        prerenders.middle2
      ]
    },

    bottom: {
      width: 60,
      height: 40,
      points: 10,
      frames: [
        prerenders.bottom1,
        prerenders.bottom2
      ]
    }
  };

  // TODO: baddy types are not same size

  return {
    new: function(type, x, y, context) {

      var sizeData = baddyData[type];

      var args = {
        x: x,
        y: y,
        context: context,
        points: sizeData.points,
        bulletType: bullets[Math.floor(Math.random() * bullets.length)],
        width: sizeData.width,
        height: sizeData.height
      }

      var baddy = new Baddy(args).init();

      sizeData.frames.forEach(function(prerender) {
        baddy.addFrame(prerender());
      });

      return baddy;
    }
  };

});

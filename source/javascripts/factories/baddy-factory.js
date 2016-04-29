define(['models/baddy', 'canvas', 'asset-bank'],
  function(Baddy, Canvas, AssetBank) {

  'use strict';

  var prerenders = {};

  prerenders.top = function() {

    prerenders.top = Canvas.renderImage({
      width: Baddy.WIDTH,
      height: Baddy.HEIGHT,
      image: AssetBank.getImage('top_baddy_1')
    });

    return prerenders.top();
  };

  prerenders.middle = function() {
    prerenders.middle = Canvas.renderImage({
      width: Baddy.WIDTH,
      height: Baddy.HEIGHT,
      image: AssetBank.getImage('middle_baddy_1')
    });

    return prerenders.middle();
  };

  prerenders.bottom = function() {
    prerenders.bottom = Canvas.renderImage({
      width: Baddy.WIDTH,
      height: Baddy.HEIGHT,
      image: AssetBank.getImage('bottom_baddy_1')
    });

    return prerenders.bottom();
  };

  var points = {
    top: 30,
    middle: 20,
    bottom: 10
  };

  var bullets = [
    'zigzag',
    'cross',
    'square'
  ];

  // TODO: baddy types are not same size

  return {
    new: function(type, x, y, context) {

      var args = {
        x: x,
        y: y,
        context: context,
        canvas: prerenders[type](),
        points: points[type],
        bulletType: bullets[Math.floor(Math.random() * bullets.length)]
      }

      return new Baddy(args).init();
    }
  };

});

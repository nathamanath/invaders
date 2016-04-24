define(['models/baddy', 'canvas', 'asset-bank'],
  function(Baddy, Canvas, AssetBank) {

  'use strict';

  var prerenders = {};

  prerenders.top = function() {

    var render = function() {
      var canvas = new Canvas({
        width: Baddy.WIDTH,
        height: Baddy.HEIGHT
      }).init();

      var context = canvas.context();

      // context.fillStyle = 'green';
      // context.fillRect(0, 0, Baddy.WIDTH, Baddy.HEIGHT);

      var image = AssetBank.getImage('top_baddy_1');

      context.drawImage(image, 0, 0, Baddy.WIDTH, Baddy.HEIGHT);

      return function() {
        return canvas;
      }
    };


    prerenders.top = render();

    return prerenders.top();
  };

  prerenders.middle = function() {

    var render = function() {
      var canvas = new Canvas({
        width: Baddy.WIDTH,
        height: Baddy.HEIGHT
      }).init();

      var context = canvas.context();

      // context.fillStyle = 'green';
      // context.fillRect(0, 0, Baddy.WIDTH, Baddy.HEIGHT);

      var image = AssetBank.getImage('middle_baddy_1');

      context.drawImage(image, 0, 0, Baddy.WIDTH, Baddy.HEIGHT);

      return function() {
        return canvas;
      }
    };


    prerenders.top = render();

    return prerenders.top();
  };

  prerenders.bottom = function() {

    var render = function() {
      var canvas = new Canvas({
        width: Baddy.WIDTH,
        height: Baddy.HEIGHT
      }).init();

      var context = canvas.context();

      // context.fillStyle = 'green';
      // context.fillRect(0, 0, Baddy.WIDTH, Baddy.HEIGHT);

      var image = AssetBank.getImage('bottom_baddy_1');

      context.drawImage(image, 0, 0, Baddy.WIDTH, Baddy.HEIGHT);

      return function() {
        return canvas;
      }
    };


    prerenders.top = render();

    return prerenders.top();
  };

  var points = {
    top: 200,
    middle: 150,
    bottom: 100
  };

  return {
    new: function(type, x, y, context) {

      var args = {
        x: x,
        y: y,
        context: context,
        canvas: prerenders[type](),
        points: points[type]
      }

      return new Baddy(args).init();
    }
  };

});

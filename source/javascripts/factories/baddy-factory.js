define(['models/baddy', 'canvas'],
  function(Baddy, Canvas) {

  'use strict';

  var prerenders = {};

  prerenders.top = (function() {
    var canvas = new Canvas({
      width: Baddy.WIDTH,
      height: Baddy.HEIGHT
    }).init();

    var context = canvas.context();

    context.fillStyle = 'green';
    context.fillRect(0, 0, Baddy.WIDTH, Baddy.HEIGHT);

    return canvas;
  })();

  prerenders.middle = (function() {
    var canvas = new Canvas({
      width: Baddy.WIDTH,
      height: Baddy.HEIGHT
    }).init();

    var context = canvas.context();

    context.fillStyle = 'cyan';
    context.fillRect(0, 0, Baddy.WIDTH, Baddy.HEIGHT);

    return canvas;
  })();

  prerenders.bottom = (function() {
    var canvas = new Canvas({
      width: Baddy.WIDTH,
      height: Baddy.HEIGHT
    }).init();

    var context = canvas.context();

    context.fillStyle = 'purple';
    context.fillRect(0, 0, Baddy.WIDTH, Baddy.HEIGHT);

    return canvas;
  })();

  return {
    new: function(type, x, y, context) {

      var args = {
        x: x,
        y: y,
        context: context,
        canvas: prerenders[type]
      }

      return new Baddy(args).init();
    }
  };

});

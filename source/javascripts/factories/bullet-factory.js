define(['models/bullet', 'canvas'],
  function(Bullet, Canvas) {

  'use strict';

  var prerenders = {};

  prerenders.square = (function() {
    var canvas = new Canvas({
      width: Bullet.WIDTH,
      height: Bullet.HEIGHT
    }).init();

    var context = canvas.context();

    context.fillStyle = 'red';
    context.fillRect(0, 0, Bullet.WIDTH, Bullet.HEIGHT);

    return canvas;
  })();

  prerenders.cross = (function() {})();
  prerenders.zigzag = (function() {})();

  return {
    new: function(shooter, context) {

      var args = {
        x: shooter.gunX(),
        y: shooter.gunY(),
        context: context,
        direction: shooter.gunDirection(),
        team: shooter.team(),
        canvas: prerenders[shooter.bulletType()]
      }

      return new Bullet(args).init();
    }
  };

});

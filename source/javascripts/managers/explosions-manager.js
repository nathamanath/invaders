define(['models/explosion'],
  function(Explosion) {

  'use strict';

  var explosions = [];

  var ExplosionsManager = {
    init: function(context) {
      this._context = context;
    },

    explosions: function() {
      return explosions;
    },

    // TODO: Spawn new explosions with explosion center at center of explodable
    new: function(explodable) {
      explosions.push(new Explosion({
        x: explodable.x(),
        y: explodable.y(),
        context: this._context
      }).init());
    },

    draw: function() {
      explosions.forEach(function(explosion) {
        explosion.draw();
      });
    },

    update: function() {
      explosions.forEach(function(explosion) {
        explosion.update();
      });
    }
  };

  return ExplosionsManager;
});

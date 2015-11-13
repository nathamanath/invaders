define(['clock'], function(Clock) {

  /**
   * Pubsub for key presses
   */
  var Keyboard = (function() {

    var SPEED = 1000 / 60;

    var KEYS = {
      LEFT: 37,
      RIGHT: 39,
      SPACE: 32
    };

    var Klass = function() {
      this.subscribers = [];
      this.clock = new Clock(SPEED);
      this.pressing = {};
    };

    Klass.prototype = {
      constructor: 'KeyboardObserver',

      init: function() {

        var self = this;

        document.addEventListener('keydown', function(e) {
          self.pressing[e.keyCode] = 1;
          self.clock.start();
        });

        document.addEventListener('keyup', function(e) {
          delete self.pressing[e.keyCode];
        });

        this.clock.subscribe(this._check, this);

        return this;
      },

      _check: function() {
        if(Object.keys(this.pressing).length) {

          var subscribers = this.subscribers;
          var filtered;

          for(var key in this.pressing) {

            filtered = subscribers.filter(function(subscriber) {
              return subscriber.key === parseInt(key);
            });

            filtered.forEach(function(subscriber) {
              subscriber.fn.call(subscriber.context);
            });
          }
        } else {
          // there are currently no keys pressed... no need to check
          this.clock.stop();
        }
      },

      // TODO: allow string or keycode. Map string to keycode
      subscribe: function(key, callback, context) {
        context = context || this;

        if(parseInt(key) !== key) {
          var name = key;
          key = KEYS[key];

          if(!key) {
            throw new Error(this.constructor + ': Un-registered key name: ' + name);
          }
        }

        this.subscribers.push({
          key: key,
          fn: callback,
          context: context
        });

        return this;
      }
    };

    return Klass;
  })();


  var instance = new Keyboard().init();

  return instance;

});

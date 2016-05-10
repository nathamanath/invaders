define([], function() {

  'use strict';

  /**
   * A clock for time based events
   *
   * Main clocks will be animation and logic loops.
   * But game components can have own clocks too.
   *
   * @class Clock
   * @param rate - ms between ticks of clock
   * @todo Clocks could emmit events rather than store array of callbacks
   */
  var Clock = function(rate) {
    this.rate = rate;
    this.state = Clock.PAUSED;
    this.subscribers = [];
  };

  // States
  Clock.ACTIVE = 1;
  Clock.PAUSED = 2;

  /** @lends Clock */
  Clock.prototype = {
    /** Make clock tick */
    start: function() {
      if(this.state === Clock.ACTIVE) { return this; }

      this.state = Clock.ACTIVE;
      this._tick();

      return this;
    },

    /** Pause clock */
    stop: function() {
      this.state = Clock.PAUSED;
      return this;
    },

    /**
     * @param callback - to be called on clock change
     * @param [context=this] - context in which to execute callback
     */
    subscribe: function(callback, context) {
      context = context || this;

      this.subscribers.push({
        fn: callback,
        context: context
      });

      return this;
    },

    _tick: function() {
      var self = this;
      window.setTimeout(function() {
        if(self.state === Clock.ACTIVE) {
          self._notifySubscribers();
          self._tick();
        }
      }, this.rate);
    },

    _notifySubscribers: function() {
      var self = this;

      this.subscribers.forEach(function(subscriber) {
        self._notifySubscriber(subscriber);
      });
    },

    _notifySubscriber: function(subscriber) {
      subscriber.fn.call(subscriber.context);
    }
  };

  return Clock;

});

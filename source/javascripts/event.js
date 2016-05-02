define([],
  function() {

  'use strict';

  var events = {};

  /**
   * Manages custom events
   *
   * @class Event
   * @private
   */
  return {
    /**
     * @param eventName
     * @param [eventType=HTMLEvents] - type of event
     */
    create: function(eventName) {
      var event = document.createEvent(eventType);

      // dont bubble
      event.initEvent(eventName, false, true);
      events[eventName] = event;
      return event;
    },

    /**
     * @param el
     * @param eventName
     */
    fire: function(el, eventName, eventType, code) {
      var event = events[eventName] || this.create(eventName, eventType);

      if(eventType === 'KeyboardEvent') {
        var get = { get: function() { return code } };
        var defineProperty = Object.defineProperty;

        defineProperty(event, 'which', get);
        defineProperty(event, 'keyCode', get);
      }

      el.dispatchEvent(event);
    }
  };
});

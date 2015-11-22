define([],
  function() {

  'use strict';

  /**
   * Manager mixin
   *
   * Manage a group of drawables. e.g. bullets.
   * Only the manager (and respective factory) need interact with a managed model
   * Use `forwardedAttributes` to pass atteibutes from model to manager where
   * the rest of the app can access them.
   *
   * @param forwardedAttributes - array of managed property names to access via
   * manager. Normally constants of managable class required by other parts of app
   *
   * @example Manager.call(Class.prototype, [['BADDY_HEIGHT', Baddy.HEIGHT], ...]);
   */
  var Manager = function(forwardedAttributes) {

    forwardedAttributes = forwardedAttributes || {};

    /** Define accessors for forwarded attributes */
    for(var attr in forwardedAttributes) {
      var value = forwardedAttributes[attr];

      this[attr] = value;
    }

    /** holds items being managed */
    this._managables = [];

    /** remove a drawable */
    this.remove = function(managed) {
      var index = this._managables.indexOf(managed);
      return this._managables.splice(index, 1);
    };

    /** send draw to all managables */
    this.draw = function() {
      this._managables.forEach(function(managed) {
        managed.draw();
      });
    };

    // TODO: How to best manage this or existing?

    /** send update to all managables */
    this.update = this.update || function() {

      var self = this;

      this._managables.forEach(function(managable) {
        if(!managable.active()) {
          self.remove(managable);
        }

        managable.update();
      });
    };

    /** create a new managable. must define _newManagable per manager */
    this.add = function() {
      this._managables.push(this._newManagable.apply(this, arguments));
    };

    /** @returns array of managed drawables */
    this.all = function() {
      return this._managables;
    };
  };

  return Manager;
});

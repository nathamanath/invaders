define([],
  function() {

  'use strict';

  var errorMessage = function(error) {
    throw new Error(error);
  };

  /**
   * Enforce an interface on an obect
   * @class Interface
   */
  return {
    /**
     * @param interface - List of strings representing interface
     * @param scope - scope in which to enforce interface
     */
    apply: function(scope, instanceMethods) {

      if(!scope) {
        throw new Error('Interface.apply requires scope.');
      }

      instanceMethods = instanceMethods || [];

      var klass = scope.constructor;

      instanceMethods.forEach(function(method) {
        if(typeof scope[method] === 'undefined') {
          errorMessage(klass + '.prototype does not impliment ' + method);
        }
      });

    }
  };

});

// define(['mixins/manager', 'models/life'],
//   function(Manager, Life) {

//   'use strict';

//   var LivesManager = function(args) {
//     args = args || {};

//     this._initManager(args);

//     this.lifeCount = args.lives;
//   };

//   LivesManager.prototype = {
//     constructor: 'LivesManager',

//     init: function() {
//       this._lifeInstance =
//     },

//     _newManagable: function(args) {
//       return new Life({ x: args.}).init();
//     },

//     update: function(lives) {
//       this._lifeCount = lives;


//     }
//   };

//   Manager.call(LivesManager.prototype);

//   var instance = new LivesManager();
//   return instance;

// });

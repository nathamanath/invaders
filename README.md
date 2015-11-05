# Space invaders

## Development


Smooth out animations + acceleration / easing


Require js. (Almond for build.)
Ajax.js for ajax

Object composition is handles with mixin modules. Each module can contain class
and instance methods, and is mixed into a class like so: `Module.call(Class, args...);`.
This pattern is based on articles like [this](https://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/)

* Drawable
* Prerenderable
* Classable

I'm playing with the idea of making sure I use getters and setters for all publicly accessible object
attributes. Things like google maps api do this. It is very nice and consistant
to work with. In order to make this easy for myself `Classable` provides `.getsAndSets`
This generates an all in one gettter / setter method for a named parameter.

Testing is handles with the jasmine gem. As soon as basic functionality is plannned out
full test coverage will be a main priority.

### TODO:

Look at how to make private object attributes more inaccessible... closures etc

Consider interface implimentation from pro javascript design patterns book.

* the whole game
* throttle mouse move events
* consider other inputs... touch
* holes
* organize js file structure
* might not actually need a visible bishop basher... just if bishop is within width / height of click
* make mixins call mixin dependencies

I made event observers... need to think about how these should be
applied, and when they are worse than just an event listener.
good... e.g. observe click on drawable

Keyboard observer seems a good use of this


define(['mixin'], function(Mixin) {

  'use strict';

  // Private scope for secret things
  var SPEED = 5;
  var score = 0;

  var Class = function(args) {
    this._x = this._oldX = args.x;
    this._y = this._oldY = args.y;
    this.context = args.context;
  };

  Class.prototype = {
    constructor: 'Class',

    init: function() {
      return this;
    },

    // accesor
    x: function(value) {
      if(value) {
        this._x = value;
      }

      return this._x;
    },

    // example reader
    score: function() {
      return score;
    },

    // example writer
    y: function(value) {
      this._oldY = this._y;
      this._y = value;
    }
  };

  Mixin.call(Class.prototype);

  return Class;

})

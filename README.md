# Space invaders

## TODO

* animated bullets
* svg shields
* explosion types
* audio player bugs
* speed up baddies based on player kills

* convert to webpack / brunch.io
* avoid redrawing entire game each frame

## Development

Require js. (Almond for build.)
Ajax.js for ajax

Object composition is handled with functional mixin modules. Each module can contain
instance methods, and is mixed into a class like so: `Module.call(Class.prototype, args...);`.
This pattern is based on articles like [this](https://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/)

* Drawable
* Shooter

Important to avoid drawing things as much as possible.

#### Class structure:

```
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

    // reader
    score: function() {
      return score;
    },

    // writer
    y: function(value) {
      this._oldY = this._y;
      this._y = value;
    }
  };

  Mixin.call(Class.prototype, args...);

  return Class;

})
```


### Setup

* Clone
* Clone submodules `git submodule init; git submodule update`
* `bundle`
* `bundle exec middleman`

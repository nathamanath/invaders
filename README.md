# Space invaders

## TODO

* baddy collides with house
* hud - lives and score
* game over if 0 lives
* animated baddys
* animated bullets
* asset bank
* sounds
* scoreboard
* levels
* build process
* only bottom baddys shoot


## Development

Require js. (Almond for build.)
Ajax.js for ajax

Object composition is handles with mixin modules. Each module can contain class
and instance methods, and is mixed into a class like so: `Module.call(Class, args...);`.
This pattern is based on articles like [this](https://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/)

* Drawable

I'm playing with the idea of making sure I use getters and setters for all publicly accessible object
attributes. Things like google maps api do this. It is very nice and consistant
to work with.

Testing is handles with the jasmine gem. As soon as basic functionality is plannned out
full test coverage will be a main priority.

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
```


### Setup

* Clone
* Clone submodules `git submodule init; git submodule update`
* `bundle`
* `bundle exec middleman`

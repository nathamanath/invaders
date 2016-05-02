define(['interface'],
  function(Interface) {

    'use strict';

    return function() {

      this.addFrame = function(canvas) {
        this._frames.push(canvas);
      };

      this._initAnimatable = function() {
        this._currentFrame = 0;
        this._frames = [];
      };

      this._updateAnimatable = function() {

        var currentFrame = this._currentFrame;
        var frames = this._frames;

        if(currentFrame < frames.length -1) {
          this._currentFrame = ++currentFrame;
        } else {
          this._currentFrame = 0;
        }

        this._canvas = frames[this._currentFrame];

      };

    };

});

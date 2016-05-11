(function(require) {

  'use strict';

  require(['config']);

  require(['app'], function(app) {
    app.init();
  });

})(require);

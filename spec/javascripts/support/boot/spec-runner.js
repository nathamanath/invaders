
// Requirejs Configuration Options
require.config({
  // to set the default folder
  baseUrl: '../assets/javascripts',
  // paths: maps ids with paths (no extension)
  paths: {
      'jasmine': ['/__jasmine__/jasmine'],
      'jasmine-html': ['/__jasmine__/jasmine-html'],
      'jasmine-boot': ['/__jasmine__/boot']
  },
  // shim: makes external libraries compatible with requirejs (AMD)
  shim: {
    'jasmine-html': {
      deps : ['jasmine']
    },
    'jasmine-boot': {
      deps : ['jasmine', 'jasmine-html']
    }
  }
});


require(['jasmine-boot'], function () {


  // TODO: List out spec files dynamicly


  require(['/spec/javascripts/bitSpec.js'], function(){
    //trigger Jasmine
    window.onload();
  })
});

(function(window) {
  /**
   * Wrapper around benchmark.js to make an interface which pleases me.
   * @param name - name pf benchmark test
   */
  var BenchmarkTest = (function() {
    var Klass = function(name) {
      this._name = name;
    };

    Klass.prototype = {
      constructor: 'Test',

      init: function() {
        this._benchmark = new Benchmark.Suite;

        this._benchmark.on('cycle', function(event) {
          console.log('  --> ' + String(event.target));
        })
        .on('complete', function() {
          console.log('----------');
          console.log('Fastest is ' + this.filter('fastest').pluck('name'));
          console.log('');

          // fastest is n times faster than slowest,
          // fastest is n times faster than next fastest

          console.log('Done!');
        })

        return this;
      },

      before: function(callback) {
        this._benchmark.on('start', callback);
      },

      after: function() {},
      beforeEach: function() {},
      afterEach: function() {},

      /**
       * Adds a variant to banchmark suite
       *
       * @param name - name of variant
       * @param callback - the variant itsself
       */
      add: function(name, callback) {
        this._benchmark.add(name, callback);
      },

      /** Run benchmark suite */
      run: function() {
        console.log('Running benchmark: ' + this._name + '...');
        console.log('----------');

        this._benchmark.run({ 'async': true });
      }
    };

    return Klass;
  })();

  window.BenchmarkTest = BenchmarkTest;

})(window);

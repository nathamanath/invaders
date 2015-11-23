({
  baseUrl: './build/javascripts',
  name: 'main',
  mainConfigFile: 'build/javascripts/main.js',
  deps: [
    'main'
  ],
  optimize: 'uglify2',
  removeCombined: true,
  findNestedDependencies: true,
  out: 'build/javascripts/main.js'
})

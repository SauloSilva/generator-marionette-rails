'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var fs = require('fs-extra');
var jsRootDestination = 'app/assets/javascripts/';

describe('marionette-rails:app:js', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ skipInstall: true })
      .withPrompt({
        appName: 'Test',
        hasLiveReload: false,
        templateEngine: 'underscore',
        hasCoffee: false
      })
      .on('end', done);

  });

  it('creates files', function () {
    assert.file([
      '.bowerrc',
      'bower.json',
      jsRootDestination + 'application.js',
      jsRootDestination + 'backbone/app.js',
      jsRootDestination + 'backbone/lib/controllers/application_controller.js',
      jsRootDestination + 'backbone/lib/utilities/fetch.js',
      jsRootDestination + 'backbone/lib/utilities/mixings.js',
      jsRootDestination + 'backbone/lib/utilities/navigation.js',
      jsRootDestination + 'backbone/lib/utilities/registry.js',
      jsRootDestination + 'backbone/lib/utilities/renderer.js',
      jsRootDestination + 'config/backbone/sync.js',
      jsRootDestination + 'config/assets.js',
      jsRootDestination + 'config/settings.js.erb'
    ]);

  });

  it('check content file', function() {
    assert.noFile([
      'config/initializers/live_reload_middleware.rb',
      'Guardfile'
    ]);

    var guardLiveReload = "gem 'guard-livereload', '2.4.0'";
    var rackLiveReload = "gem 'rack-livereload', '0.3.15'";
    var hamlCoffeeAssets = "gem 'haml_coffee_assets'";

    assert.noFileContent('Gemfile', guardLiveReload)
    assert.noFileContent('Gemfile', rackLiveReload)
    assert.noFileContent('Gemfile', hamlCoffeeAssets)
  });
});

describe('marionette-rails:app:coffee', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ skipInstall: true })
      .withPrompt({
        appName: 'Test',
        hasLiveReload: true
      })
      .on('end', done);

  });

  it('creates files', function () {
    assert.file([
      '.bowerrc',
      'bower.json',
      jsRootDestination + 'application.js',
      jsRootDestination + 'backbone/app.js.coffee',
      jsRootDestination + 'backbone/lib/controllers/application_controller.js.coffee',
      jsRootDestination + 'backbone/lib/utilities/fetch.js.coffee',
      jsRootDestination + 'backbone/lib/utilities/mixings.js.coffee',
      jsRootDestination + 'backbone/lib/utilities/navigation.js.coffee',
      jsRootDestination + 'backbone/lib/utilities/registry.js.coffee',
      jsRootDestination + 'backbone/lib/utilities/renderer.js.coffee',
      jsRootDestination + 'config/backbone/sync.js.coffee',
      jsRootDestination + 'config/assets.js.coffee',
      jsRootDestination + 'config/hamlc.js.coffee',
      jsRootDestination + 'config/settings.js.erb',
      'config/initializers/live_reload_middleware.rb'
    ]);
  });

  it('check content file', function() {
    var guardLiveReload = "'guard-livereload', '2.4.0'";
    var rackLiveReload = "'rack-livereload', '0.3.15'";
    var hamlCoffeeAssets = "gem 'haml_coffee_assets'";
    var guard = "guard 'livereload' do \n\twatch(%r{app/views/.+\.haml}) \n\twatch(%r{vendor/assets/bower_components/.+\.(css|js|html)}) \n\twatch(%r{(app|vendor)(/assets/\w+/(.+\.(coffee|sass|css|js|html|hamlc))).*}) { |m| '/assets/#{m[3]}' } \nend"

    assert.fileContent('Gemfile', guardLiveReload)
    assert.fileContent('Gemfile', rackLiveReload)
    assert.fileContent('Gemfile', hamlCoffeeAssets)
    assert.fileContent('Guardfile', guard)
  });
});
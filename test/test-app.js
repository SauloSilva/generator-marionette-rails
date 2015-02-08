'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var jsRootDestination = 'app/assets/javascripts/';

describe('marionette-rails:app', function () {
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
      jsRootDestination + 'application.js.coffee',
      jsRootDestination + 'backbone/app.js.coffee',
      jsRootDestination + 'backbone/lib/controllers/application_controller.js.coffee',
      jsRootDestination + 'backbone/lib/utilities/fetch.js.coffee',
      jsRootDestination + 'backbone/lib/utilities/mixings.js.coffee',
      jsRootDestination + 'backbone/lib/utilities/navigation.js.coffee',
      jsRootDestination + 'backbone/lib/utilities/registry.js.coffee',
      jsRootDestination + 'backbone/lib/utilities/renderer.js.coffee',
      jsRootDestination + 'config/backbone/sync.coffee',
      jsRootDestination + 'config/assets.coffee',
      jsRootDestination + 'config/hamlc.coffee',
      jsRootDestination + 'config/settings.js.erb',
      'config/initializers/live_reload_middleware.rb'
    ]);
  });

  it('check content file', function() {
    var gems = "gem 'guard-livereload', '2.4.0', require: false, group: :development\ngem 'rack-livereload', '0.3.15', group: :development"
    var guard = "guard 'livereload' do \n\twatch(%r{app/views/.+\.haml}) \n\twatch(%r{vendor/assets/bower_components/.+\.(css|js|html)}) \n\twatch(%r{(app|vendor)(/assets/\w+/(.+\.(coffee|sass|css|js|html|hamlc))).*}) { |m| '/assets/#{m[3]}' } \nend"

    assert.fileContent('Gemfile', gems)
    assert.fileContent('Guardfile', guard)
  });
});

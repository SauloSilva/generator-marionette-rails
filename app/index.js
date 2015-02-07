'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var jsRootDestination = "app/assets/javascripts/"

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the ' + chalk.red('Marionette Rails') + ' generator!'
    ));

    var prompts = [{
      name: 'appName',
      message: "What is your app\'s name ?"
    },{
      type: 'confirm',
      name: 'hasLiveReload',
      message: 'You want to add livereload ?'
    }, {
      name: 'classLoading',
      message: "What your name\'s loading class ?",
      default: '.is-loading'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  scaffoldFolders: function(){
      console.log(jsRootDestination)
      this.mkdir(jsRootDestination + 'backbone');
      this.mkdir(jsRootDestination + 'backbone/apps');
      this.mkdir(jsRootDestination + 'backbone/entities');
      this.mkdir(jsRootDestination + 'backbone/lib');
      this.mkdir(jsRootDestination + 'backbone/lib/components');
      this.mkdir(jsRootDestination + 'backbone/lib/concerns');
      this.mkdir(jsRootDestination + 'backbone/lib/controllers');
      this.mkdir(jsRootDestination + 'backbone/lib/utilities');
      this.mkdir(jsRootDestination + 'backbone/lib/views');
      this.mkdir(jsRootDestination + 'config');
      this.mkdir(jsRootDestination + 'config/backbone');
  },

  copyMainFiles: function(){
    var context = {
        appName: this.props.appName,
        classLoading: this.props.classLoading
    };

    this.template("javascripts/_application.coffee", jsRootDestination + "application.js.coffee", context);

    this.template("javascripts/backbone/_app.js.coffee", jsRootDestination + "backbone/app.js.coffee", context);
    this.template("javascripts/backbone/lib/controllers/_application_controller.js.coffee", jsRootDestination + "backbone/lib/controllers/application_controller.js.coffee", context);
    this.template("javascripts/backbone/lib/utilities/_fetch.js.coffee", jsRootDestination + "backbone/lib/utilities/fetch.js.coffee", context);
    this.template("javascripts/backbone/lib/utilities/_mixings.js.coffee", jsRootDestination + "backbone/lib/utilities/mixings.js.coffee", context);
    this.template("javascripts/backbone/lib/utilities/_navigation.js.coffee", jsRootDestination + "backbone/lib/utilities/navigation.js.coffee", context);
    this.template("javascripts/backbone/lib/utilities/_registry.js.coffee", jsRootDestination + "backbone/lib/utilities/registry.js.coffee", context);
    this.template("javascripts/backbone/lib/utilities/_renderer.js.coffee", jsRootDestination + "backbone/lib/utilities/renderer.js.coffee", context);

    this.copy("javascripts/config/backbone/_sync.js.coffee", jsRootDestination + "config/backbone/sync.coffee");
    this.copy("javascripts/config/_assets.js.coffee", jsRootDestination + "config/assets.coffee");
    this.copy("javascripts/config/_hamlc.js.coffee", jsRootDestination + "config/hamlc.coffee");
    this.copy("javascripts/config/_settings.js.erb", jsRootDestination + "config/settings.js.erb");
  },

  addLiveReload: function() {
    if (!this.props.hasLiveReload) { return }
    var gems = "gem 'guard-livereload', '2.4.0', require: false, group: :development\ngem 'rack-livereload', '0.3.15', group: :development"
    var guard = "guard 'livereload' do \n\twatch(%r{app/views/.+\.haml}) \n\twatch(%r{vendor/assets/bower_components/.+\.(css|js|html)}) \n\twatch(%r{(app|vendor)(/assets/\w+/(.+\.(coffee|sass|css|js|html|hamlc))).*}) { |m| '/assets/#{m[3]}' } \nend"

    this.write("Gemfile", gems);
    this.write("Guardfile", guard);

    this.template("rails/initializers/_live_reload_middleware.rb", "config/initializers/live_reload_middleware.rb", { appName: this.props.appName });
  },

  writing: {
    app: function () {
      this.template("_bower.json", "bower.json", { appName: this.props.appName });
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('.bowerrc'),
        this.destinationPath('.bowerrc')
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});

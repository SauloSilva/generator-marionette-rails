'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var jsRootDestination = "app/assets/javascripts/";
var gems = "";

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
      name: 'hasCoffee',
      message: 'You will use coffescript ?'
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
    var fileExtension = this.props.hasCoffee ? '.coffee' : ''

    this.template("javascripts/_application.js", jsRootDestination + "application.js", context);

    this.template("javascripts/backbone/_app.js" + fileExtension, jsRootDestination + "backbone/app.js" + fileExtension, context);
    this.template("javascripts/backbone/lib/controllers/_application_controller.js" + fileExtension, jsRootDestination + "backbone/lib/controllers/application_controller.js" + fileExtension, context);
    this.template("javascripts/backbone/lib/utilities/_fetch.js" + fileExtension, jsRootDestination + "backbone/lib/utilities/fetch.js" + fileExtension, context);
    this.template("javascripts/backbone/lib/utilities/_mixings.js" + fileExtension, jsRootDestination + "backbone/lib/utilities/mixings.js" + fileExtension, context);
    this.template("javascripts/backbone/lib/utilities/_navigation.js" + fileExtension, jsRootDestination + "backbone/lib/utilities/navigation.js" + fileExtension, context);
    this.template("javascripts/backbone/lib/utilities/_registry.js" + fileExtension, jsRootDestination + "backbone/lib/utilities/registry.js" + fileExtension, context);
    this.template("javascripts/backbone/lib/utilities/_renderer.js" + fileExtension, jsRootDestination + "backbone/lib/utilities/renderer.js" + fileExtension, context);

    this.copy("javascripts/config/backbone/_sync.js" + fileExtension, jsRootDestination + "config/backbone/sync" + fileExtension);
    this.copy("javascripts/config/_assets.js" + fileExtension, jsRootDestination + "config/assets" + fileExtension);
    this.copy("javascripts/config/_hamlc.js" + fileExtension, jsRootDestination + "config/hamlc" + fileExtension);
    this.copy("javascripts/config/_settings.js.erb", jsRootDestination + "config/settings.js.erb");
  },

  addLiveReload: function() {
    if (!this.props.hasLiveReload) { return }
    gems += "\ngem 'guard-livereload', '2.4.0', require: false, group: :development"
    gems += "\ngem 'rack-livereload', '0.3.15', group: :development"
    var guard = "guard 'livereload' do \n\twatch(%r{app/views/.+\.haml}) \n\twatch(%r{vendor/assets/bower_components/.+\.(css|js|html)}) \n\twatch(%r{(app|vendor)(/assets/\w+/(.+\.(coffee|sass|css|js|html|hamlc))).*}) { |m| '/assets/#{m[3]}' } \nend"

    this.write("Guardfile", guard);
    this.template("rails/initializers/_live_reload_middleware.rb", "config/initializers/live_reload_middleware.rb", { appName: this.props.appName });
  },

  addGems: function() {
    gems += "\ngem 'haml_coffee_assets', git: 'https://github.com/netzpirat/haml_coffee_assets'";
    try {
      var Gemfile = this.readFileAsString("Gemfile")
    } catch(e) {
      var Gemfile = ""
    }
    Gemfile += gems;

    this.write("Gemfile", Gemfile);
  },

  writing: {
    app: function () {
      this.template("_bower.json", "bower.json", { appName: this.props.appName });
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('.bowerrc'),
        this.destinationPath('.bowerrc')
      );
    }
  },

  install: function () {
    if (this.options.skipInstall) { return }
    this.bowerInstall();
  }
});

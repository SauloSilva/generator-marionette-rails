this.<%= appName %> = (function(Backbone, Marionette) {
  var App = new Marionette.Application;
  App.addRegions({});

  App.addInitializer(function() {
    console.log('app initialized');
  });

  App.reqres.setHandler('concern', function(concern) {
    App.Concerns[concern];
  });

  App.on('start', function() {
    this.startHistory();
  });

  return App;
})(Backbone, Marionette);

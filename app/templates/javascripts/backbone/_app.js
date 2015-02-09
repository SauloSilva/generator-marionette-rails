this.<%= appName %> = (function(Backbone, Marionette) {
  var App = new Marionette.Application;
  App.addRegions({});

  App.addInitializer(function() {
    return console.log('app initialized');
  });

  App.reqres.setHandler('concern', function(concern) {
    return App.Concerns[concern];
  });

  App.on('start', function() {
    return this.startHistory();
  });

  return App;
})(Backbone, Marionette);

this.<%= appName %>.module('Utilities', function(Utilities, App, Backbone, Marionette, $, _) {
  App.commands.setHandler('when:fetched', function(entities, callback, failCallback) {
    var xhrs = _.chain([entities]).flatten().pluck('_fetch').value();

    $.when.apply($, xhrs).done(function() {
      callback();
    }).fail(function(e) {
      if (failCallback) { failCallback(); }
      App.vent.trigger('throw:error');
    });
  });
});
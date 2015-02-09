this.<%= appName %>.module('Utilities', function(Utilities, App, Backbone, Marionette, $, _) {

  var mixinKeywords = ['beforeIncluded', 'afterIncluded'];
  var results = [];

  var include = function() {
    var klass = this;
    var objs =  arguments.length ? [].slice.call(arguments, 0) : [];

    $.each(objs, function(i, obj) {
      var concern = App.request('concern', obj)
      var ref = '';

      var beforeIncluded = concern.beforeIncluded
      if (beforeIncluded) {
        beforeIncluded.call(klass.prototype, klass, concern)
      }

      Cocktail.mixin(klass, (ref = _(concern).omit(ref, mixinKeywords)))

      var afterIncluded = concern.afterIncluded
      if (afterIncluded) {
        afterIncluded.call(klass.prototype, klass, concern)
      }
    })

    return klass;
  };

  modules = [
    {
      Marionette: ['ItemView', 'LayoutView', 'CollectionView', 'CompositeView']
    }, {
      Backbone: ['Model', 'Collection']
    }
  ];

  $.each(modules, function(i, module){
    for (key in module) {
      $.each(module[key], function(i, klass) {
        obj = window[key] || App[key];
        results.push(obj[klass].include = include);
      })
    }
  })

  return results;
});
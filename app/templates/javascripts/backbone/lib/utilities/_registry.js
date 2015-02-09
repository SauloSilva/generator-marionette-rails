this.<%= appName %>.module('Utilities', function(Utilities, App, Backbone, Marionette, $, _) {
  var API = {
    register: function(instance, id) {
      if (_.isNull(App._registry)) {
        App._registry = {};
      }

      return App._registry[id] = instance;
    },

    unregister: function(instance, id) {
      return delete App._registry[id];
    },

    resetRegistry: function() {
      var controller, key, oldCount, ret, _ref;

      oldCount = this.getRegistrySize();

      _ref = App._registry;
      for (key in _ref) {
        controller = _ref[key];
        controller.region.close();
      }

      ret = {
        count: this.getRegistrySize(),
        previous: oldCount,
        msg: "There were " + oldCount + " controllers in the registry, there are now " + (this.getRegistrySize())
      };

      console.info(ret);
      return ret;
    },

    getRegistrySize: function() {
      return _.size(App._registry);
    }
  };

  App.commands.setHandler('register:instance', function(instance, id) {
    if (App.environment === 'development') {
      return API.register(instance, id);
    }
  });

  App.commands.setHandler('unregister:instance', function(instance, id) {
    if (App.environment === 'development') {
      return API.unregister(instance, id);
    }
  });

  return App.reqres.setHandler('reset:registry', function() {
    return API.resetRegistry();
  });
});
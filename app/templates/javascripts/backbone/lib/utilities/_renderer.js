this.<%= appName %>.module('Utilities', function(Utilities, App, Backbone, Marionette, $, _) {
  _.extend(Marionette.Renderer, {
    lookups: ['backbone/apps', 'backbone/lib/components'],

    render: function(template, data) {
      if (!template) { return }

      var path = this.getTemplate(template);

      if (!path) {
        throw "Template " + template + " not found!";
      }

      return path(data);
    },

    getTemplate: function(template) {
      var lookup, path, _i, _len, _ref;

      _ref = this.lookups;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        lookup = _ref[_i];
        path = lookup + "/" + template;

        if (JST[path]) {
          return JST[path];
        }
      }
    }
  });
});
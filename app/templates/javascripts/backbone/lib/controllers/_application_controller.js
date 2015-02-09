this.<%= appName %>.module('Controllers', function(Controllers, App, Backbone, Marionette, $, _) {
  Controllers.Application = Marionette.Controller.extend({
    initialize: function(options) {
      if (options == null) {
        options = {};
      }

      this._instance_id = _.uniqueId('controller');
      App.execute('register:instance', this, this._instance_id);
    },

    onDestroy: function() {
      if (this.layout) {
        this.layout.destroy();
      }

      return App.execute('unregister:instance', this, this._instance_id);
    },

    show: function(view, options) {
      if (options == null) {
        options = {};
      }

      _.defaults(options, {
        classLoading: '.is-loading',
        entities: false,
        region: App.mainRegion
      });

      this.options = options;
      this.view = view;

      return this._manageViews();
    },

    _manageViews: function() {
      this.options.region.show(this.loadingView());

      if (!this.options.entities) {
        return this.options.region.show(this.view);
      } else {
        this._toggleLoading();

        App.execute('when:fetched', this.options.entities, (function() {
          this.options.region.show(this.view);
        }.bind(this)));
      }
    },

    _toggleLoading: function() {
      if (!this.options.entities.on) { return }

      this.options.entities.on('request', (function() {
        this.options.region.$el.addClass(this.options.classLoading);
      }.bind(this)));

      this.options.entities.on('sync', (function() {
        this.options.region.$el.removeClass(this.options.classLoading);
      }.bind(this)));
    },

    loadingView: function() {
      new Marionette.ItemView({
        template: false,
        className: this.options.classLoading
      });
    }
  })(Marionette.Controller);
});
@<%= appName %>.module 'Controllers', (Controllers, App, Backbone, Marionette, $, _) ->

  class Controllers.Application extends Marionette.Controller

    constructor: (options = {}) ->
      super options
      @_instance_id = _.uniqueId('controller')
      App.execute 'register:instance', @, @_instance_id

    onDestroy: ->
      @layout.destroy() if @layout
      App.execute 'unregister:instance', @, @_instance_id

    show: (view, options = {}) ->
      _.defaults options,
        classLoading: '<%= classLoading %>'
        entities: false
        region: App.mainRegion

      @options = options
      @view = view
      @_manageViews()

    _manageViews: ->
      @options.region.show @loadingView()

      unless @options.entities
        @options.region.show @view
      else
        @_toggleLoading()
        App.execute 'when:fetched', @options.entities, =>
          @options.region.show @view

    _toggleLoading: ->
      return unless @options.entities.on
      @options.entities.on 'request', => @options.region.$el.addClass @options.classLoading
      @options.entities.on 'sync', => @options.region.$el.removeClass @options.classLoading

    loadingView: ->
      new Marionette.ItemView template: false, className: @options.classLoading

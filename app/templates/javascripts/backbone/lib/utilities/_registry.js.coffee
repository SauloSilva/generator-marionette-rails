@<%= appName %>.module 'Utilities', (Utilities, App, Backbone, Marionette, $, _) ->

  API =
    register: (instance, id) ->
      App._registry ?= {}
      App._registry[id] = instance

    unregister: (instance, id) ->
      delete App._registry[id]

    resetRegistry: ->
      oldCount = @getRegistrySize()
      for key, controller of App._registry
        controller.region.close()

      ret =
        count: @getRegistrySize()
        previous: oldCount
        msg: "There were #{ oldCount } controllers in the registry, there are now #{ @getRegistrySize() }"

      console.info ret
      ret

    getRegistrySize: ->
      _.size(App._registry)

  App.commands.setHandler 'register:instance', (instance, id) ->
    API.register instance, id if App.environment is 'development'

  App.commands.setHandler 'unregister:instance', (instance, id) ->
    API.unregister instance, id if App.environment is 'development'

  App.reqres.setHandler 'reset:registry', ->
    API.resetRegistry()

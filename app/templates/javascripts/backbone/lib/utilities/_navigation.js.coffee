@<%= appName %>.module 'Utilities', (Utilities, App, Backbone, Marionette, $, _) ->
  _.extend App,

  navigate: (route, options = {}) ->
    Backbone.history.navigate @urlFor(route), options

  getCurrentRoute: ->
    frag = Backbone.history.fragment
    if _.isEmpty(frag) then null else frag

  urlFor: (route) ->
    route = '/' unless route?
    route = "/#{ route }" if route.slice(0) isnt '/'
    route = "#{ route }/" if route.slice(-1) isnt '/'

    route = route.replace(/\/\//g, '/')
    route

  startHistory: ->
    if Backbone.history
      Backbone.history.start()

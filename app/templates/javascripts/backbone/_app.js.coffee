@<%= appName %> = do (Backbone, Marionette) ->
  App = new Marionette.Application

  App.addRegions({})

  App.addInitializer ->
    console.log 'app initialized'

  App.reqres.setHandler 'concern', (concern) -> App.Concerns[concern]

  App.on 'start', ->
    @startHistory()

  App

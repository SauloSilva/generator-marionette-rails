class window.Assets
  @getInstance: ->
    @_instance ?= new @(arguments...)

  imagePath: (image) ->
    Settings.assets[image]
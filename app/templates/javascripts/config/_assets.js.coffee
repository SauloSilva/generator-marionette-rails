class window.Assets
  @getInstance: ->
    @_instance ?= new @(arguments...)

  imagePath: (image) ->
    return
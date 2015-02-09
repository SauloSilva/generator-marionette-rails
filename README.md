# generator-marionette-rails [![Build Status](https://secure.travis-ci.org/SauloSilva/generator-marionette-rails.png?branch=master)](https://travis-ci.org/SauloSilva/generator-marionette-rails)

> [Yeoman](http://yeoman.io) generator

## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### What is Rails?

[Rails](http://guides.rubyonrails.org/getting_started.html) is a web application development framework written in the Ruby language. It is designed to make programming web applications easier.

```bash
gem install rails
```

### Yeoman Generator Marionette Rails

This generator is intended to help structure a project on rails that provide to receive the marionette as the framework of javascript.

To install generator-marionette-rails from npm, run:

```bash
npm install -g generator-marionette-rails
```

Finally, initiate the generator:

```bash
yo marionette-rails
```

### Directory structure

- app/
    - assets/
      - javascripts/                --> client side files
        - backbone/
          - apps/
          - entities/
          - lib/
            - components/
            - concerns/
            - controllers/
              - * application_controller.js(.coffee)
            - utilities/
              - * fetch.js(.coffee)
              - * mixings.js(.coffee)
              - * navigation.js(.coffee)
              - * registry.js(.coffee)
              - * renderer.js(.coffee)
            - views/
          - * app.js(.coffee)
        - config/
          - backbone/
            - * sync.js(.coffee)
          - * assets.js(.coffee)
          - * hamlc.js(.coffee)
          - * settings.js.erb

        - * application.js(.coffee)
    
    - config/
      - initializers/
        - * live_reload_middleware.rb

    * bower.json
    * .bowerrc
    * vendor/assets/bower_components    --> bower installs


### Options

- **hasCoffee: (true|false)**

  You can pick coffescript or javascript. By default's coffeescript.

- **templateEngine: (haml|underscore)**
  
  You may use haml and underscore. By default is haml

- **hasLiveReload: (true|false)**
  
  You can request for we configured the livereload for your assets

- **classLoading: (string)**

  Sets the CSS class to the div to load. By default's `is-loading`

## License

MIT
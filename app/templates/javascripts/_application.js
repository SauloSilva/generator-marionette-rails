//= require jquery
//= require underscore
//= require backbone
//= require backbone.babysitter
//= require backbone.wreqr
//= require backbone.marionette
//= require hamlcoffee
//= require_tree ./config

//= require backbone/app

//= require_tree ./backbone/lib/utilities
//= require_tree ./backbone/lib/views
//= require_tree ./backbone/lib/controllers
//= require_tree ./backbone/lib/components

//= require_tree ./backbone/entities
//= require_tree ./backbone/apps

//= require_self

$(document).ready(function(){
  <%= appName %>.start()
})

HAML.globals = function() {
  var  assets = Assets.getInstance();
  return _.extend({}, assets);
};
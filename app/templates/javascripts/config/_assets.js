window.Assets = (function() {
  function Assets() {}

  Assets.getInstance = function() {
    return this._instance != void(0) ? this._instance : this._instance = (function() {
        return new Assets();
    })();
  };

  Assets.prototype.imagePath = function(image) {};

  return Assets;

})();
/**
 * Usage var ninja = Singleton.getInstance(img);
 */
var Singleton = (function () {
    var instance;

    function createInstance(img) {
        return new createjs.Bitmap(img);
    }

    return {
        getInstance: function (img) {
            if (!instance) {
                instance = createInstance(img);
            }
            return instance;
        }
    };
})();
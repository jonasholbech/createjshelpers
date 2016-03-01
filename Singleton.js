/**
 * Usage var ninja = Singleton.getInstance(img);
 */
var Singleton = (function () {
    var instance;

    function createInstance(img) {
        var s = new createjs.Bitmap(img);
        return s;
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
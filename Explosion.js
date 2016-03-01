/**
 * Usage new Explosion(Game.stage, x, y)
 * @param parent
 * @param posX
 * @param posY
 * @returns {createjs.Sprite|*}
 * @constructor
 */
var Explosion = function (parent, posX, posY) {
    'use strict';
    var my, data = {
        images: ["img/explode_1.png"],
        frames: {
                    width: 96,
                    height: 96,
                    regX: 32,
                    regY: 32
                },
                framerate:12,
                animations: {
                    explode: [0, 16]
                }
            };

        
        var spriteSheet = new createjs.SpriteSheet(data);

    my = new createjs.Sprite(spriteSheet);
    my.x = posX;
    my.y = posY;
    parent.addChild(my);
    my.gotoAndPlay("explode");
    my.addEventListener("animationend", function () {
        parent.removeChild(my);
    });

    return my;
};
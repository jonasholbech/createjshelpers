'use strict';
console.log("Ticker loaded");
var Ticker = {
    start:function(){
        createjs.Ticker.setFPS(60);
        createjs.Ticker.on("tick", this.tock);
    },
    tock:function(e){
        Game.stage.update(e);
    }
};
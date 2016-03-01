"use strict";
var Game = {
    stage:new createjs.Stage("mixer"),
    settings:null,
    init:function(){
        Preload.init(this);
        Preload.load(this.setupGame);
    },
    setupGame:function(){
        this.stage.removeAllChildren();
        this.settings = Preload.queue.getResult("settings");
        Controls.initialize();
        Ticker.start();
    }
};
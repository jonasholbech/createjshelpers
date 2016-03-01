var Game = {
    stage:new createjs.Stage("mixer"),
    init:function(){
        Preloader.load()
    },
    setupGame:function(){
        this.stage.removeAllChildren();
        this.settings = Preload.queue.getResult("settings");

        Controls.initialize();
        Ticker.start();
    }
}
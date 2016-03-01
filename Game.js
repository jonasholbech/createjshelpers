var Game = {
    stage:new createjs.Stage("mixer"),
    init:function(){
        Preloader.load()
    },
    setupGame:function(){
        this.stage.removeAllChildren();
        this.hero = Objects.getHero();
        Game.stage.addChild(this.hero)
        this.enemy = Objects.getEnemy();
        Game.stage.addChild(this.enemy)
        Controls.initialize();
        Ticker.start();
    }
}
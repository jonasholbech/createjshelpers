var Ticker = {
    start:function(){
        createjs.Ticker.setFPS(60);
        createjs.Ticker.on("tick", this.tock)
    },
    tock:function(e){
        Game.enemy.move();
        Game.hero.move();
        Game.stage.update(e);
    }
}
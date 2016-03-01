var Preloader = {
    queue: new createjs.LoadQueue(true),
    loadText: new createjs.Text("", "50px Courier New", "#000"),
    load:function(){
        Game.stage.addChild(this.loadText)
        this.queue.on("progress", this.progress, this)
        this.queue.on("complete", Game.setupGame, Game)
        this.queue.loadManifest([
            {id:'bgMusic', src:'audio/dreamRaid1.mp3'},
            {id:'explosion', src:'audio/explosion.mp3'},
            "img/1.png","img/2.png",
            "spritesheets/enemy.png", "spritesheets/hero.png",
            {id:'heroJson', src:'spritesheets/hero.json'},
            {id:'enemyJson', src:'spritesheets/enemy.json'},
            "js/Ticker.js", "js/Objects.js",
            "js/Controls.js"
        ])
    },
    progress:function(e){
        this.loadText.text= Math.round(e.progress*100)+"% done"
        Game.stage.update();
    }
}

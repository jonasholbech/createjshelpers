var Objects = {
    getHero:function(){
        var heroSS = new createjs.SpriteSheet(Preloader.queue.getResult("heroJson"));
        var t = new createjs.Sprite(heroSS, "left");
        t.gotoAndStop("left")
        t.move=function(){
            if(Controls.rkd){
                this.x++;
            }
        }
        return t;
    },
    getEnemy:function(){
        var enemySS = new createjs.SpriteSheet(Preloader.queue.getResult("enemyJson"));
        var t = new createjs.Sprite(enemySS, "run");
        t.dir="right";
        t.move = function(){
            if(this.dir=='right'){
                this.x++;
                if(this.x>Game.stage.canvas.width-100 && this.dir=='right'){
                    this.dir="left";
                    this.scaleX*=-1;
                }
            } else {
                this.x--;
                if(this.x<1 && this.dir=='left'){
                    this.dir="right";
                    this.scaleX*=-1;
                }
            }
        }
        return t;
    }
}
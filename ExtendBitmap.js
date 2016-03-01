(function() {

    function Tower(data) {
        this.data = data || {};
        this.gfx = data.gfx || null;
        this.name = data.damage || 100;
        this.cost = data.damage || 100;
        this.damage = data.damage || 100;
        this.range = data.damage || 100;
        this.speed = data.damage || 100;
        this.reload = data.damage || 100;
        this.reloadBase = this.reload;
        this.Bitmap_constructor(this.gfx);
        this.setup();
    }
    var p = createjs.extend(Tower, createjs.Bitmap);

    p.setup = function() {
        this.on('click', p.tClicked, this);
        this.on('tick', p.tick, this);
        this.cursor = "pointer";
    } ;
    p.tick = function(e){
        if(!e.paused){
            this.reload--;
            if(this.reload<1){
                this.attack();
            }
            //console.log("reloading", this.reload)
        }
    };
    p.attack = function(){
        var e;
        var enemies=Game.getEnemies();
        for(e=enemies.length-1; e>=0; e--){
            if(Utils.distance(this, enemies[e])<=this.range){
                console.log("fire!");
                this.reload=this.reloadBase;
            }
        }
    };
    p.tClicked = function (event) {
        console.log("You clicked on a button: "+this);
    };


    window.Tower = createjs.promote(Tower, "Bitmap");
}());
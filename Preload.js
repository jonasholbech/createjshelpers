var Preload = {
    queue: new createjs.LoadQueue(true),
    loadText: new createjs.Text("", "50px Courier New", "#FFF"),
    init:function(parent){
        this.parent=parent;
    },
    load:function(callback){
        this.parent.stage.addChild(this.loadText);
        this.queue.installPlugin(createjs.Sound);
        this.queue.on("progress", this.progress, this);
        this.queue.on("complete", callback, this.parent);
        this.queue.on("error", this.error, this);
        this.queue.loadManifest("data/preloadManifest.json");
        //this.queue.loadManifest({src:"js/preloadManifest.json", type:"manifest"})
    },
    error:function(e){
        console.error(e)
    },
    progress:function(e){
        this.loadText.text= Math.round(e.progress*100)+"% done";
        this.parent.stage.update();
    }
};
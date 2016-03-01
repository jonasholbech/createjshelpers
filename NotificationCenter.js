// Could be a singleton, training the prototype chain
function NotificationCenter(x,y,width,height) {
    this.limit=4;
    this.notifications = [];
    this.container = new createjs.Container();
    this.container.x=x;
    this.container.y=y;
    this.textWidth=width-20;
    this.textHeight=height;
    stage.addChild(this.container);
}

// Add a couple of methods to NotificationCenter.prototype
NotificationCenter.prototype.add = function(message){
    var shape, text, container;
    shape = new createjs.Shape();
    shape.graphics.beginFill("#FFF");
    shape.graphics.drawRoundRect(0,0,this.textWidth,this.textHeight,4);
    shape.x=0; shape.y=0;
    text = new createjs.Text(message, "18px Calibri", "#808080");
    text.x=10;
    text.y=this.textHeight/2;

    text.textBaseline="middle";
    container = new createjs.Container();
    //this.container.addChild(container);
    container.addChild(shape);
    container.addChild(text);
    container.key=message+"_"+Math.random();
    container.on('click',this.close.bind(this));
    //console.log(container);
    this.notifications.push(container);
    this.showNotifications();

};
NotificationCenter.prototype.showNotifications = function(){
    this.container.removeAllChildren();
    var i, limit, yPos=0;
    limit=this.limit;
    if(this.limit>this.notifications.length){
        limit=this.notifications.length;
    }
    for(i=0; i<limit; i++){
        this.notifications[i].y=yPos;
        yPos+= 40;
        this.container.addChild(this.notifications[i]);

    }
};
NotificationCenter.prototype.close = function(e){
    var i;
    console.log(e.currentTarget);
    for(i=0; i<this.notifications.length; i++){
        //console.log(this.notifications[i]);

        if(this.notifications[i].key == e.currentTarget.key) {
            this.container.removeChild(e.currentTarget);
            this.notifications.splice(i,1);
            break;

        }
    }
    this.showNotifications();
};
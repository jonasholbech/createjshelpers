var Player = function (name, controller, playedPosition) {
    console.log(playedPosition)
    'use strict';
    var my = {}
    var i;
    my.controller=controller;
    my.name=name;
    my.hand=[]
    my.deck=[]
    my.discards=[]
    my.activeCard=null;
    my.lives=10
    my.played=[]//on table
    my.zone=new createjs.Container()//the table in front
    my.zone.played=new createjs.Container()
    my.zone.hand=new createjs.Container()
    my.zone.addChild(my.zone.played, my.zone.hand)
    if(playedPosition){
        my.zone.hand.y=0;
        my.zone.played.y=200;
    } else {
        my.zone.hand.y=200;
        my.zone.played.y=0;
    }
    my.buildDeck=function(numCards){
        var i,t;
        for(i=0; i<numCards; i++){
            t = new Card(Utils.getRandomInt(1,9),Utils.getRandomInt(1,9), my.controller.settings)
            my.deck.push(t)
        }
    }
    //PHASES
    my.draw=function(num){
        my.showHand()

        var i,t;
        if(num==undefined){
            num=1
        }
        for(i=0; i<num; i++){
            if(my.hand.length>4){
                my.discards.push(my.deck.pop())
                console.log("too many cards, discarded a card")
            } else {
                t=my.deck.pop()
                my.zone.hand.addChild(t)
                t.x=Game.stage.canvas.width+300
                t.rotation=200
                createjs.Tween.get(t).to(
                    {
                        x:my.hand.length*(my.controller.settings.cardWidth+my.controller.settings.cardOffset),
                        rotation:0,
                        y:0
                    }, 500+(500*1))
                my.hand.push(t)
                console.log("drew a card")
            }
        }

        //remove "summoning sickness"
        for(i=0; i<my.played.length; i++){
            my.played[i].wakeUp();
        }
    }
    my.castPhase=function(){
        var i;
        for(i=0; i<my.hand.length; i++){
            my.hand[i].on("click", my.castSpell)
        }
    }
    my.attackPhase=function(){
        var i;
        my._removeEventListeners()
        for(i=0; i<my.played.length; i++){
            if(my.played[i].ready){
                my.played[i].on("click", my.attack)
            }
        }
    }
    my.discardPhase=function(){
        var i;
        my._removeEventListeners()
        for(i=0; i<my.hand.length; i++){
            my.hand[i].on("click", my.discard)
        }

    }
    my.cleanUpPhase=function(){
        my._removeEventListeners()
        my.hideHand()
    }

    //PHASE ACTIONS
    my.castSpell=function(e){

        var c = e.currentTarget;
        console.log(c, my)
        var t=my.hand.splice(my.hand.indexOf(c),1)[0]
        console.log(t)

        var newY = playedPosition ? 200 : -200;
        createjs.Tween.get(t).to(
            {
                y:newY,
                x:my.played.length*(my.controller.settings.cardWidth+my.controller.settings.cardOffset)
            }, 500).call(function(){
                my.zone.hand.removeChild(t)
                my.zone.played.addChild(t)
                t.y=0
            })

        my.played.push(t)
        t.sleep()
        console.log("played a card")
        Game.nextPhase();
    }

    my.attack=function(e){
        var c = e.currentTarget;
        console.log(c)
        if(my.activeCard==c){
            c.alpha=1;
            my.activeCard=null;
        } else {
            my.activeCard=c;
            c.alpha=0.8
            //TODO EL på opponent etc, slet ikke lavet
        }



    }
    my.discard=function(e){
        var c = e.currentTarget;
        my.hand.splice(my.hand.indexOf(c, 1))
        Game.nextPhase();
    }
    //HELPERS
    my.showHand=function(){
        //TODO re layout cards
        my.zone.hand.alpha=1
        my._layoutHand()
    }
    my.hideHand=function(){
        my.zone.hand.alpha=0
    }
    my._layoutHand=function(){
        var posX= 0, i
        my.zone.hand.removeAllChildren()
        for(i=0; i<my.hand.length; i++){
            my.hand[i].x=posX
            posX+=(my.controller.settings.cardWidth+my.controller.settings.cardOffset)
            my.zone.hand.addChild(my.hand[i])
        }
    }
    my._removeEventListeners=function(){
        var i;
        for(i=0; i<my.hand.length; i++){
            my.hand[i].removeAllEventListeners("click");
        }
        for(i=0; i<my.played.length; i++){
            my.played[i].removeAllEventListeners("click");
        }
    }
    return my;
};
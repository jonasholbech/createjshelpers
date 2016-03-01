//None of this is tested
Function.prototype.method = function(name, func) {
    this.prototype[name]=func;
    return this;
};
Number.method('integer', function(){
    return Math[this < 0 ? 'ceiling' : 'floor'](this)
});
String.method('trim', function(){
    return this.replace(/^\s+|\s+$/g, '');
});

//SAME AS (WITHOUT THE FIRST HELPER)
/*
Number.prototype.integer=function(){
    return Math[this < 0 ? 'ceiling' : 'floor'](this)
}*/
//Ikke testet
var walk_the_DOM = function(node, func){
    func(node);
    node = node.firstChild;
    while(node){
        walk_the_dom(node,func);
        node=node.nextSibling;
    }
}

var fade = function(node){
    var level=1;
    var step=function(){
        var hex=level.toString(16)
        node.style.backgroundColor='#FFFF'+hex+hex
        if(level <15){
            level+=1
            setTimeout(step, 100)
        }
    };
    setTimeout(step, 100)
};

//fade(document.body)

String.method('deentityfy', function(){
    //the entity table
    var entity = {
        quot: '"',
        lt: '<',
        gt: '>'
    };
    //return the deentityfy method
    return function(){
        return this.replace(/&([^&;]+);/g, 
            function(a,b){
                var r=entity[b];
                return typeof r === 'string' ? r : a
            }               
                           );
    }
}());//closure, exucute imediately
//'&lt;&gt;'.deentityfy()

var constructor = function(spec, my){
    //private vars, not available outside
    var that, private="test", stuff;
    my = my || {}
    //public
    that = {
        name:'Jonas',
        hobby:'code'
    }
    //public
    that.speak=function(){
        console.log(private + this.name + " likes" + this.hobby);//what about that, private & stuff in here
        
    }
    return that;
}
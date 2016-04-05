"use strict";
console.log("Database loaded");
var Database = {
    storageAvailable:function(type) {
        try {
            var storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return false;
        }
    },
    init:function(){
        if (this.storageAvailable('localStorage')) {
            // Yippee! We can use localStorage awesomeness
        }
        else {
            throw new Error('Localstorage doesn\'t work in this browser!');
        }
    },
    get:function(key){
        if(!key){
            throw new Error('You must pass key to Get!');
        }
        return localStorage.getItem(key);
    },
    set:function(key, value){
        if(!key ){
            throw new Error('You must pass key/value to set!');
        }
        localStorage.setItem(key, value);
    },
    delete:function(key){
        if(!key){
            throw new Error('You must pass key to delete!');
        } else {
            //TODO recursive & objects
            if(Array.isArray(key)){
                for(var i=0, len=key.length; i<len; i++){
                    localStorage.removeItem(key[i]);
                }
            } else {
                localStorage.removeItem(key);
            }
        }
    },
    escape:function(item){
        return JSON.stringify(item);
    },
    unescape:function(item){
        return JSON.parse(item);
    },
    drop:function(){
        localStorage.clear();
    }
};
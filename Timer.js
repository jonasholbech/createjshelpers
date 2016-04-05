"use strict"
function Timer(callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function() {
        window.clearTimeout(timerId);
        remaining -= new Date() - start;
        return remaining;
    };

    this.resume = function() {
        start = new Date();
        window.clearTimeout(timerId);
        timerId = window.setTimeout(callback, remaining);
    };

    this.resume();
}
/*
var timer = new Timer(function() {
    alert("Done!");
}, 1000);

timer.pause();
// Do some stuff...
timer.resume();
    */
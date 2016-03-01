//Basic JS protochain inheritance
function Unit(alignment,tile) {
    this.tile = tile;
    this.alignment=alignment;
}

// Add a couple of methods to Unit.prototype
Unit.prototype.move = function(){
    console.log("I am moving!");
};
Unit.prototype.draw = function(){
    console.log("Hello, I'm " + this.alignment);
};

//Extends Unit
function Soldier(alignment, tile, damage) {
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    Unit.call(this, alignment, tile);

    // Initialize our Soldier-specific properties
    this.damage = damage;
}

// Create a Soldier.prototype object that inherits from Unit.prototype.
// Note: A common error here is to use "new Unit()" to create the
// Unit.prototype.
Soldier.prototype = Object.create(Unit.prototype);

// Set the "constructor" property to refer to Soldier
Soldier.prototype.constructor = Soldier;

// Replace the "move" method
Soldier.prototype.move = function(){
    console.log("Hello, I'm " + this.alignment + ". I'm moving and does "+this.damage);
};

// Add a "sayGoodBye" method
Soldier.prototype.sayGoodBye = function() {
    console.log("Goodbye!");
};
//console.log(soldier1 instanceof Unit);  // true
//console.log(soldier1 instanceof Soldier); // true
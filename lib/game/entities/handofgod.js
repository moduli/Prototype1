ig.module(
	'game.entities.handofgod' // name of module (lib/game/entities/bush.js)
)
.requires(
	'impact.entity'	// base entity class
)
.defines(function(){
   
EntityHandofgod = ig.Entity.extend({
	//-----------------------------
	//
	// VARIABLES
	//
	//-----------------------------
    name: "handofgod",

    size: {x:64, y:64},
	animSheet: new ig.AnimationSheet( 'media/demo/handofgod.png', 64, 64),    
    zIndex: 80,	// put below UI (100)
    
    type: ig.Entity.TYPE.B,
    collides: ig.Entity.COLLIDES.PASSIVE,
    checkAgainst: ig.Entity.TYPE.A,

    speed: 200,
 
    targetX: 0,
    targetY: 0,

    //-----------------------------
	//
	// INIT
	//
	//-----------------------------
    init: function( x, y, settings ) {
		// call animation "idle"
		// display each frame for 1 second
		// stay on first tile (no animation)
		this.addAnim( 'idle', 1, [0] );		

    	// required call
		this.parent( x, y, settings );

        // initialize x and y to starting position
        this.targetX = x;
        this.targetY = y;
	},
    
    //-----------------------------
	//
	// UPDATE
	//
	//-----------------------------
    update: function() {
        /*
        // FOLLOW MOUSE POSITION
    	delta_x = Math.round((ig.input.mouse.x + ig.game.screen.x - this.pos.x - this.size.x/2));
        delta_y = Math.round((ig.input.mouse.y + ig.game.screen.y - this.pos.y - this.size.y/2));
        
        if (delta_x)
            vel_x = this.speed * Math.cos(Math.abs(Math.atan(delta_y / delta_x))) * (delta_x / Math.abs(delta_x));
        else
            vel_x = 0;
        if (delta_y) 
            vel_y = this.speed * Math.sin(Math.abs(Math.atan(delta_y / delta_x))) * (delta_y / Math.abs(delta_y)); 
        else
            vel_y = 0;

        this.vel.x = vel_x;
        this.vel.y = vel_y;

        document.getElementById("mousex").innerHTML = ig.input.mouse.x;
        document.getElementById("mousey").innerHTML = ig.input.mouse.y;
        document.getElementById("posx").innerHTML = this.pos.x;
        document.getElementById("posy").innerHTML = this.pos.y;
        document.getElementById("deltax").innerHTML = delta_x;
        document.getElementById("deltay").innerHTML = delta_y;
        */


        // NAVIGATE TO RIGHT CLICK
        if (ig.input.pressed('rightclick')) {
            this.targetX = ig.input.mouse.x + ig.game.screen.x - this.size.x/2;
            this.targetY = ig.input.mouse.y + ig.game.screen.y - this.size.y/2;
        }

        delta_x = this.targetX - this.pos.x;
        delta_y = this.targetY - this.pos.y;
        
        if (delta_x) {
            this.vel.x = this.speed * Math.cos(Math.abs(Math.atan(delta_y / delta_x))) * (delta_x / Math.abs(delta_x));    
        }
        else
            this.vel.x = 0;

        if (delta_y) {
            this.vel.y = this.speed * Math.sin(Math.abs(Math.atan(delta_y / delta_x))) * (delta_y / Math.abs(delta_y));             
        }    
        else
            this.vel.y = 0;

        if (!Math.round(delta_x) && !Math.round(delta_y)) {
            this.pos.x = this.targetX;
            this.pos.y = this.targetY;
            this.vel.x = 0;
            this.vel.y = 0;
        }

        document.getElementById("targetx").innerHTML = this.targetX;
        document.getElementById("targety").innerHTML = this.targetY;
        document.getElementById("posx").innerHTML = this.pos.x;
        document.getElementById("posy").innerHTML = this.pos.y;
        document.getElementById("deltax").innerHTML = delta_x;
        document.getElementById("deltay").innerHTML = delta_y;
    
        // required call
        this.parent();
    },

    //-----------------------------
	//
	// CHECK ENTITY v ENTITY COLLISION
	//
	//-----------------------------
	// called when entity overlaps with another entity 
	// (and other matches checkAgainst property)
    check: function(other) {
    }
});

});
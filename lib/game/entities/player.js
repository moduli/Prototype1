//-----------------------------
//
// PLAYER.JS
//
//-----------------------------
ig.module(
	'game.entities.player' // name of module (lib/game/entities/player.js)
)
//-----------------------------
//
// INCLUDES
//
//-----------------------------
.requires(
	'impact.entity',

	'plugins.box2d.entity'
)
//-----------------------------
//
// DEFINITION
//
//-----------------------------
.defines(function(){

EntityPlayer = ig.Entity.extend({
	//-----------------------------
	//
	// VARIABLES
	//
	//-----------------------------
	name: "player",
	health: 100,
	
	size: {x:16, y:16},
	animSheet: new ig.AnimationSheet( 'media/player.png', 16, 16 ),
	zIndex: 80,						// put below UI (100)

	collides: ig.Entity.COLLIDES.PASSIVE, // will not bounce back when collide
	checkAgainst: ig.Entity.TYPE.A,		// flower is set to TYPE.A
	
    //type: ig.Entity.TYPE.A,
    //checkAgainst: ig.Entity.TYPE.NONE,
    //collides: ig.Entity.COLLIDES.NEVER,

	//-----------------------------
	//
	// INIT
	//
	//-----------------------------
	init: function( x, y, settings ) {
		// call parent constructor
		this.parent( x, y, settings );
		
		// ==================
		// DEFINE ANIMATIONS
		// ==================
		this.addAnim('idle', 1, [0] );	// 1 fps, play frame 1
		this.addAnim('up', 0.2, [3, 4, 3, 5])
		this.addAnim('down',0.2,[0, 1, 0, 2])
		this.addAnim('left', 0.2, [6, 7, 6, 8])
		this.addAnim('right', 0.2, [9, 10, 9, 11])
	},
	
	//-----------------------------
	//
	// UPDATE
	//
	//-----------------------------
	update: function() {
		// ==================
		// PLAYER MOVEMENT
		// ==================
		// if button is pressed, move in that direction
		if( ig.input.state('up') ) {
			// move object up
			this.vel.y = -100;
			this.currentAnim = this.anims.up;
		}
		if( ig.input.state('down') ) {
			this.vel.y = 100;
			this.currentAnim = this.anims.down;
		}
		if( ig.input.state('left') ) {
			this.vel.x = -100;
			this.currentAnim = this.anims.left;
		}
		if( ig.input.state('right') ) {
			this.vel.x = 100;
			this.currentAnim = this.anims.right;
		}
		
		// stop movement if button is released
		// two different if statements to prevent constant diagonal movement
		if (!(ig.input.state('up') || ig.input.state('down'))) {
			this.vel.y = 0;
		}
		if (!(ig.input.state('left') || ig.input.state('right'))) {
			this.vel.x = 0;
		}

		// default animation
		if (!(ig.input.state('up') || ig.input.state('down') || ig.input.state('left') || ig.input.state('right'))) {
			this.currentAnim = this.anims.idle;
		}


		
		// required
		this.parent();
	},
	
	//-----------------------------
	//
	// CHECK ENTITY v ENTITY COLLISION
	//
	//-----------------------------
	// called when entity overlaps with another entity (and other matches checkAgainst property)
	check: function(other) {
		
		if (other.name == "flower") {
			other.pickup();
			
			this.health -= 5;
			ig.game.score +=1;
			
		}

		if (other.name == "bush") {
			
			
		}

		if (other.name == "box") {
			
		}
	}
});

});
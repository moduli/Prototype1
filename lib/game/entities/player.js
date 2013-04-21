//-----------------------------
//
// PLAYER.JS
//
//-----------------------------
ig.module(
	'game.entities.player'
)
//-----------------------------
//
// INCLUDES
//
//-----------------------------
.requires(
	'impact.entity'
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
	
	size: {x:64, y:64},
	animSheet: new ig.AnimationSheet('media/demo/player.png', 64, 64),
	zIndex: 80, // put below UI (100)

	type: ig.Entity.TYPE.B,
	collides: ig.Entity.COLLIDES.PASSIVE,
	checkAgainst: ig.Entity.TYPE.A,		// TYPE A is for objects that player collides with

	first_touch: false,

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
		this.addAnim('up', 0.2, [3, 4, 3, 5]);
		this.addAnim('down',0.2,[0, 1, 0, 2]);
		this.addAnim('left', 0.2, [6, 7, 6, 8]);
		this.addAnim('right', 0.2, [9, 10, 9, 11]);
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
			//current_vel = this.body.GetLinearVelocity();
			//this.body.SetLinearVelocity(new b2.Vec2(current_vel.x,-10));
			this.currentAnim = this.anims.up;
		}
		if( ig.input.state('down') ) {
			this.vel.y = 100;
			//current_vel = this.body.GetLinearVelocity();
			//this.body.SetLinearVelocity(new b2.Vec2(current_vel.x,10));
			this.currentAnim = this.anims.down;
		}
		if( ig.input.state('left') ) {
			this.vel.x = -100;
			//current_vel = this.body.GetLinearVelocity();
			//this.body.SetLinearVelocity(new b2.Vec2(-10, current_vel.y));
			this.currentAnim = this.anims.left;
		}
		if( ig.input.state('right') ) {
			this.vel.x = 100;
			//current_vel = this.body.GetLinearVelocity();
			//this.body.SetLinearVelocity(new b2.Vec2(10, current_vel.y));
			this.currentAnim = this.anims.right;
		}
		
		// stop movement if button is released
		// two different if statements to prevent constant diagonal movement
		if (!(ig.input.state('up') || ig.input.state('down'))) {
			this.vel.y = 0;
			//current_vel = this.body.GetLinearVelocity();
			//this.body.SetLinearVelocity(new b2.Vec2(current_vel.x, 0));
		}
		if (!(ig.input.state('left') || ig.input.state('right'))) {
			this.vel.x = 0;
			//current_vel = this.body.GetLinearVelocity();
			//this.body.SetLinearVelocity(new b2.Vec2(0, current_vel.y));
		}

		// default animation
		if (!(ig.input.state('up') || ig.input.state('down') || ig.input.state('left') || ig.input.state('right'))) {
			this.currentAnim = this.anims.idle;
		}

		// stop body from spinning
		// set body's rotational velocity to 0
		//this.body.SetXForm(this.body.GetPosition(), 0);
		


		// ==================
		// PLAYER HIGHLIGHTED BY CURSOR
		// ==================
		var cursor = ig.game.getEntityByName("cursor");
		if (this.touches(cursor)) {
			if (!this.first_touch) {
				this.first_touch = true;

				this.animSheet = new ig.AnimationSheet('media/demo/player.png', 32, 32);
				this.addAnim('idle', 1, [0] );	// 1 fps, play frame 1
				this.addAnim('up', 0.2, [3, 4, 3, 5]);
				this.addAnim('down',0.2,[0, 1, 0, 2]);
				this.addAnim('left', 0.2, [6, 7, 6, 8]);
				this.addAnim('right', 0.2, [9, 10, 9, 11]);
			}
 		}		
		else {
			if (this.first_touch) {
				this.first_touch = false;

				this.animSheet = new ig.AnimationSheet('media/demo/player.png', 32, 32);
				this.addAnim('idle', 1, [0] );	// 1 fps, play frame 1
				this.addAnim('up', 0.2, [3, 4, 3, 5]);
				this.addAnim('down',0.2,[0, 1, 0, 2]);
				this.addAnim('left', 0.2, [6, 7, 6, 8]);
				this.addAnim('right', 0.2, [9, 10, 9, 11]);
			}
 		}


		// ==================
		// PLAYER DEATH
		// ==================
		if (this.health == 0) {

		}

		// required
		this.parent();
		var player = this;
		ig.game.screen.x = player.pos.x - (-player.size.x + ig.system.width)/2;
		ig.game.screen.y = player.pos.y - (-player.size.y + ig.system.height)/2;
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
			this.health -= 5;
			other.kill();
		}

		if (other.name == "box") {
			
		}
	},

	//-----------------------------
	//
	// DAMAGE
	//
	//-----------------------------
	takeDamage: function(dmg) {
		this.health -= dmg;
	}

});

});
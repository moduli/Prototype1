//-----------------------------
//
// BADGUY.JS
//
//-----------------------------
ig.module(
	'game.entities.badguy'
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

EntityBadguy = ig.Entity.extend({
	//-----------------------------
	//
	// VARIABLES
	//
	//-----------------------------
	name: "badguy",
	health: 100,
	
	size: {x:32, y:32},
	animSheet: new ig.AnimationSheet('media/enemy.png', 32, 32),
	zIndex: 81, // put below UI (100)

	type: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,
	checkAgainst: ig.Entity.TYPE.BOTH,

	speed: 75,
	active_mode: false,
	active_counter: 0,
	aggro_dist: 150,
	charge_counter: 0,
	charge_length: 100,

	attack: 10,
	targetlock_x: 0,
	targetlock_y: 0,
	startlock_x: 0,
	startlock_y: 0,

	//-----------------------------
	//
	// INIT
	//
	//-----------------------------
	init: function( x, y, settings ) {		
		// ==================
		// DEFINE ANIMATIONS
		// ==================
		this.addAnim('idle', 1, [0] );	// 1 fps, play frame 1

		this.target = ig.game.getEntityByName("player");

		// call parent constructor
		this.parent( x, y, settings );
	},
	
	//-----------------------------
	//
	// UPDATE
	//
	//-----------------------------
	update: function() {
		delta_y = (this.target.pos.y - this.pos.y);
        delta_x = (this.target.pos.x - this.pos.x);
        magnitude = Math.sqrt(
			Math.pow(delta_x, 2) + 
			Math.pow(delta_y, 2)
		);

        if (!this.targetlock_x && !this.targetlock_y) {
        	// if player is within a certain distance of enemy
			if (magnitude <= this.aggro_dist) {
				this.active_mode = true;
			}
			else {
				this.active_mode = false;
				this.active_counter = 0;
			}

			if (this.active_mode) {
				this.vel.x = 0;
				this.vel.y = 0;
				this.active_counter++;
			}
			else {
				this.vel.x = 0;
				this.vel.y = 0;
			}

			if (this.active_counter >= 100) {
				this.targetlock_x = this.target.pos.x;
				this.targetlock_y = this.target.pos.y;
				this.startlock_x = this.pos.x;
				this.startlock_y = this.pos.y;

			}
        }
        else {
        	if (this.charge_counter >= this.charge_length) {
        		this.targetlock_x = 0;
        		this.targetlock_y = 0;
        		this.active_counter = 0;
        		this.charge_counter = 0;
        		this.vel.x = 0;
        		this.vel.y = 0;
        	}

        	dely = (this.targetlock_y - this.startlock_y);
       		delx = (this.targetlock_x - this.startlock_x);
        	if (dely) 
	        	this.vel.y = this.speed * Math.sin(Math.abs(Math.atan(dely / delx))) * (dely / Math.abs(dely)); 
	        else
	        	this.vel.y = 0;
	        if (delx)
	        	this.vel.x = this.speed * Math.cos(Math.abs(Math.atan(dely / delx))) * (delx / Math.abs(delx));
	        else
	        	this.vel.x = 0;
	        this.charge_counter ++;
        }

		// killed
		if (this.health <= 0) {
			this.kill();
		}
			
        this.parent();
	},
	
	//-----------------------------
	//
	// CHECK ENTITY v ENTITY COLLISION
	//
	//-----------------------------
	// called when entity overlaps with another entity (and other matches checkAgainst property)
	check: function(other) {	
		if (other.name == "bullet") {
			this.health -= 10;
		}

		if (other.name == "player") {
			other.takeDamage(this.attack);
		}
	},


});

});
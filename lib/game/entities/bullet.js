ig.module(
	'game.entities.bullet'
)
.requires(
	'impact.entity',

	'plugins.box2d.entity'
)
.defines(function() {

EntityBullet = ig.Box2DEntity.extend({
	//-----------------------------
	//
	// VARIABLES
	//
	//-----------------------------
    name: "bullet",

    size: {x:4, y:4},
	animSheet: new ig.AnimationSheet( 'media/white_box.png', 4, 4 ),    
    zIndex: 79,
    
    //type: ig.Entity.TYPE.A,
    //checkAgainst: ig.Entity.TYPE.A,
    //collides: ig.Entity.COLLIDES.PASSIVE,
    type: ig.Entity.TYPE.B,
    collides: ig.Entity.COLLIDES.NEVER,
    checkAgainst: ig.Entity.TYPE.NONE,

    //speed: 500,
    speed: 5,

    timer: 0,

    //-----------------------------
	//
	// INIT
	//
	//-----------------------------
    init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// call animation "idle"
		// display each frame for 1 second
		// stay on first tile (no animation)
		this.addAnim( 'idle', 1, [0] );

		this.maxVel.x = 1000;
		this.maxVel.y = 1000;

		delta_y = (settings.clicked_pos.y - this.pos.y);
		delta_x = (settings.clicked_pos.x - this.pos.x);
		
		vel_y = this.speed * Math.sin(Math.abs(Math.atan(delta_y / delta_x))) * (delta_y / Math.abs(delta_y)); 
		vel_x = this.speed * Math.cos(Math.abs(Math.atan(delta_y / delta_x))) * (delta_x / Math.abs(delta_x));

		this.body.ApplyImpulse( new b2.Vec2(vel_x, vel_y), this.body.GetPosition() );
	},
    
    //-----------------------------
	//
	// UPDATE
	//
	//-----------------------------
    update: function() {
    	if (this.timer >= 20) {
    		this.kill();
    	}
    	this.timer++;
    
        this.parent();
    },

    //-----------------------------
	//
	// COLLISION
	//
	//-----------------------------
    check: function(other) {
    	if (other.name == "bush") {
    		this.kill();
    		other.hitByBullet();
    	}
    	else {
    		this.kill();
    	}        
    },
    handleMovementTrace: function(res) {
    	// ignore static collision (walls)
    	this.pos.x += this.vel.x * ig.system.tick;
    	this.pos.y += this.vel.y * ig.system.tick;
    }
});

});
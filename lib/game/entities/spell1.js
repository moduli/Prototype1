ig.module(
	'game.entities.spell1'
)
.requires(
	'impact.entity'
)
.defines(function() {

EntitySpell1 = ig.Entity.extend({
	//-----------------------------
	//
	// VARIABLES
	//
	//-----------------------------
    name: "spell1",
	
    size: {x:32, y:32},
	animSheet: new ig.AnimationSheet( 'media/red_box.png', 32, 32 ),    
    zIndex: 79,
    
    type: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.NEVER,
    checkAgainst: ig.Entity.TYPE.A,

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
	},
    
    //-----------------------------
	//
	// UPDATE
	//
	//-----------------------------
    update: function() {
        
        this.parent();
    },

    mouseReleased: function () {
    	this.kill();

    },

    //-----------------------------
	//
	// CHECK
	//
	//-----------------------------
    check: function(other) {
        if (other.name == "bush") {
			delta_y = (player.pos.y - other.pos.y);
	        delta_x = (player.pos.x - other.pos.x);
	        if (delta_y)
	        	vel_y = -500 * other.speed * Math.sin(Math.abs(Math.atan(delta_y / delta_x))) * (delta_y / Math.abs(delta_y)); 
	        else
	        	vel_y = 0;
	        if (delta_x)
	        	vel_x = -500 * other.speed * Math.cos(Math.abs(Math.atan(delta_y / delta_x))) * (delta_x / Math.abs(delta_x));
	        else
	        	vel_x = 0;
	        //this.accel.x = vel_x;
	        //this.accel.y = vel_y;
	        //other.body.SetLinearVelocity(new b2.Vec2(0,0));
	        other.body.ApplyForce( new b2.Vec2(vel_x, vel_y), other.body.GetPosition() );  
        }
    },


});


});
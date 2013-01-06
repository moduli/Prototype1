ig.module(
	'game.entities.spell2'
)
.requires(
	'impact.entity'
)
.defines(function() {

EntitySpell2 = ig.Entity.extend({
	//-----------------------------
	//
	// VARIABLES
	//
	//-----------------------------
    name: "spell2",
	
    size: {x:32, y:32},
	animSheet: new ig.AnimationSheet( 'media/purple_box.png', 32, 32 ),    
    zIndex: 79,
    
    type: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.NEVER,
    checkAgainst: ig.Entity.TYPE.A,

    speed: 100,
    timer: 0,
    timer_length: 50,

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

		delta_x = settings.end_pos[0]-settings.init_pos[0];		
		delta_y = settings.end_pos[1]-settings.init_pos[1];
		vel_x = this.speed * Math.cos(Math.abs(Math.atan(delta_y / delta_x))) * (delta_x / Math.abs(delta_x));
		vel_y = this.speed * Math.sin(Math.abs(Math.atan(delta_y / delta_x))) * (delta_y / Math.abs(delta_y)); 
		this.vel.x = vel_x;
        this.vel.y = vel_y;
	},
    
    //-----------------------------
	//
	// UPDATE
	//
	//-----------------------------
    update: function() {
        if (this.timer >= this.timer_length) {
    		this.kill();
    	}
    	this.timer++;
    
        this.parent();
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
	        vel_y = -500 * other.speed * Math.sin(Math.abs(Math.atan(delta_y / delta_x))) * (delta_y / Math.abs(delta_y)); 
	        vel_x = -500 * other.speed * Math.cos(Math.abs(Math.atan(delta_y / delta_x))) * (delta_x / Math.abs(delta_x));
	        //this.accel.x = vel_x;
	        //this.accel.y = vel_y;
	        //other.body.SetLinearVelocity(new b2.Vec2(0,0));
	        other.body.ApplyForce( new b2.Vec2(vel_x, vel_y), other.body.GetPosition() );  

			
		
        }
    },


});


});
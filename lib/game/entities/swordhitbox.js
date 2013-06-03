ig.module(
	'game.entities.swordhitbox'
)
.requires(
	'impact.entity'
)
.defines(function() {

EntitySwordhitbox = ig.Entity.extend({
	//-----------------------------
	//
	// VARIABLES
	//
	//-----------------------------
    name: "swordhitbox",
	
    size: {x:44, y:12},
	animSheet: new ig.AnimationSheet( 'media/red_box.png', 44, 32 ),    
    zIndex: 79,
    
    type: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.NEVER,
    checkAgainst: ig.Entity.TYPE.A,
	swingtimer: 5,
	
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
		this.addAnim( 'idle', 1, [0] )
		this.currentAnim.angle = player.ld * Math.PI/180;
		this.pos.x = player.pos.x + 8 - 22 + this.swingtimer * 3 * Math.sin(this.currentAnim.angle)
		this.pos.y = player.pos.y + 12 - 16 - this.swingtimer * 3 * Math.cos(this.currentAnim.angle)

	},
    
    //-----------------------------
	//
	// UPDATE
	//
	//-----------------------------
    update: function() {
        this.parent();
		this.swingtimer++;
		if (this.swingtimer > 15)
			this.kill();
		this.pos.x = player.pos.x + 8 - 22 + this.swingtimer * 3 * Math.sin(this.currentAnim.angle)
		this.pos.y = player.pos.y + 12 - 16 - this.swingtimer * 3 * Math.cos(this.currentAnim.angle)
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
        vel_y = -50 * other.speed * Math.sin(Math.abs(Math.atan(delta_y / delta_x))) * (delta_y / Math.abs(delta_y)); 
        vel_x = -50 * other.speed * Math.cos(Math.abs(Math.atan(delta_y / delta_x))) * (delta_x / Math.abs(delta_x));
        //this.accel.x = vel_x;
        //this.accel.y = vel_y;
        //other.body.SetLinearVelocity(new b2.Vec2(0,0));
        other.body.ApplyForce( new b2.Vec2(vel_x, vel_y), other.body.GetPosition() );
        }
    },


});


});
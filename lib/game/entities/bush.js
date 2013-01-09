ig.module(
	'game.entities.bush' // name of module (lib/game/entities/bush.js)
)
.requires(
	'impact.entity'
)
.defines(function(){
   
EntityBush = ig.Entity.extend({
    //-----------------------------
    //
    // VARIABLES
    //
    //-----------------------------
    name: "bush",

    size: {x:16, y:16},
	animSheet: new ig.AnimationSheet( 'media/bush.png', 16, 16 ),    
    zIndex: 81,

    //type: ig.Entity.TYPE.A,
    //collides: ig.Entity.COLLIDES.PASSIVE,
    type: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,
    checkAgainst: ig.Entity.TYPE.NONE,

    speed: 20,

    //-----------------------------
    //
    // INIT
    //
    //-----------------------------
    init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// call animation "idle"
		// displays each frame for 1 second
		// stay on first tile (no animation)
		this.addAnim( 'idle', 1, [0] );	

        player = ig.game.getEntityByName("player");	
	},
    
    //-----------------------------
    //
    // UPDATE
    //
    //-----------------------------
    update: function() {
        // object movement
        delta_y = (player.pos.y - this.pos.y);
        delta_x = (player.pos.x - this.pos.x);
        vel_y = this.speed * Math.sin(Math.abs(Math.atan(delta_y / delta_x))) * (delta_y / Math.abs(delta_y)); 
        vel_x = this.speed * Math.cos(Math.abs(Math.atan(delta_y / delta_x))) * (delta_x / Math.abs(delta_x));
        this.accel.x = vel_x;
        this.accel.y = vel_y;
        //this.body.SetLinearVelocity(new b2.Vec2(0,0));
        //this.body.ApplyForce( new b2.Vec2(vel_x, vel_y), this.body.GetPosition() );  

        // required function
        this.parent();
    },

    //-----------------------------
    //
    // UPDATE
    //
    //-----------------------------
    hitByBullet: function() {
        this.kill();

    }

		
});
});
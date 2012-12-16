ig.module(
	'game.entities.box'
)
.requires(
	'impact.entity',
	'plugins.box2d.entity'
)
.defines(function() {

EntityBox = ig.Box2DEntity.extend({
	//-----------------------------
	//
	// VARIABLES
	//
	//-----------------------------
    name: "box",

    size: {x:16, y:16},
	animSheet: new ig.AnimationSheet( 'media/brown_box.png', 16, 16 ),    
    zIndex: 81,
    
    type: ig.Entity.TYPE.B,
    collides: ig.Entity.TYPE.NONE,
	//collides: ig.Entity.COLLIDES.FIXED,

	dragged: false,
	drag_init_pos: null,

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
    	if (this.dragged) {

    	}
        
        this.parent();
    },

    //-----------------------------
	//
	// MOUSE
	//
	//-----------------------------
    // when mouse clicks object
    mouseClicked: function() {
    	// if mouse clicks within a certain area of the object, then do something
    	this.dragged = true;

   		cursor = ig.game.getEntitiesByType(EntityCursor);
   		this.drag_init_pos = [cursor[0].pos.x, cursor[0].pos.y];
    },
    mouseReleased: function () {
		this.dragged = false; 

		cursor = ig.game.getEntitiesByType(EntityCursor);
		drag_end_pos = [cursor[0].pos.x, cursor[0].pos.y];
		delta_y = drag_end_pos[1]-this.drag_init_pos[1];
		delta_x = drag_end_pos[0]-this.drag_init_pos[0];		
		magnitude = Math.sqrt(
			Math.pow(delta_x, 2) + 
			Math.pow(delta_y, 2)
		);
		vel_y = magnitude*50 * Math.sin(Math.abs(Math.atan(delta_y / delta_x))) * (delta_y / Math.abs(delta_y)); 
		vel_x = magnitude*50 * Math.cos(Math.abs(Math.atan(delta_y / delta_x))) * (delta_x / Math.abs(delta_x));

		this.body.ApplyForce( new b2.Vec2(vel_x, vel_y), this.body.GetPosition() );
    }
});

});
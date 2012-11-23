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
    
    //type: ig.Entity.TYPE.A,
    //collides: ig.Entity.COLLIDES.FIXED,
    type: ig.Entity.TYPE.B,
    collides: ig.Entity.COLLIDES.NEVER,
    checkAgainst: ig.Entity.TYPE.NONE,

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

    //-----------------------------
	//
	// MOUSE
	//
	//-----------------------------
    // when mouse clicks object
    mouseClicked: function() {
    	// if mouse clicks within a certain area of the object, then do something
    	//if (ig.input.mouse.x < this.pos)

    },
    mouseReleased: function () {


    }



});

});
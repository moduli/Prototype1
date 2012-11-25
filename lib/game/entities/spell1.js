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
    collides: ig.Entity.COLLIDES.FIXED,
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
    check: function() {
        
        
    },


});


});
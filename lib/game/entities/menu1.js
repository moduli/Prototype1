ig.module(
	'game.entities.menu1'
)
.requires(
	'impact.entity'
)
.defines(function() {

EntityMenu1 = ig.Entity.extend({
    //-----------------------------
    //
    // VARIABLES
    //
    //-----------------------------
    name: "menu1",

    size: {x:64, y:16},
	animSheet: new ig.AnimationSheet( 'media/grey_box.png', 64, 16 ),    
    zIndex: 90,
    type: ig.Entity.TYPE.B,
    
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
    	console.log("menu");

        

    }
});

});
ig.module(
	'game.entities.flower'
)
.requires(
	'impact.entity'
)
.defines( function() {

EntityFlower = ig.Entity.extend({
    //-----------------------------
    //
    // VARIABLES
    //
    //-----------------------------
    name: "flower",
    
    size: {x:8, y:8}, // size in pizels. used for collision detection and response
    offset: {x:4, y:4},
    animSheet: new ig.AnimationSheet( 'media/flower.png', 16, 16),  // width and height of one frame
    zIndex: 79,
    
    type: ig.Entity.TYPE.A,
    
    init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.addAnim('idle', 0.5, [0, 1, 2, 3, 2, 1]); // name of entity's animation, length of each animation, animation sequence
    },
    
    // function called when player overlaps flower entity
    pickup: function() {
        this.kill();    
    }
    
    
});


});
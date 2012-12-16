ig.module(
	'game.entities.cursor' // name of module (lib/game/entities/bush.js)
)
.requires(
	'impact.entity'	// base entity class
)
.defines(function(){
   
EntityCursor = ig.Entity.extend({
	//-----------------------------
	//
	// VARIABLES
	//
	//-----------------------------
    name: "cursor",

    size: {x:8, y:8},
	animSheet: new ig.AnimationSheet( 'media/green_box.png', 8, 8 ),    
    zIndex: 100,	// UI in front
    
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.B,	// TYPE B is for clickable UI elements

    clicked: false,
    holding: null,

    onMenu: false,

    //-----------------------------
	//
	// INIT
	//
	//-----------------------------
    init: function( x, y, settings ) {
    	// required call
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
    	// set cursor to mouse position
    	// "-4" to center object on mouse tip
		this.pos.x = ig.input.mouse.x - 4 + ig.game.screen.x;
		this.pos.y = ig.input.mouse.y - 4 + ig.game.screen.y;

		this.clicked = ig.input.pressed('click');

		//-----------------------------
		// ABILITY 1
		//-----------------------------
		//if (ig.input.pressed('click') && !this.onMenu) {
		if (ig.input.pressed('click') && ig.game.ability == 1) {
			player = ig.game.getEntityByName("player");
			clicked_pos = {x: this.pos.x, y: this.pos.y}

			ig.game.spawnEntity(EntityBullet, 
				player.pos.x + 6, 
				player.pos.y + 6, 
				{clicked_pos: clicked_pos}
			);

			// resort entities to use zIndex
			ig.game.sortEntitiesDeferred();
		}
		//-----------------------------
		// ABILITY 2
		//-----------------------------
		else if (ig.input.pressed('click') && ig.game.ability == 2) {
			player = ig.game.getEntityByName("player");

			ig.game.spawnEntity(EntitySpell1,
				player.pos.x - 8,
				player.pos.y - 8
			);

			// resort entities to use zIndex
			ig.game.sortEntitiesDeferred();
		}
		//-----------------------------
		// ABILITY 3
		//-----------------------------
		else if (ig.input.pressed('click') && ig.game.ability == 3) {

		}

		if (ig.input.released('click')) {
			// CLEAR ABILITY 2
			spell1 = ig.game.getEntitiesByType(EntitySpell1);	
			if (spell1.length != 0) {
				spell1[0].mouseReleased();
			}

			// CLEAR ABILITY 3
			if (this.holding) {
				this.holding.mouseReleased();
				this.holding = null;
			}
		}
        
        // required call
        this.parent();
    },

    //-----------------------------
	//
	// CHECK ENTITY v ENTITY COLLISION
	//
	//-----------------------------
	// called when entity overlaps with another entity 
	// (and other matches checkAgainst property)
    check: function(other) {
    	/*if (other.name == "menu1") {
    		this.onMenu = true;
    	}*/
    	// find way to reset this.onMenu

    	// clicked menu1
    	if (this.clicked && other.name == "menu1") {
    		other.mouseClicked();
    	}

    	if (this.clicked && other.name == "box" && ig.game.ability == 3) {
    		this.holding = other;
    		other.mouseClicked();	
    	}
    }
});

});
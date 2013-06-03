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
    drag_init_pos: null,

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

		//-----------------------------
		// MOUSE RELEASED
		//-----------------------------
		if (ig.input.released('leftclick')) {
			//-----------------------------
			// ABILITY 2
			//-----------------------------
			spell1 = ig.game.getEntitiesByType(EntitySpell1);	
			if (spell1.length != 0) {
				spell1[0].mouseReleased();
			}

			//-----------------------------
			// ABILITY 3
			//-----------------------------
			if (this.holding && ig.game.ability == 3) {
				drag_end_pos = [this.pos.x, this.pos.y];
				
				this.holding.mouseReleased(this.drag_init_pos, drag_end_pos);
				this.holding = null;
				this.drag_init_pos = null;
			}

			//-----------------------------
			// ABILITY 4
			//-----------------------------
			if (ig.game.ability == 4) {
				user = ig.game.getEntityByName("handofgod");
				drag_end_pos = [this.pos.x, this.pos.y];

				ig.game.spawnEntity(EntitySpell2, 
					user.pos.x + user.size.x/4, 
					user.pos.y + user.size.y/4,
					{
						init_pos: this.drag_init_pos,
						end_pos: drag_end_pos
					}
				);	
			}
		}

		//-----------------------------
		// MOUSE CLICKED
		//-----------------------------
		this.clicked = ig.input.pressed('leftclick');
		//-----------------------------
		// ABILITY 1
		//-----------------------------
		//if (ig.input.pressed('leftclick') && !this.onMenu) {
		if (ig.input.pressed('leftclick') && ig.game.ability == 1) {
			//player = ig.game.getEntityByName("player");
			user = ig.game.getEntityByName("handofgod");

			clicked_pos = {x: this.pos.x, y: this.pos.y};

			ig.game.spawnEntity(EntityBullet, 
				user.pos.x + user.size.x/2, 
				user.pos.y + user.size.y/2, 
				{clicked_pos: clicked_pos}
			);

			// resort entities to use zIndex
			ig.game.sortEntitiesDeferred();
		}
		//-----------------------------
		// ABILITY 2
		//-----------------------------
		else if (ig.input.pressed('leftclick') && ig.game.ability == 2) {
			//player = ig.game.getEntityByName("player");
			user = ig.game.getEntityByName("handofgod");

			ig.game.spawnEntity(EntitySpell1,
				user.pos.x + user.size.x/4, 
				user.pos.y + user.size.y/4
			);

			// resort entities to use zIndex
			ig.game.sortEntitiesDeferred();
		}
		//-----------------------------
		// ABILITY 3
		//-----------------------------
		else if (ig.input.pressed('leftclick') && ig.game.ability == 3) {
			// see check function (needs to click on a box)
		}
		//-----------------------------
		// ABILITY 4
		//-----------------------------
		else if (ig.input.pressed('leftclick') && ig.game.ability == 4) {
			this.drag_init_pos = [this.pos.x, this.pos.y];
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
    	// clicked menu1
    	if (this.clicked && other.name == "menu1") {
    		other.mouseClicked();
    	}

    	// clicked box
    	if (this.clicked && other.name == "box" && ig.game.ability == 3) {
    		this.holding = other;
    		this.drag_init_pos = [this.pos.x, this.pos.y];

    		other.mouseClicked();	
    	}
    }
});

});
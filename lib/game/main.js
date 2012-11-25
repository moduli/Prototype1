// ------------------
//
// Module Definition
//
// ------------------
ig.module( 
	// Name of module
	'game.main' 	// lib/game/main.js
)
.requires(
	'impact.game',	// lib/impact/game.js
	'impact.font',	// lib/impact/font.js
	
	// add entities
	'game.entities.player',
	'game.entities.cursor',
	'game.entities.bullet',
	'game.entities.spell1',
	
	'game.entities.flower',
	'game.entities.bush',
	'game.entities.box',
	
	'game.entities.menu1',
	
	// add levels
	'game.levels.main'
	
)
.defines(function(){
// ==============
//
// DEFINITION
//
// ==============

MyGame = ig.Game.extend({
	// game variables
	score: 0,
	ability: 1,
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	// Initialize your game here; bind keys etc.
	init: function() {
		// BIND KEYS
		ig.input.bind( ig.KEY.W, 'up' );
		ig.input.bind( ig.KEY.S, 'down' );
		ig.input.bind( ig.KEY.A, 'left' );
		ig.input.bind( ig.KEY.D, 'right' );

		ig.input.bind( ig.KEY.MOUSE1, 'click');
		ig.input.bind( ig.KEY.MOUSE2, 'click2');

		ig.input.bind( ig.KEY._1, 'action1');
		ig.input.bind( ig.KEY._2, 'action2');

		// MOUSE INIT
		ig.input.initMouse();
		
		// LOAD LEVEL
		this.loadLevel( LevelMain );
		
		ig.game.spawnEntity(EntityMenu1,
			ig.system.width - 2,
			ig.system.height - 2);
	},

	// Updates background layer positions
	// calls .update on each entity 
	// once update is done, .checkEntities is called to resolve dynamic collisions (entity vs entity)
	// also calls .check, if it overlays with another entity and wants checks
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		if (ig.input.pressed('action1')) {
			this.ability = 1;
		}
		if (ig.input.pressed('action2')) {
			this.ability = 2;
		}
	},
	
	// Clears screen and calls .draw on each background layer and entity
	draw: function() {

		// center player on screen
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if(player) {
			this.screen.x = player.pos.x - ig.system.width/2;
			this.screen.y = player.pos.y - ig.system.height/2;
		}


		// Draw all entities and backgroundMaps
		this.parent();
		
	
		// show player health
		this.font.draw(player.health, 2, 2, ig.Font.ALIGN.LEFT);
				
		// show score
		this.font.draw(this.score, ig.system.width-2, 2, ig.Font.ALIGN.RIGHT); // x position, y position
	}
});

// Start the Game with 60fps, a resolution of 320x320, scaled up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 320, 2);
});

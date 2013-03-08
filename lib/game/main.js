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
	// impact libraries
	'impact.game',	// lib/impact/game.js
	'impact.font',	// lib/impact/font.js
	'plugins.empika.debug_display', // for FPS debug
	// add entities
	'game.entities.player',
	'game.entities.cursor',
	'game.entities.bullet',
	'game.entities.spell1',
	'game.entities.spell2',
	'game.entities.flower',
	'game.entities.bush',
	'game.entities.box',
	'game.entities.menu1',
	'game.entities.badguy',
	
	// add levels
	'game.levels.main',
	'game.levels.main2',
	
	// physics engine
	'plugins.box2d.game'
	
)
.defines(function(){
// ==============
//
// DEFINITION
//
// ==============

MyGame = ig.Box2DGame.extend({
	//-----------------------------
	//
	// INIT
	//
	//-----------------------------
	// game variables
	score: 0,
	ability: 1,
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	// Initialize your game here; bind keys etc.
	init: function() {
		this.debugDisplay = new DebugDisplay( this.font );	
		// BIND KEYS
		ig.input.bind( ig.KEY.W, 'up' );
		ig.input.bind( ig.KEY.S, 'down' );
		ig.input.bind( ig.KEY.A, 'left' );
		ig.input.bind( ig.KEY.D, 'right' );
		ig.input.bind( ig.KEY.MOUSE1, 'click');
		ig.input.bind( ig.KEY.MOUSE2, 'click2');
		ig.input.bind( ig.KEY._1, 'action1');
		ig.input.bind( ig.KEY._2, 'action2');
		ig.input.bind( ig.KEY._3, 'action3');
		ig.input.bind( ig.KEY._4, 'action4');

		// MOUSE INIT
		ig.input.initMouse();
		
		// LOAD LEVEL
		this.loadLevel( LevelMain2 );
	},

	//-----------------------------
	//
	// UPDATE
	//
	//-----------------------------
	// Updates background layer positions
	// calls .update on each entity 
	// once update is done, .checkEntities is called to resolve dynamic collisions (entity vs entity)
	// also calls .check, if it overlays with another entity and wants checks
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// change character ability
		if (ig.input.pressed('action1')) {
			this.ability = 1;
		}
		if (ig.input.pressed('action2')) {
			this.ability = 2;
		}
		if (ig.input.pressed('action3')) {
			this.ability = 3;
		}
		if (ig.input.pressed('action4')) {
			this.ability = 4;
		}

		/*
		// spawn enemies
		var bushes = this.getEntitiesByType( EntityBush );
		if (bushes.length <= 50) {
			if (Math.random() * 100 > 97) {
				ig.game.spawnEntity(EntityBush, 50, 50, {});
			}	
		}
		*/
	},
	
	//-----------------------------
	//
	// DRAW
	//
	//-----------------------------
	// Clears screen and calls .draw on each background layer and entity
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		// Draw FPS Debug text
		this.debugDisplay.draw([], true, true, 10000, 100);
		
		// center player on screen
		var player = this.getEntitiesByType( EntityPlayer )[0];
			
		
		// show player health
		this.font.draw(player.health, 200, 2, ig.Font.ALIGN.LEFT);
				
		// show score
		this.font.draw(this.score, ig.system.width-2, 2, ig.Font.ALIGN.RIGHT); // x position, y position
	}
});

// Start the Game 
// 60fps, a resolution of 320x320, scaled up by a factor of 2
ig.main( '#canvas', MyGame, 60, 800, 600, 1);
});

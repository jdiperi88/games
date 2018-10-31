var StateOver = {
	preload: function() {
		// ('ref_name', 'pathto.png', sprite_width, sprite_height, optional[number_of_cells])
		game.load.spritesheet("buttons", "images/ui/buttons.png", 265, 75);
	},

	create: function() {
		//START BUTTON
		//game.add.button(x,y,imageKey,clickFunction,this,over_frame,normal_frame,down_frame)
		this.btnPlayAgain = game.add.button(
			game.world.centerX,
			game.world.height - 200,
			"buttons",
			this.playAgain,
			this,
			1,
			0,
			1
		);
		this.btnPlayAgain.anchor.set(0.5, 0.5);

		//SCORE TEXT (x,y,text)
		this.scoreText = game.add.text(game.world.centerX, 150, "0");
		this.scoreText.fill = "#ffffff";
		this.scoreText.fontSize = 64;
		this.scoreText.anchor.set(0.5, 0.5);
		this.scoreLabel = game.add.text(game.world.centerX, 100, "Score");
		this.scoreLabel.fill = "#ffffff";
		this.scoreText.fontSize = 32;
		this.scoreLabel.anchor.set(0.5, 0.5);
	},
	playAgain: function() {
		game.state.start("StateMain");
	},

	update: function() {}
};

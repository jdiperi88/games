var StateTitle = {
	//load images into library
	preload: function() {
		// title, path to image
		game.load.image("logo", "images/title/gameLogo.png");

		// ('ref_name', 'pathto.png', sprite_width, sprite_height, optional[number_of_cells])
		game.load.spritesheet("buttons", "images/ui/buttons.png", 265, 75);

		//(landscape, portrait)
		if (screen.width < 1500) {
			game.scale.forceOrientation(false, true);
		}
	},

	//setup objects, variables ,souds, text, good gusy, explosions
	create: function() {
		console.log("ready");
		//(x,y,library_key)
		this.logo = game.add.sprite(game.world.centerX, 180, "logo");
		this.logo.anchor.set(0.5, 0.5);

		//START BUTTON
		//game.add.button(x,y,imageKey,clickFunction,this,over_frame,normal_frame,down_frame)
		this.btnStart = game.add.button(
			game.world.centerX,
			game.world.height - 200,
			"buttons",
			this.startGame,
			this,
			7,
			6,
			6
		);
		this.btnStart.anchor.set(0.5, 0.5);
		this.setListeners();
	},
	startGame: function() {
		game.state.start("StateMain");
	},
	setListeners: function() {
		//(function,scope)
		if (screen.width < 1500) {
			game.scale.enterIncorrectOrientation.add(this.wrongWay, this);
			game.scale.leaveIncorrectOrientation.add(this.rightWay, this);
		}
	},
	wrongWay: function() {
		document.getElementById("wrongWay").style.display = "block";
	},
	rightWay: function() {
		document.getElementById("wrongWay").style.display = "none";
	},

	//constants running loop
	update: function() {}
};

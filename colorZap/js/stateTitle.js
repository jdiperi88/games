var StateTitle = {
	//load images into library
	preload: function() {
		// title, path to image
		game.load.image("logo", "images/title/gameLogo.png");
		//(landscape, portrait)
		game.scale.forceOrientation(false, true);
	},

	//setup objects, variables ,souds, text, good gusy, explosions
	create: function() {
		console.log("ready");
		//(x,y,library_key)
		this.logo = game.add.sprite(game.world.centerX, 180, "logo");
		this.logo.anchor.set(0.5, 0.5);
		this.setListeners();
	},
	setListeners: function() {
		//(function,scope)
		game.scale.enterIncorrectOrientation.add(this.wrongWay, this);
		game.scale.leaveIncorrectOrientation.add(this.rightWay, this);
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

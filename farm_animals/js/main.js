var game = new Phaser.Game(640, 360, Phaser.AUTO);

var GameState = {
	preload: function() {
		this.load.image("background", "images/background.png");
		this.load.spritesheet("chicken", "images/chicken.png", 131, 200, 3);
		this.load.image("horse", "images/horse.png");
		this.load.image("pig", "images/pig.png");
		this.load.image("sheep", "images/sheep.png");
		this.load.image("rightArrow", "images/arrow.png");
		this.load.image("leftArrow", "images/arrow.png");
	},
	create: function() {
		// tries to fit the screen size while keeping the best aspect ratio
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.background = this.game.add.sprite(0, 0, "background");

		//right arrow
		this.rightArrow = this.game.add.sprite(
			580,
			this.game.world.centerY,
			"rightArrow"
		);
		this.rightArrow.anchor.setTo(0.5);
		this.rightArrow.customParams = { direction: 1 };

		//left arrow
		this.leftArrow = this.game.add.sprite(
			70,
			this.game.world.centerY,
			"leftArrow"
		);
		this.leftArrow.anchor.setTo(0.5);
		this.leftArrow.scale.x = -1;
		this.leftArrow.customParams = { direction: -1 };

		//left arrow input
		this.leftArrow.inputEnabled = true;
		this.leftArrow.input.pixelPerfectClick = true;
		this.leftArrow.events.onInputDown.add(this.moveAnimal, this);

		//chicken
		this.chicken = this.game.add.sprite(
			this.game.world.centerX,
			this.game.world.centerY,
			"chicken"
		);
		this.chicken.anchor.setTo(0.5, 0.5);
	},
	moveAnimal: function(sprite, event) {
		console.log("move animal", this.chicken.frame);
		this.chicken.x += 10;
		this.chicken.frame += 1;
		if (this.chicken.frame == 2) {
			this.chicken.frame = 0;
		}
	},
	update: function() {}
};

game.state.add("GameState", GameState);
game.state.start("GameState");

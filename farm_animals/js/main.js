var game = new Phaser.Game(640, 360, Phaser.AUTO);

var GameState = {
	preload: function() {
		// static objects
		this.load.image("background", "images/background.png");
		this.load.image("rightArrow", "images/arrow.png");
		this.load.image("leftArrow", "images/arrow.png");
		//animal sprites
		this.load.spritesheet("chicken", "images/chicken.png", 131, 200, 3);
		this.load.spritesheet("pig", "images/pig.png", 297, 200, 3);
		this.load.spritesheet("sheep", "images/sheep.png", 244, 200, 3);
		this.load.spritesheet("horse", "images/horse.png", 212, 200, 3);
		//sounds
		this.load.audio("chickenSound", ["audio/chicken.ogg", "audio/chicken.mp3"]);
		this.load.audio("pigSound", ["audio/pig.ogg", "audio/pig.mp3"]);
		this.load.audio("sheepSound", ["audio/sheep.ogg", "audio/sheep.mp3"]);
		this.load.audio("horseSound", ["audio/horse.ogg", "audio/horse.mp3"]);
	},
	create: function() {
		// tries to fit the screen size while keeping the best aspect ratio
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.background = this.game.add.sprite(0, 0, "background");

		//group of animals
		var animalData = [
			{ key: "horse", text: "HORSE", audio: "horseSound" },
			{ key: "chicken", text: "CHICKEN", audio: "chickenSound" },
			{ key: "pig", text: "PIG", audio: "pigSound" },
			{ key: "sheep", text: "SHEEP", audio: "sheepSound" }
		];
		this.animals = this.game.add.group();
		var animal;
		animalData.forEach(element => {
			animal = this.animals.create(
				-1000,
				this.game.world.centerY,
				element.key,
				0
			);
			//anchor to center of sprite
			animal.anchor.setTo(0.5);
			//saving everything not phaser related to custom object
			animal.customParams = {
				text: element.text,
				sound: this.game.add.audio(element.audio)
			};

			//create animation
			animal.animations.add("animate", [0, 1, 2, 0, 1], 3, false);
			// enable animal input
			animal.inputEnabled = true;
			animal.input.pixelPerfectClick = true;
			animal.events.onInputDown.add(this.animateAnimal, this);
		});

		//get current animal
		this.currentAnimal = this.animals.next();
		this.currentAnimal.position.set(
			this.game.world.centerX,
			this.game.world.centerY
		);
		this.showText(this.currentAnimal);

		//right arrow
		this.rightArrow = this.game.add.sprite(
			580,
			this.game.world.centerY,
			"rightArrow"
		);
		this.rightArrow.anchor.setTo(0.5);
		this.rightArrow.customParams = { direction: 1 };

		//right arrow input
		this.rightArrow.inputEnabled = true;
		this.rightArrow.input.pixelPerfectClick = true;
		this.rightArrow.events.onInputDown.add(this.switchAnimal, this);

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
		this.leftArrow.events.onInputDown.add(this.switchAnimal, this);

		// //chicken
		// this.chicken = this.game.add.sprite(
		// 	this.game.world.centerX,
		// 	this.game.world.centerY,
		// 	"chicken"
		// );
		// this.chicken.anchor.setTo(0.5, 0.5);

		// //enable input on chicken
		// this.chicken.inputEnabled = true;
		// this.chicken.input.pixelPerfectClick = true;
		// this.chicken.events.onInputDown.add(this.animateAnimal, this);
	},
	animateAnimal: function(sprite, event) {
		console.log("animaate animal");
		sprite.play("animate");
		sprite.customParams.sound.play();
	},
	switchAnimal: function(sprite, event) {
		if (this.isMoving) {
			return false;
		}
		this.isMoving = true;

		this.animalText.visible = false;
		let newAnimal, endX;
		if (sprite.customParams.direction > 0) {
			newAnimal = this.animals.next();
			newAnimal.x = -newAnimal.width / 2;
			endX = 640 + this.currentAnimal.width / 2;
		} else {
			newAnimal = this.animals.previous();
			newAnimal.x = 640 + newAnimal.width / 2;
			endX = -this.currentAnimal.width / 2;
		}
		var newAnimalMovement = this.game.add.tween(newAnimal);
		newAnimalMovement.to({ x: this.game.world.centerX }, 1000);
		newAnimalMovement.onComplete.add(function() {
			this.isMoving = false;
			this.showText(newAnimal);
		}, this);
		newAnimalMovement.start();

		//current animal animation
		var currentAnimalMovement = this.game.add.tween(this.currentAnimal);
		currentAnimalMovement.to({ x: endX }, 1000);
		currentAnimalMovement.start();

		this.currentAnimal = newAnimal;
	},
	showText: function(animal) {
		if (!this.animalText) {
			var style = {
				font: "bold 30pt arial",
				fill: "#D0171B",
				align: "center"
			};
			this.animalText = this.game.add.text(
				this.game.width / 2,
				this.game.height * 0.85,
				"",
				style
			);
			this.animalText.anchor.setTo(0.5);
		}
		this.animalText.setText(animal.customParams.text);
		this.animalText.visible = true;
	},
	update: function() {}
};

game.state.add("GameState", GameState);
game.state.start("GameState");

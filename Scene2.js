class Scene2 extends Phaser.Scene {
	constructor() {
		super({ key: 'Scene2' });
	}

	create() {
		//  A simple background for our game
		this.add.image(400, 300, 'sky');

		//  The platforms group contains the ground and the 2 ledges we can jump on
		platforms = this.physics.add.staticGroup();

		//  Here we create the ground.
		//  Scale it to fit the width of the game (the original sprite is 400x32 in size)
		platforms.create(400, 568, 'ground').setScale(2).refreshBody();

		//  Now let's create some ledges
		platforms.create(600, 400, 'ground');
		platforms.create(50, 250, 'ground');
		platforms.create(750, 220, 'ground');

		// The player and its settings
		player = this.physics.add.sprite(100, 450, 'dude');

		//  Player physics properties. Give the little guy a slight bounce.
		player.setBounce(0.2);
		player.setCollideWorldBounds(true);

		//  Our player animations, turning, walking left and walking right.
		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('dudeLeft', { start: 1, end: 2 }),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'turn',
			frames: [ { key: 'dude', frame: 4 } ],
			frameRate: 20
		});

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 6 }),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'jump',
			frames: [ { key: 'jump', frame: 3 } ],
			frameRate: 24
		});

		//  Input Events
		cursors = this.input.keyboard.createCursorKeys();

		//  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
		stars = this.physics.add.group({
			key: 'star',
			repeat: 11,
			setXY: { x: 12, y: 0, stepX: 70 }
		});

		stars.children.iterate(function(child) {
			//  Give each star a slightly different bounce
			child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
		});

		bombs = this.physics.add.group();

		//  The score
		scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });

		//  Collide the player and the stars with the platforms
		this.physics.add.collider(player, platforms);
		this.physics.add.collider(stars, platforms);
		this.physics.add.collider(bombs, platforms);

		//  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
		this.physics.add.overlap(player, stars, collectStar, null, this);

		this.physics.add.collider(player, bombs, hitBomb, null, this);
	}

	preload() {
		this.load.image('sky', 'assets/sky2.png');
		this.load.image('ground', 'assets/platform4.png');
		this.load.image('star', 'assets/delight.png');
		this.load.image('bomb', 'assets/bomb3.png');
		this.load.spritesheet('dude', 'assets/dude2.png', { frameWidth: 50, frameHeight: 110 });
		this.load.spritesheet('jump', 'assets/dude2.png', { frameWidth: 45, frameHeight: 110 });
		this.load.spritesheet('dudeLeft', 'assets/dudeLeft.png', { frameWidth: 55, frameHeight: 110 });
	}

	update() {
		if (gameOver) {
			return;
		}

		if (cursors.left.isDown) {
			player.setVelocityX(-160);

			player.anims.play('left', true);
		} else if (cursors.right.isDown) {
			player.setVelocityX(160);

			player.anims.play('right', true);
		} else {
			player.setVelocityX(0);

			player.anims.play('turn');
		}

		if (cursors.up.isDown && player.body.touching.down) {
			player.setVelocityY(-330);
			player.anims.play('jump');
		}
	}
}

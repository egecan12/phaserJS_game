class Scene1 extends Phaser.Scene {
	flag = true;
	flag2 = true;
	menuText = {};

	constructor() {
		super({ key: 'Scene1', active: true });
	}

	create() {
		this.add.image(400, 300, 'sky2');
		this.menuText = this.add.text(225, 300, 'Press any key to continue...', {
			font: '2pc Helvetica',
			fill: '#ffffff'
		});
		this.input.keyboard.on('keydown', (event) => {
			this.scene.start('Scene2');
		});
		player = this.add.sprite(100, 450, 'dude5').setScale(3);
		this.anims.create({
			key: 'main_anim',
			frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 7 }),
			frameRate: 4,
			repeat: -1
		});
	}

	preload() {
		this.load.image('sky2', 'assets/bg2.png');
		this.load.spritesheet('dude', 'assets/dude2.png', { frameWidth: 50, frameHeight: 110 });

		// this.input.keyboard.on('keydown', (event) => {
		// 	if (this.flag) this.flag = false;
		// });
	}

	update() {
		if (this.flag) {
			player.anims.play('main_anim');
			this.flag = false;
			console.log('Hey');
			console.log(this.menuText);
		}

		if (this.flag2) {
			console.log('Entered first if');
			this.flag2 = false;
			setTimeout(() => {
				if (this.menuText.style.color == '#ffffff') {
					console.log('The text was white');
					this.menuText.setTint('#000000');
					this.menuText.style.color = '#000000';
				} else {
					console.log('Hey girrrlll');
					this.menuText.clearTint();
					this.menuText.style.color = '#ffffff';
				}
				this.flag2 = true;
			}, 250);
		}
		//console.log(this.menuText.style.color);
		//this.menuText.style.color == '#ffffff' ? this.menuText.setTint('#000000') : this.menuText.setTint('#ff0000');
		// if (this.menuText.style.color == '#ffffff') {
		// 	this.menuText.setTint('#000000');
		// 	this.menuText.style.color = '#000000';
		// } else {
		// 	console.log('Hey girrrlll');
		// 	this.menuText.setTint('#ffffff');
		// 	this.menuText.style.color = '#ffffff';
		// }
	}
}

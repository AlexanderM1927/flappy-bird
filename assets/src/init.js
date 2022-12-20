const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 500
            }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
}

const game = new Phaser.Game(config)

function preload () {
    this.load.setBaseURL('http://flappy-bird.test')

    
    this.load.image('bg', '/assets/img/bg.png')
    this.load.spritesheet('heroe', '/assets/img/heroe.png', {
        frameWidth: 50,
        frameHeight: 50
    })
}

function create () {
    this.add.sprite(400, 300, 'bg')
    this.player = this.physics.add.sprite(50, 50, 'heroe')
    this.anims.create({
        key: 'fly',
        frames: this.anims.generateFrameNumbers('heroe', {
            start: 0,
            end: 1
        }),
        frameRate: 7,
        repeat: -1
    })
    this.player.play('fly')

    this.input.keyboard.on('keydown', (event) => {
        if (event.keyCode === 32) {
            jump(this)
        }
    })

    this.input.on('pointerdown', () => jump(this))

    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('heroe', {
            start: 2,
            end: 2
        }),
        frameRate: 7,
        repeat: 1
    })
    
}

function jump (_this) {
    _this.player.setVelocityY(-200)
    _this.player.play('jump')
}
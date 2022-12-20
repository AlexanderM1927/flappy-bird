const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
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
    this.load.image('pipe0', '/assets/img/pipe0.png')
}

function create () {
    this.add.sprite(400, 200, 'bg')
    this.player = this.physics.add.sprite(50, 100, 'heroe')
    
    createAnims(this)

    this.player.play('fly')

    this.input.keyboard.on('keydown', (event) => {
        if (event.keyCode === 32) {
            jump(this)
        }
    })

    this.input.on('pointerdown', () => jump(this))
    this.player.on('animationcomplete', animationComplete, this)

    function animationComplete (animation, frame, sprite) {
        if (animation.key === 'jump') {
            this.player.play('fly')
        }
    }
    nuevaColumna(this)
}

function createAnims (_this) {
    _this.anims.create({
        key: 'fly',
        frames: _this.anims.generateFrameNumbers('heroe', {
            start: 0,
            end: 1
        }),
        frameRate: 7,
        repeat: -1
    })
    _this.anims.create({
        key: 'jump',
        frames: _this.anims.generateFrameNumbers('heroe', {
            start: 0,
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

function nuevaColumna (_this) {
    const columna = _this.physics.add.group()
    const hueco = Math.floor(Math.random() * 5) + 1
    for (let i = 0; i < 8; i++) {
        if ( i !== hueco) {
            const cubo = columna.create(960, i * 100 + 10, 'pipe0')
            cubo.body.allowGravity = false
        }
    }

    columna.setVelocityX(-200)

    columna.checkWoldBounds = true
    columna.outOfBoundsKill = true
    _this.time.delayedCall(1000, _this.nuevaColumna, [], _this)
}
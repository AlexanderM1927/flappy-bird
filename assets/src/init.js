import LoseScene from './LoseScene.js'

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
    scene: [{
        preload: preload,
        create: create
    }, LoseScene]
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
    this.load.image('pipeUp0', '/assets/img/pipeUp0.png')
    this.load.image('pipeDown0', '/assets/img/pipeDown0.png')
    this.load.image('pipe1', '/assets/img/pipe1.png')
    this.load.image('pipeUp1', '/assets/img/pipeUp1.png')
    this.load.image('pipeDown1', '/assets/img/pipeDown1.png')
}

let _this

function create () {
    _this = this
    _this.bg = this.add.tileSprite(400, 200, 800, 400, 'bg').setScrollFactor(0)
    this.player = this.physics.add.sprite(50, 100, 'heroe')
    
    createAnims()

    this.player.play('fly')

    this.input.keyboard.on('keydown', (event) => {
        if (event.keyCode === 32) {
            jump()
        }
    })

    this.input.on('pointerdown', () => jump())
    this.player.on('animationcomplete', animationComplete, this)

    function animationComplete (animation, frame, sprite) {
        if (animation.key === 'jump') {
            this.player.play('fly')
        }
    }
    nuevaColumna()
}

function createAnims () {
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

function jump () {
    _this.player.setVelocityY(-200)
    _this.player.play('jump')
}

function hitColumna() {
    _this.scene.start('loseScene')
}

function nuevaColumna () {
    const columna = _this.physics.add.group()
    const hueco = Math.floor(Math.random() * 5) + 1
    const aleatorio = Math.floor(Math.random() * 2)
    for (let i = 0; i < 8; i++) {
        if (i !== hueco && i !== hueco + 1 && i !== hueco - 1) {
            let cubo
            if (i == hueco - 2) {
                cubo = columna.create(960, i * 100, 'pipeUp' + aleatorio)
            } else if (i == hueco + 2) {
                cubo = columna.create(960, i * 100, 'pipeDown' + aleatorio)
            } else {
                cubo = columna.create(960, i * 100, 'pipe' + aleatorio)
            }
            cubo.body.allowGravity = false
        }
    }

    columna.setVelocityX(-200)

    columna.checkWoldBounds = true
    columna.outOfBoundsKill = true
    _this.time.delayedCall(1000, nuevaColumna, [], _this)
    _this.physics.add.overlap(_this.player, columna, hitColumna, null, _this)
}